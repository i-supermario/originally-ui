import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { API } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Skeleton } from '@/components/ui/skeleton';
import MapView from './MapView';
import { useSession } from '@/providers/SessionProvider';

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
};

type GroupData = {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  ownerDetails: User;
  memberDetails: User[];
};

export default function GroupView() {
  const { groupId } = useParams();
  const { userId } = useSession()
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId) return;

    async function fetchGroup() {
      setLoading(true);
      try {
        await API.METHODS.GET(
          API.ENDPOINTS.group.get(groupId),
          {},
          { withCredentials: true },
          {
            onSuccess: (data) => {
              setGroupData(data);
            },
            onError: (error) => console.error(error),
          }
        );
      } finally {
        setLoading(false);
      }
    }

    fetchGroup();
  }, [groupId]);

  if (loading || !groupId) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!groupData) return <div className="p-6">Group not found or access denied.</div>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{groupData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">{groupData.description}</p>
          <div className="text-sm">
            <span className="font-semibold">Owner:</span> {groupData.ownerDetails.firstName} {groupData.ownerDetails.lastName} ({groupData.ownerDetails.email})
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {groupData.memberDetails.map((member) => (
              <div
                key={member._id}
                className="flex items-center gap-4 border p-4 rounded-xl shadow-sm"
              >
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.firstName}`} />
                  <AvatarFallback>{member.firstName[0]}{member.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="text-sm text-muted-foreground">{member.email}</div>
                  <div className="text-xs text-muted-foreground">Phone: {member.phoneNo}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Member Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[380px] bg-muted rounded-xl flex items-center justify-center">
            <MapView groupId={groupId} userId={userId} memberDetails={groupData.memberDetails} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
