import React from "react";
import { HelpContent } from "@/types/help";
interface HelpButtonProps {
    helpContent: HelpContent;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    children?: React.ReactNode;
}
export declare function HelpButton({ helpContent, className, variant, size, children, }: HelpButtonProps): JSX.Element;
export {};
