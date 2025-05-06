import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Briefcase, GraduationCap } from "lucide-react";
const BotInfo = ({ bot }) => {
  return (
    <div className="flex items-start gap-4">
      <div
        className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <Bot className="h-6 w-6 text-primary" />
      </div>
      <div className="overflow-hidden">
        <CardTitle id={`bot-${bot.name.replace(/\s+/g, "-").toLowerCase()}`}>
          {bot.name}
        </CardTitle>
        <CardDescription
          className="flex items-center gap-1 mt-1 truncate"
          aria-labelledby={`bot-${bot.name.replace(/\s+/g, "-").toLowerCase()}`}
        >
          <Briefcase className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{bot.title}</span>
        </CardDescription>
        <div
          className="flex items-center gap-1 text-sm text-muted-foreground mt-1 truncate"
          aria-label={`${bot.name}'s expertise: ${bot.expertise}`}
        >
          <GraduationCap
            className="h-3.5 w-3.5 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{bot.expertise}</span>
        </div>
      </div>
    </div>
  );
};
export default BotInfo;
