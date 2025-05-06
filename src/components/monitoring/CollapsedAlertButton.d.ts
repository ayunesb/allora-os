import { Alert } from "@/utils/monitoring";
interface CollapsedAlertButtonProps {
  alerts: Alert[];
  onClick: () => void;
}
export declare const CollapsedAlertButton: ({
  alerts,
  onClick,
}: CollapsedAlertButtonProps) => JSX.Element;
export {};
