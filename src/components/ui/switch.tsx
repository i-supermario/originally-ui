import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.25rem] w-8 items-center rounded-full transition-colors border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // Custom black & white states
        "data-[state=checked]:bg-black data-[state=unchecked]:bg-white",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-[1rem] w-[1rem] rounded-full shadow-sm ring-0 transition-transform duration-300",
          // White thumb on black bg, Black thumb on white bg
          "data-[state=checked]:translate-x-[80%] data-[state=checked]:bg-white",
          "data-[state=unchecked]:translate-x-[10%] data-[state=unchecked]:bg-black"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
