// pages/TaskView.tsx
import { useEffect, useCallback, useState } from "react"
import { useParams } from "react-router"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API } from "@/api"
import { Assignment } from "../TaskDashboard"
import { Spinner } from "@/components/ui/spinner"
import TaskSequenceList from "./TaskSequenceList"
import GeocodingMapView from "@/pages/TaskView/MapView"
import AssignUserPopover from "./AssignUserPopup"

export default function TaskView() {
  const { assignmentId } = useParams()
  const [assignment, setAssignment] = useState<Assignment | null>(null)

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
        <Spinner size="sm" className="bg-black dark:bg-white" />
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
              <p>Assigned to: {assignment.assigneeId}</p>
            </div>
            <AssignUserPopover assignmentId={assignmentId} onTaskAssigned={fetchAssignment} />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="font-semibold text-sm mb-2">Tasks:</h2>
          <TaskSequenceList tasks={assignment.tasks || []} />
        </CardContent>
      </Card>
      <GeocodingMapView assignmentId={assignmentId} tasks={assignment.tasks || []} onTaskAddedOrUpdated={fetchAssignment} />
    </div>
  )
}
