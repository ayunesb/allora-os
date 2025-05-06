import React from "react";
interface HelpTooltipProps {
  content: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  children?: React.ReactNode;
  icon?: boolean;
}
export declare function HelpTooltip({
  content,
  className,
  side,
  align,
  children,
  icon,
}: HelpTooltipProps): JSX.Element;
export declare function DocumentationLink({
  href,
  label,
}: {
  href: string;
  label: string;
}): JSX.Element;
export {};
