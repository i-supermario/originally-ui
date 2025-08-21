import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function OwnerPopover({ owner }: { owner: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.p
          className="underline cursor-pointer text-primary"
          whileHover={{ scale: 1.02, color: "#6366F1" /* Indigo-500 */ }}
          transition={{ type: "spring" }}
        >
          {owner?.firstName || "Owner"}
        </motion.p>
      </PopoverTrigger>

      <AnimatePresence>
        {open && (
          <PopoverContent asChild forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-72 p-4 rounded-lg bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 shadow-lg text-gray-900"
              style={{ boxShadow: "0 8px 20px rgba(99,102,241,0.25)" }}
            >
              <div className="text-sm space-y-2">
                <div><strong>Name:</strong> {owner?.firstName} {owner?.lastName}</div>
                <div><strong>Email:</strong> {owner?.email}</div>
                <div><strong>Phone:</strong> {owner?.phoneNo}</div>
                <div><strong>DOB:</strong> {new Date(owner?.dob).toLocaleDateString()}</div>
              </div>
            </motion.div>
          </PopoverContent>
        )}
      </AnimatePresence>
    </Popover>
  );
}