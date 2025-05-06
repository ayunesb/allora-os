import { Communication } from "@/hooks/communications";
interface CommunicationItemProps {
  communication: Communication;
  isUpcoming: boolean;
}
export default function CommunicationItem({
  communication,
  isUpcoming,
}: CommunicationItemProps): import("react").JSX.Element;
export {};
