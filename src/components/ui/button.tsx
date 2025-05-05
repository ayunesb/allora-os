import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden shadow-sm hover:shadow-md", {
    variants: {
        variant: {
            default: "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary hover:to-primary-dark hover:shadow-primary/20 hover:scale-[1.02] after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 after:bg-gradient-to-r after:from-blue-400/20 after:to-purple-500/20 hover:after:opacity-100",
            destructive: "bg-destructive text-white hover:bg-destructive/90 hover:shadow-destructive/20 hover:scale-[1.02]",
            outline: "border border-white/20 bg-black/30 backdrop-blur-sm text-white hover:bg-white/5 hover:border-white/30 hover:text-white hover:scale-[1.02]",
            secondary: "bg-gradient-to-r from-secondary to-secondary/90 text-white hover:from-secondary hover:to-secondary-dark hover:shadow-secondary/20 hover:scale-[1.02]",
            ghost: "hover:bg-white/5 hover:text-white text-gray-300 hover:scale-[1.02]",
            link: "text-primary underline-offset-4 hover:underline",
            gradient: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:scale-[1.02]",
            success: "bg-success text-white hover:bg-success/90 hover:shadow-success/20 hover:scale-[1.02]",
            premium: "bg-black/40 backdrop-blur-md border border-white/10 text-white hover:border-primary/30 hover:shadow-primary/10 hover:scale-[1.02] after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:duration-300 after:bg-gradient-to-r after:from-primary/10 after:to-secondary/10 hover:after:opacity-100"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-lg px-3 text-xs",
            lg: "h-11 rounded-xl px-8 text-base",
            icon: "h-10 w-10",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}/>);
});
Button.displayName = "Button";
export { Button, buttonVariants };
