import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { API } from "@/api";
import { mockGroups } from "@/mock/group";
import { useSession } from "@/providers/SessionProvider";
import { GroupI } from "@/types/group";
import { PopoverClose } from "@radix-ui/react-popover";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";



export default function Dashboard(){

  return(
    <>
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Your groups</p>
        <div className="flex py-6">
          <CreateGroupPopup/>
        </div>
        <Separator className="my-4 bg-gray-300" />
        <div>
          <GroupTable data={mockGroups} />
        </div>
      </div>
    </>
  )
}



const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export function CreateGroupPopup() {
  const { userId } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    API.METHODS.POST(
      API.ENDPOINTS.group.create,
      { ownerId: userId, ...data },
      { withCredentials: true },
      {
        onSuccess: (response) => toast.success(response.message),
        onError: () => toast.error("Failed to create group"),
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Create</Button>
      </PopoverTrigger>
      <PopoverContent className=" bg-white">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Create New Group</h4>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Group description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PopoverClose asChild>
                <Button variant="outline" type="submit" className="">
                  Submit
                </Button>
              </PopoverClose>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
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



