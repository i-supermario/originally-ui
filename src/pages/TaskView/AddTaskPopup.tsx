// components/MapMarkerAddTaskForm.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "../TaskDashboard";
import { API } from "@/api";
import { toast } from "sonner";

type Props = {
  lat: number;
  lng: number;
  onSuccess: () => void;
  assignmentId: string
};

export default function AddTaskPopup({ lat, lng, onSuccess, assignmentId }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: TaskStatus.ACTIVE,
    latitude: lat,
    longitude: lng,
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.latitude || !form.longitude) return;

    await API.METHODS.PUT(
      API.ENDPOINTS.assignment.addTask(assignmentId), // Replace or pass taskId via props
      { ...form },
      { withCredentials: true },
      {
        onSuccess: (response) => {
          onSuccess();
          toast.success(response.message || "Task added");
        },
        onError: (res) => toast.error(res.message),
      }
    );
  };

  return (
    <div className="space-y-2 w-[220px]">
      <Input
        placeholder="Task Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <div className="flex gap-2">
        <Input value={form.latitude} readOnly className="w-1/2" />
        <Input value={form.longitude} readOnly className="w-1/2" />
      </div>
      <Button variant="outline" onClick={handleSubmit} className="text-xs">
        Add Task
      </Button>
    </div>
  );
}
