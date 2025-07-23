import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export function OwnerPopover({ owner }: { owner: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className="underline cursor-pointer">{owner?.firstName || "Owner"}</p>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="text-sm space-y-1">
          <div><strong>Name:</strong> {owner?.firstName} {owner?.lastName}</div>
          <div><strong>Email:</strong> {owner?.email}</div>
          <div><strong>Phone:</strong> {owner?.phoneNo}</div>
          <div><strong>DOB:</strong> {new Date(owner?.dob).toLocaleDateString()}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
