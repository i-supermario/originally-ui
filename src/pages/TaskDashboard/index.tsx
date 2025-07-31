import { API } from "@/api";
import { useSession } from "@/providers/SessionProvider";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";
import { TaskCard } from "./TaskCard";
import { CreateTaskPopover } from "./CreateTaskPopup";

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  PROGRESSING = 'PROGRESSING',
  FINISHED = 'FINISHED',
}
export interface Task {
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

export default function TaskDashboard(){

  const [tasks, setTasks] = useState<Assignment[]>([]);
  const { userId } = useSession();

  const fetchTasks = useCallback(() => {
    API.METHODS.GET(
      API.ENDPOINTS.task.getAll(userId),
      {},
      { withCredentials: true },
      {
        onSuccess: (response) => {
          setTasks(response.data);
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
    fetchTasks()
  },[])
  
  
  return(
    <>
      <div className="space-y-4 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          <CreateTaskPopover onSuccess={fetchTasks} />
        </div>
        <TaskList tasks={tasks} />
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
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  )
}