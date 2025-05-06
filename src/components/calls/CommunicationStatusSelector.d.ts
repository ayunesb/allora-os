import { CommunicationOutcome } from "@/hooks/communications";
interface CommunicationStatusSelectorProps {
  communicationId: string;
  currentStatus: string;
  currentOutcome: CommunicationOutcome;
}
export default function CommunicationStatusSelector({
  communicationId,
  currentStatus,
  currentOutcome,
}: CommunicationStatusSelectorProps): import("react").JSX.Element;
export {};
