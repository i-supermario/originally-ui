// AddMemberForm.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API } from "@/api";
import { toast } from "sonner";

export function AddMemberForm({ groupId, onSuccess }: { groupId: string; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      await API.METHODS.POST(
        API.ENDPOINTS.group.addMember(groupId),
        { email },
        { withCredentials: true },
        {
          onSuccess: (response) => { toast.success(response.message) },
          onError: (response) => { toast.error(response.message) }
        }
      );
      setEmail("");
      onSuccess();
    } catch (err) {
      toast.error("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Input
        type="email"
        placeholder="Enter member email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="outline" onClick={handleAdd} className="">
        Add Member
      </Button>
    </div>
  );
}
