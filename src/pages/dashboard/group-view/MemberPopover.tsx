import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

export function MemberPopover({ members, groupId }: { members: any[], groupId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = (memberId: string) => {
    startTransition(() => {
      // Replace with actual logic (API call)
      console.log(`Remove member ${memberId} from group ${groupId}`);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="underline cursor-pointer">
          {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {members?.length || 0}
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-72 max-h-64 overflow-auto">
        {members?.length > 0 ? (
          <ul className="text-sm space-y-2">
            {members.map((m, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div>
                  <strong>{m.firstName} {m.lastName}</strong>
                  <div className="text-xs text-muted-foreground">{m.email}</div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="w-6 h-6"
                  onClick={() => handleRemove(m._id)}
                  disabled={isPending}
                >
                  &times;
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-muted-foreground text-sm">No Members</span>
        )}
      </PopoverContent>
    </Popover>
  );
}
