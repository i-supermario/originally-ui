import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PopoverClose } from "@radix-ui/react-popover";

import { CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { API } from "@/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/providers/SessionProvider";

const formSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: "Due date is required" }).min(new Date()),
});

export function CreateAssignmentPopover({ onSuccess }: { onSuccess: () => void }) {

  const { userId } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      dueDate: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    API.METHODS.POST(
      API.ENDPOINTS.assignment.create,
      {
        ownerId: userId,
        ...form.getValues()
      },
      { withCredentials: true },
      {
        onSuccess: () => {
          toast.success("Task created");
          onSuccess();
        },
        onError: (response) => toast.error(response.message || "Failed to create task"),
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          New Assignment
          <Plus className="size-4 mr-2" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 bg-white space-y-4">
        <h4 className="text-lg font-semibold">Create Assignment</h4>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the task" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date Field */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? field.value.toDateString() : "Pick a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        startMonth={new Date()}
                        selected={field.value instanceof Date ? field.value : undefined}
                        onSelect={(date) => field.onChange(date)}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />


            <PopoverClose asChild>
              <Button type="submit" variant="outline">
                Create Assignment
              </Button>
            </PopoverClose>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
