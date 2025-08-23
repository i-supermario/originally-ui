import { useEffect, useCallback, useState } from "react"
import { useParams } from "react-router"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API } from "@/api"
import { Assignment } from "../TaskDashboard"
import TaskSequenceList from "./TaskSequenceList"
import GeocodingMapView from "@/pages/TaskView/MapView"
import AssignUserPopover from "./AssignUserPopup"
import { useSession } from "@/providers/SessionProvider"
import { Skeleton } from "@/components/ui/skeleton";


export default function TaskView() {
  const { assignmentId } = useParams()
  const { userId } = useSession()
  const [assignment, setAssignment] = useState<Assignment & any>(null)

  const fetchAssignment = useCallback(async () => {
    if (!assignmentId) return
    try {
      await API.METHODS.GET(API.ENDPOINTS.assignment.get(assignmentId), {}, { withCredentials: true }, {
        onSuccess: (res) => setAssignment(res.data),
        onError: (err) => toast.error(err.message),
      })
    } catch {
      toast.error("Failed to fetch task")
    }
  }, [assignmentId])

  useEffect(() => {
    fetchAssignment()
  }, [])


  if (!assignmentId || !assignment) {
    return (
      <div className="flex justify-center items-center h-full">
        <AssignmentDetailSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{assignment.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{assignment.description}</p>
              <p className="text-xs">Due: {new Date(assignment.dueDate).toDateString()}</p>
              <p>Assigned to: {assignment.assigneeDetails?.firstName || "Unassigned"}</p>
            </div>
            { userId === assignment.ownerId && <AssignUserPopover assignmentId={assignmentId} onTaskAssigned={fetchAssignment} />}
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="font-semibold text-sm mb-2">Tasks:</h2>
          <TaskSequenceList tasks={assignment.tasks || []} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Map</CardTitle>
        </CardHeader>
        <CardContent>
            <GeocodingMapView assignment={assignment} tasks={assignment.tasks || []} onTaskAddedOrUpdated={fetchAssignment} />
        </CardContent>
      </Card>
    </div>
  )
}


export function AssignmentDetailSkeleton() {
  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* Assignment Info Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" /> {/* title */}
              <Skeleton className="h-4 w-64" /> {/* description */}
              <Skeleton className="h-3 w-32" /> {/* due date */}
              <Skeleton className="h-4 w-40" /> {/* assignee */}
            </div>
            <Skeleton className="h-8 w-24 rounded-md" /> {/* assign popover button */}
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-20 mb-3" /> {/* "Tasks:" label */}
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Map Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-16" /> {/* "Map" title */}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full rounded-lg" /> {/* map placeholder */}
        </CardContent>
      </Card>
    </div>
  );
}
