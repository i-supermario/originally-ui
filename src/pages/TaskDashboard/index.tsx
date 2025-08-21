import { API } from "@/api";
import { useSession } from "@/providers/SessionProvider";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";
import { CreateAssignmentPopover } from "./CreateAssignmentPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  assigneeDetails: any;
  _id: string
  ownerId: string
  assigneeId: string
  name: string
  description: string
  status: string
  dueDate: Date
  tasks: Task[]
}

export default function AssignmentDashboard() {
  const [ownedAssignments, setOwnedAssignment] = useState<Assignment[]>([]);
  const [assignedAssignments, setAssignedAssignments] = useState<Assignment[]>([]);
  const { userId } = useSession();

  const fetchAssignments = useCallback(() => {
    API.METHODS.GET(
      API.ENDPOINTS.assignment.getAll(userId),
      {},
      { withCredentials: true },
      {
        onSuccess: (response) => {
          setOwnedAssignment(response.data.filter((_: { ownerId: string }) => _.ownerId === userId));
          setAssignedAssignments(response.data.filter((_: { assigneeId: string }) => _.assigneeId === userId));
          console.log(response);
          toast.success("Fetched groups successfully");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to fetch group data");
        },
      }
    );
  }, [userId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 xl:px-24 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Your Assignments</h2>
        <CreateAssignmentPopover onSuccess={fetchAssignments} />
      </div>

      <Tabs defaultValue="owned" className="w-full">
        <TabsList className="bg-muted p-1 rounded-xl w-full sm:w-fit mx-auto shadow-sm flex flex-wrap gap-2">
          <TabsTrigger
            value="owned"
            className="data-[state=active]:bg-black data-[state=active]:shadow-sm data-[state=active]:text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
          >
            Owned
          </TabsTrigger>
          <TabsTrigger
            value="assigned"
            className="data-[state=active]:bg-black data-[state=active]:shadow-sm data-[state=active]:text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors"
          >
            Assigned
          </TabsTrigger>
        </TabsList>

        <TabsContent value="owned">
          <TaskList tasks={ownedAssignments} />
        </TabsContent>

        <TabsContent value="assigned">
          <TaskList tasks={assignedAssignments} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TaskList({ tasks }: { tasks: Assignment[] }) {
  if (!tasks.length) {
    return <p className="text-muted-foreground text-sm sm:text-base">No tasks found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {tasks.map((task) => (
        <AssignmentCard key={task._id} assignment={task} />
      ))}
    </div>
  );
}
