import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Assignment } from "."
import { useNavigate } from "react-router"

export function TaskCard({ task }: { task: Assignment }) {

  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/tasks/${task._id}`)} className="cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-4xl font-semibold text-primary">
          {task.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-muted-foreground">Number of tasks</p>
          <p className="text-base">{task.tasks.length}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Description</p>
          <p className="text-base">{task.description || "No description provided."}</p>
        </div>

        <div>
          <p className="font-medium text-muted-foreground">Due Date</p>
          <p className="text-base">{new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
