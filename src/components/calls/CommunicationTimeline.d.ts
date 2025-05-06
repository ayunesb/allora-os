import { Communication } from "@/hooks/communications";
interface CommunicationTimelineProps {
  upcomingCommunications: Communication[];
  pastCommunications: Communication[];
  isLoading: boolean;
}
export default function CommunicationTimeline({
  upcomingCommunications,
  pastCommunications,
  isLoading,
}: CommunicationTimelineProps): import("react").JSX.Element;
export {};
