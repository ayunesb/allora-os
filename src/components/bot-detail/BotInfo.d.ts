import React from "react";
interface BotInfoProps {
  bot: {
    name: string;
    title: string;
    expertise: string;
  };
}
declare const BotInfo: React.FC<BotInfoProps>;
export default BotInfo;
