import React from "react";
interface HelpTooltipProps {
  content: React.ReactNode;
  className?: string;
  iconClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
}
export declare function HelpTooltip({
  content,
  className,
  iconClassName,
  side,
  align,
  children,
}: HelpTooltipProps): JSX.Element;
export {};
