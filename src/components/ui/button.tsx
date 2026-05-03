import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      primary: "bg-neon-yellow text-black hover:bg-neon-yellow/90 neon-glow",
      secondary: "bg-magenta text-white hover:bg-magenta/90 magenta-glow",
      outline: "border-2 border-white/20 bg-transparent hover:bg-white/10",
      ghost: "bg-transparent hover:bg-white/5",
    }

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-semibold",
      lg: "px-8 py-4 text-lg font-bold uppercase tracking-wider",
      icon: "p-2",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer font-bebas",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
