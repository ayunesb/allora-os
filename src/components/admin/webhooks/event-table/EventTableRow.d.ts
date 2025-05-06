import React from "react";
import { WebhookEvent } from "@/types/fixed/Webhook";
interface EventTableRowProps {
  event: WebhookEvent;
  onViewDetails?: (event: WebhookEvent) => void;
  onRetry?: (event: WebhookEvent) => void;
}
export declare const EventTableRow: React.FC<EventTableRowProps>;
export default EventTableRow;
