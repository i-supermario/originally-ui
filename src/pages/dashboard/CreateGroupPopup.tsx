import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "@/providers/SessionProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { API } from "@/api";
import { z } from "zod";
import { PopoverClose } from "@radix-ui/react-popover";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export function CreateGroupPopup({ onGroupCreated }: { onGroupCreated: () => void }) {
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
        onSuccess: (response) => {
          toast.success(response.message);
          onGroupCreated();
        },
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






