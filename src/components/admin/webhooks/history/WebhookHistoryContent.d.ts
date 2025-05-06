import { WebhookEvent } from "@/types/fixed/Webhook";
interface WebhookHistoryContentProps {
  events: WebhookEvent[];
}
export declare function WebhookHistoryContent({
  events: initialEvents,
}: WebhookHistoryContentProps): JSX.Element;
export default WebhookHistoryContent;
