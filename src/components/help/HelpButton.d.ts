interface HelpButtonProps {
  contextId: string;
  variant?: "text" | "icon" | "outline" | "default" | "premium";
  size?: "sm" | "default" | "lg";
  tooltipText?: string;
  className?: string;
  showTooltip?: boolean;
}
export declare function HelpButton({
  contextId,
  variant,
  size,
  tooltipText,
  className,
  showTooltip,
}: HelpButtonProps): JSX.Element;
export {};
