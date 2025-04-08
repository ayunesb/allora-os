
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

type BotCardProps = {
  bot: {
    name: string;
    title: string;
    specialty: string;
    avatar: string;
    role: string;
  };
  onConsult: () => void;
};

export default function BotCard({ bot, onConsult }: BotCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative pb-[56.25%] h-0">
        <img 
          src={bot.avatar} 
          alt={bot.name} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-xl">{bot.name}</h3>
        <p className="text-primary font-medium text-sm">{bot.title}</p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm">{bot.specialty}</p>
      </CardContent>
      
      <CardFooter className="pt-2 mt-auto">
        <Button 
          onClick={onConsult}
          className="w-full flex items-center justify-center gap-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Consult</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
