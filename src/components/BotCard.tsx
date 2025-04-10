
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";

type BotCardProps = {
  bot: {
    name: string;
    title: string;
    specialty: string;
    avatar: string;
    role: string;
  };
  onSelect: () => void;
};

export default function BotCard({ bot, onSelect }: BotCardProps) {
  return (
    <Card 
      className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative pb-[56.25%] h-0 overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10">
        <img 
          src={bot.avatar || `/avatars/${bot.role}.png`} 
          alt={bot.name} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/400x300/1a1a2e/ffffff?text=' + encodeURIComponent(bot.name);
          }}
        />
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-xl">{bot.name}</h3>
        <p className="text-primary text-sm font-medium flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" />
          {bot.title}
        </p>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-start gap-1.5 text-muted-foreground text-sm">
          <GraduationCap className="h-4 w-4 mt-0.5 shrink-0" />
          <p>{bot.specialty}</p>
        </div>
      </CardContent>
    </Card>
  );
}
