import { Communication } from "@/hooks/useCommunications";
interface CommunicationAnalyticsProps {
  communications: Communication[];
  isLoading: boolean;
}
export default function CommunicationAnalytics({
  communications,
  isLoading,
}: CommunicationAnalyticsProps): import("react").JSX.Element;
export {};
