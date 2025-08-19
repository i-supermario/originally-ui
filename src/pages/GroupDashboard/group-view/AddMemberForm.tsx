import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API } from "@/api";
import { toast } from "sonner";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <motion.div
        whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Input
          type="email"
          placeholder="Enter member email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button variant="outline" onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add Member"}
        </Button>
      </motion.div>
    </motion.div>
  );
}
