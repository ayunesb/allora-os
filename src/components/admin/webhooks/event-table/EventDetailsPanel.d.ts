import { WebhookEvent } from "@/types/fixed/Webhook";
interface EventDetailsPanelProps {
  event: WebhookEvent;
  expanded?: boolean;
}
declare const EventDetailsPanel: ({
  event,
  expanded,
}: EventDetailsPanelProps) => JSX.Element;
export default EventDetailsPanel;
