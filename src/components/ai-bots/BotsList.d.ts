import React from "react";
interface BotProps {
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
  outputLocation?: string;
  exampleAction?: string;
}
interface BotsListProps {
  filteredBots: BotProps[];
  onSelectBot: (bot: BotProps) => void;
}
export declare const BotsList: React.FC<BotsListProps>;
export {};
