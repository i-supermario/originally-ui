import { AnimatePresence, motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { OwnerPopover } from "./OwnerPopover";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { API } from "@/api";
import { toast } from "sonner";
import { useState } from "react";
import { AddMemberForm } from "./AddMemberForm";
import { useNavigate } from "react-router";

const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  })
};

export function GroupTable({
  data,
  onRefresh,
}: {
  data: any[];
  onRefresh: () => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Add</TableHead>
          <TableHead>Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence initial={false}>
          {data.map((g, i) => (
            <GroupRow key={g._id} group={g} onRefresh={onRefresh} index={i} />
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}

export function GroupRow({ group, onRefresh, index }: { group: any; onRefresh: () => void; index: number }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRemoveMember = async (memberId: string) => {
    setLoading(true);
    try {
      await API.METHODS.DELETE(API.ENDPOINTS.group.remove(group._id, memberId), {}, { withCredentials: true }, {
        onSuccess: (response) => { toast.success(response.message); },
        onError: (response) => { toast.error(response.message); }
      });
      onRefresh();
    } catch (e) {
      console.error("Failed to remove member");
    } finally {
      setLoading(false);
    }
  };

  const handleGroupTabClick = () => {
    navigate(`/groups/${group._id}`);
  };

  return (
    <motion.tr
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={index}
      className="transition-all"
    >
      <TableCell className="font-medium cursor-pointer hover:scale-[1.02] transition-transform" onClick={handleGroupTabClick}>
        {group.name}
      </TableCell>
      <TableCell>{group.description}</TableCell>
      <TableCell>{group.status}</TableCell>
      <TableCell>
        <OwnerPopover owner={group.ownerDetails} />
      </TableCell>
      <TableCell>
        {group.memberDetails.length > 0 ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {group.memberDetails.length} Member{group.memberDetails.length > 1 ? "s" : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white w-72 max-h-64 overflow-auto">
              <div className="text-sm space-y-2">
                {group.memberDetails.map((member: any, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <strong>{member.firstName} {member.lastName}</strong>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member._id)}
                      disabled={loading}
                    >
                      ✕
                    </Button>
                  </motion.li>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <span className="text-sm text-muted-foreground">No Members</span>
        )}
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="sm">+</Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-72 p-2">
            <AddMemberForm groupId={group._id} onSuccess={onRefresh} />
          </PopoverContent>
        </Popover>
      </TableCell>
    </motion.tr>
  );
}
