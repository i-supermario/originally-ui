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
import { Skeleton } from "@/components/ui/skeleton";


const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export function GroupTable({
  data,
  onRefresh,
}: {
  data: any[];
  onRefresh: () => void;
}) {
  return (
    <div className="w-full">
      {/* Table for desktop */}
      <div className="hidden md:block">
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
      </div>

      {/* Cards for mobile */}
      <div className="space-y-4 md:hidden">
        <AnimatePresence>
          {data.map((g, i) => (
            <GroupCard key={g._id} group={g} onRefresh={onRefresh} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GroupRow({
  group,
  onRefresh,
  index,
}: {
  group: any;
  onRefresh: () => void;
  index: number;
}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRemoveMember = async (memberId: string) => {
    setLoading(true);
    try {
      await API.METHODS.DELETE(
        API.ENDPOINTS.group.remove(group._id, memberId),
        {},
        { withCredentials: true },
        {
          onSuccess: (response) => {
            toast.success(response.message);
          },
          onError: (response) => {
            toast.error(response.message);
          },
        }
      );
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
      <TableCell
        className="font-medium cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={handleGroupTabClick}
      >
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
                {group.memberDetails.length} Member
                {group.memberDetails.length > 1 ? "s" : ""}
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
                      <strong>
                        {member.firstName} {member.lastName}
                      </strong>
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
            <Button variant="secondary" size="sm">
              +
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-72 p-2">
            <AddMemberForm groupId={group._id} onSuccess={onRefresh} />
          </PopoverContent>
        </Popover>
      </TableCell>
    </motion.tr>
  );
}

function GroupCard({
  group,
  onRefresh,
  index,
}: {
  group: any;
  onRefresh: () => void;
  index: number;
}) {
  const navigate = useNavigate();

  const handleGroupTabClick = () => {
    navigate(`/groups/${group._id}`);
  };

  return (
    <motion.div
      key={group._id}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={index}
      className="border rounded-xl p-4 shadow-lg"
    >
      <div
        className="font-semibold text-lg cursor-pointer hover:text-primary"
        onClick={handleGroupTabClick}
      >
        {group.name}
      </div>
      <p className="text-sm text-gray-600">{group.description}</p>
      <div className="mt-2 text-sm">
        <strong>Status:</strong> {group.status}
      </div>
      <div className="mt-2">
        <OwnerPopover owner={group.ownerDetails} />
      </div>

      {/* Members */}
      <div className="mt-3">
        {group.memberDetails.length > 0 ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                {group.memberDetails.length} Member
                {group.memberDetails.length > 1 ? "s" : ""}
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
                      <strong>
                        {member.firstName} {member.lastName}
                      </strong>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </motion.li>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <span className="text-sm text-muted-foreground">No Members</span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-3 flex space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="cursor-pointer" variant="link" size="sm">
              Add new member
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white w-72 p-2">
            <AddMemberForm groupId={group._id} onSuccess={onRefresh} />
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  );
}

export function GroupTableSkeleton() {
  return (
    <div className="w-full">
      {/* Table skeleton for desktop */}
      <div className="hidden md:block">
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
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                <TableCell><Skeleton className="h-6 w-28" /></TableCell>
                <TableCell><Skeleton className="h-6 w-12" /></TableCell>
                <TableCell><Skeleton className="h-6 w-10" /></TableCell>
                <TableCell><Skeleton className="h-6 w-16" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Card skeleton for mobile */}
      <div className="space-y-4 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3 shadow-sm">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
