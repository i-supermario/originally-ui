// components/AssignmentDetails.tsx
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
  assignment: {
    name: string
    description: string
    dueDate: string
    status: string
    tasks: { name: string; status: string }[]
  }
}

export default function AssignmentDetails({ assignment }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{assignment.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{assignment.description}</p>
        <Badge variant="outline">{assignment.status}</Badge>
        <p className="text-xs">Due: {new Date(assignment.dueDate).toDateString()}</p>
      </CardHeader>
      <CardContent>
        {assignment.tasks.map((task, i) => (
          <div key={i} className="mb-2">
            <Badge variant="default" className="mr-2">{i + 1}</Badge>
            {task.name} – <span className="text-xs">{task.status}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
