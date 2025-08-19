import { API } from "@/api";
import { useSession } from "@/providers/SessionProvider";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CreateGroupPopup } from "./CreateGroupPopup";
import { GroupTable } from "./group-view/GroupTable";
import { motion, AnimatePresence } from "framer-motion";

export default function GroupDashboard() {
  const [groups, setGroups] = useState([]);
  const { userId } = useSession();

  const fetchGroups = useCallback(() => {
    API.METHODS.GET(
      API.ENDPOINTS.group.getAll(userId),
      {},
      { withCredentials: true },
      {
        onSuccess: (response) => {
          setGroups(response.data);
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
    fetchGroups();
  }, []);

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.p
        className="text-2xl font-semibold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Your groups
      </motion.p>

      <motion.div
        className="flex py-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CreateGroupPopup onGroupCreated={fetchGroups} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      >
        <Separator className="my-4 bg-gray-300" />
      </motion.div>

      <AnimatePresence>
        <motion.div
          key="group-table"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GroupTable data={groups} onRefresh={fetchGroups} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
