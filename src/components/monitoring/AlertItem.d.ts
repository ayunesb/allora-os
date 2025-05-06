import { Alert } from "@/utils/monitoring";
interface AlertItemProps {
  alert: Alert;
  onAcknowledge: (alertId: string) => void;
}
export declare const AlertItem: ({
  alert,
  onAcknowledge,
}: AlertItemProps) => JSX.Element;
export {};
