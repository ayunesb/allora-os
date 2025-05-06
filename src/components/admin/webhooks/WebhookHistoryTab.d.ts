import React from "react";
import { WebhookEvent } from "@/types/unified-types";
interface WebhookHistoryTabProps {
  events: WebhookEvent[];
  onRefresh: () => void;
  isLoading: boolean;
}
declare const WebhookHistoryTab: React.FC<WebhookHistoryTabProps>;
export default WebhookHistoryTab;
