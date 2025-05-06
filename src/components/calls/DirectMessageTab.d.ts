import { CommunicationData } from "@/hooks/communications";
interface DirectMessageTabProps {
  phoneNumber: string;
  selectedLeadId: string;
  onMessageSent: (communicationData: CommunicationData) => Promise<any>;
  isLoadingMutation: boolean;
}
export default function DirectMessageTab({
  phoneNumber,
  selectedLeadId,
  onMessageSent,
  isLoadingMutation,
}: DirectMessageTabProps): import("react").JSX.Element;
export {};
