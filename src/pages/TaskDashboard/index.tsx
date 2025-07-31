import { API } from "@/api";
import { useSession } from "@/providers/SessionProvider";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";
import { CreateAssignmentPopover } from "./CreateAssignmentPopup";
import AssignmentCard from "./AssignmentCard";

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  PROGRESSING = 'PROGRESSING',
  FINISHED = 'FINISHED',
}
export interface Task {
  _id: string;
  name: string;
  description: string;
  status: TaskStatus;
  latitude: number;
  longitude: number;
}
export interface Assignment {
  _id: string
  name: string
  description: string
  status: string
  dueDate: Date
  tasks: Task[]
}

export default function AssignmentDashboard() {

  const [assignments, setAssignment] = useState<Assignment[]>([]);
  const { userId } = useSession();

  const fetchAssignments = useCallback(() => {
    API.METHODS.GET(
      API.ENDPOINTS.assignment.getAll(userId),
      {},
      { withCredentials: true },
      {
        onSuccess: (response) => {
          setAssignment(response.data);
          toast.success("Fetched groups successfully");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to fetch group data");
        },
      }
    );
  }, [userId])

  useEffect(() => {
    fetchAssignments()
  }, [])


  return (
    <>
      <div className="space-y-4 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <CreateAssignmentPopover onSuccess={fetchAssignments} />
        </div>
        <TaskList tasks={assignments} />
      </div>
    </>
  )
}

function TaskList({ tasks }: { tasks: Assignment[] }) {
  if (!tasks.length) {
    return <p className="text-muted-foreground text-sm">No tasks found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <AssignmentCard key={task._id} assignment={task} />
      ))}
    </div>
  )
}