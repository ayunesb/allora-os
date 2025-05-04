import * as React from "react";
interface ProgressBarProps {
    value: number;
    max: number;
    className?: string;
    variant?: "default" | "success" | "warning" | "danger" | "primary" | "gradient";
    showValue?: boolean;
    size?: "sm" | "md" | "lg";
    animated?: boolean;
}
export declare function ProgressBar({ value, max, className, variant, showValue, size, animated }: ProgressBarProps): React.JSX.Element;
export {};
