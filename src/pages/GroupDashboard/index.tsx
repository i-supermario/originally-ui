import { API } from "@/api";
import { useSession } from "@/providers/SessionProvider";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CreateGroupPopup } from "./CreateGroupPopup";
import { GroupTable } from "./group-view/GroupTable";

export default function GroupDashboard() {
  const [groups, setGroups] = useState([]);
  // console.log(groups)
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
  },[userId])

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-semibold">Your groups</p>
      <div className="flex py-6">
        <CreateGroupPopup onGroupCreated={fetchGroups} />
      </div>
      <Separator className="my-4 bg-gray-300" />
      <GroupTable data={groups} onRefresh={fetchGroups} />
    </div>
  );
}




