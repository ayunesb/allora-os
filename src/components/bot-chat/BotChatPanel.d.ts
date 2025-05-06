import React from "react";
export interface BotChatPanelProps {
  botId?: string;
  bot?: {
    name: string;
    title?: string;
    avatar?: string;
  };
  selectedBot?: any;
  onSelectBot?: React.Dispatch<any>;
  allBots?: Array<any>;
}
declare const BotChatPanel: ({
  botId,
  bot,
  selectedBot,
  onSelectBot,
  allBots,
}: BotChatPanelProps) => JSX.Element;
export default BotChatPanel;
