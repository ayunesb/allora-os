
import React from "react";
import { BadgeInfo } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BotCard from "@/components/BotCard";

interface BotsListProps {
  filteredBots: Array<{
    name: string;
    role: string;
    title: string;
    specialty: string;
    avatar: string;
  }>;
  onSelectBot: (bot: any) => void;
}

export const BotsList: React.FC<BotsListProps> = ({ filteredBots, onSelectBot }) => {
  if (filteredBots.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <BadgeInfo className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No advisors found</h3>
          <p className="text-muted-foreground max-w-md">
            We couldn't find any executive advisors matching your search criteria. 
            Try adjusting your filters or search query.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredBots.map((bot) => (
        <BotCard 
          key={`${bot.role}-${bot.name}`} 
          bot={bot}
          onSelect={() => onSelectBot(bot)}
        />
      ))}
    </div>
  );
};
