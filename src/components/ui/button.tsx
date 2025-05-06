import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    disabled?: boolean;
    className?: string; // Ensure optional
    type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    size = "md",
    onClick,
    disabled = false,
    className = "", // Default value
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${variant} ${size} ${className}`.trim()} // Ensure no trailing spaces
        >
            {children}
        </button>
    );
};
