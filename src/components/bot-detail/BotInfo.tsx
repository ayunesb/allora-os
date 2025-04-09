
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Briefcase, GraduationCap } from "lucide-react";

interface BotInfoProps {
  bot: {
    name: string;
    title: string;
    expertise: string;
  };
}

const BotInfo: React.FC<BotInfoProps> = ({ bot }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="h-6 w-6 text-primary" />
      </div>
      <div>
        <CardTitle>{bot.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 mt-1">
          <Briefcase className="h-3.5 w-3.5" />
          <span>{bot.title}</span>
        </CardDescription>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>{bot.expertise}</span>
        </div>
      </div>
    </div>
  );
};

export default BotInfo;
