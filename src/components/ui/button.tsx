import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer font-bebas",
  {
    variants: {
      variant: {
        primary: "bg-brand-pink text-white hover:bg-brand-pink/90 neon-glow",
        default: "bg-brand-pink text-white hover:bg-brand-pink/90 neon-glow",
        secondary: "bg-brand-light text-brand-pink hover:bg-brand-light/90 magenta-glow",
        outline: "border-2 border-white/20 bg-transparent hover:bg-white/10",
        ghost: "bg-transparent hover:bg-white/5",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base font-semibold",
        lg: "px-8 py-4 text-lg font-bold uppercase tracking-wider",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
