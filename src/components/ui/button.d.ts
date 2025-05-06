import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (
  props?: {
    variant?:
      | "default"
      | "outline"
      | "link"
      | "success"
      | "destructive"
      | "secondary"
      | "ghost"
      | "gradient"
      | "premium";
    size?: "default" | "icon" | "lg" | "sm";
  } & import("class-variance-authority/dist/types").ClassProp,
) => string;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;
export { Button, buttonVariants };
