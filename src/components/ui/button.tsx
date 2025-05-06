import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "default" | "outline";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    size = "md",
    onClick,
    disabled = false,
}) => {
    return (
        <button
            className={cn(
                "btn",
                variant === "outline" && "btn-outline",
                size === "lg" && "btn-lg",
                size === "sm" && "btn-sm"
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
