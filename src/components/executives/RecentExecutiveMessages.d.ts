import React from "react";
import { UnifiedExecutiveMessage } from "@/types/unified-types";
interface RecentExecutiveMessagesProps {
  messages: UnifiedExecutiveMessage[];
  isLoading?: boolean;
  onViewMoreMessages: () => void;
}
export declare const normalizeExecutiveMessage: (
  msg: any,
) => UnifiedExecutiveMessage;
declare const RecentExecutiveMessages: React.FC<RecentExecutiveMessagesProps>;
export default RecentExecutiveMessages;
