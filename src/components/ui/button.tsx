import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = "default", 
  size = "sm", 
  ...props 
}) => {
  return (
    <button 
      className={cn(
        "btn", 
        variant === "outline" && "btn-outline", 
        size === "lg" && "btn-lg", 
        size === "sm" && "btn-sm", 
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};
