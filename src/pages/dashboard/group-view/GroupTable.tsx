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
        {data.map((g) => (
          <GroupRow key={g._id} group={g} onRefresh={onRefresh} />
        ))}
      </TableBody>
    </Table>
  );
}

export function GroupRow({ group, onRefresh }: { group: any; onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleRemoveMember = async (memberId: string) => {
    setLoading(true);
    try {
      await API.METHODS.DELETE(API.ENDPOINTS.group.remove(group._id, memberId), { }, { withCredentials: true }, {
        onSuccess: (response) => { toast.success(response.message) },
        onError: (response) => { toast.error(response.message) }
      });
      onRefresh();
    } catch (e) {
      console.error("Failed to remove member");
    } finally {
      setLoading(false);
    }
  };

  const handleGroupTabClick = () => {
    navigate(`/group-view/${group._id}`)
  }



  return (
    <TableRow>
      <TableCell className="font-medium cursor-pointer" onClick={() => {handleGroupTabClick()}}>{group.name}</TableCell>
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
                  <li key={index} className="flex items-center justify-between">
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
                  </li>
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
          <PopoverContent className="w-72 p-2">
            <AddMemberForm groupId={group._id} onSuccess={onRefresh} />
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}

