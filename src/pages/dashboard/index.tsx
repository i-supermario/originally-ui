import { API } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockGroups } from "@/mock/group";
import { useSession } from "@/providers/SessionProvider";
import { GroupI } from "@/types/group";
import { useState } from "react";


export default function Dashboard(){

  return(
    <>
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Your groups</p>
        <div className="flex py-6">
          {/* <Button
            variant="outline"
          >
            Create 
          </Button> */}
          <CreateGroupPopup/>
        </div>
        {/* <Separator className="my-4 bg-gray-300" /> */}
        <div>
          <GroupTable data={mockGroups} />
        </div>
      </div>
    </>
  )
}

export function CreateGroupPopup() {

  const { userId } = useSession();
  const [formData, setFormData] = useState<{ name: string, descrioption: string }>({ name: '', descrioption: ''});

  const createGroup = () => {

    if(!formData.name || !formData.descrioption) return;

    const res = API.METHODS.POST(
      API.ENDPOINTS.group.create, 
      { ownerId: userId , ...formData},
      {},
      {
        onSuccess: () => {},
        onError: () => {}
      }

    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-white">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Create New Group</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Description</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <div className="flex">
            <Button variant="outline" onClick={() => createGroup()}>
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function GroupTable(params: { data: GroupI[] }) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {params.data.map((g) => (
          <TableRow key={g.link}>
            <TableCell className="font-medium">{g.name}</TableCell>
            <TableCell>{g.description}</TableCell>
            <TableCell>{g.status}</TableCell>
            <TableCell>{g.members.toString()}</TableCell>
            <TableCell >{g.link}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}



