import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Assignment } from "."
import { useNavigate } from "react-router"

export default function AssignmentCard({ assignment }: { assignment: Assignment }) {

  const navigate = useNavigate()

  return (
    <Card onClick={() => navigate(`/assignments/${assignment._id}`)} className="cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-4xl font-semibold text-primary">
          {assignment.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-muted-foreground">Number of tasks</p>
          <p className="text-base">{assignment.tasks.length}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Description</p>
          <p className="text-base">{assignment.description || "No description provided."}</p>
        </div>

        <div>
          <p className="font-medium text-muted-foreground">Due Date</p>
          <p className="text-base">{new Date(assignment.dueDate).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}
