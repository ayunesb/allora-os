
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface BotCardProps {
  bot: {
    name: string;
    title: string;
    specialty: string;
    avatar: string;
    role: string;
  };
  onConsult: () => void;
}

export default function BotCard({ bot, onConsult }: BotCardProps) {
  const getRoleDescription = (role: string) => {
    switch(role) {
      case 'ceo':
        return 'Chief Executive Officer: Strategic Vision & Leadership';
      case 'cfo':
        return 'Chief Financial Officer: Financial Planning & Analysis';
      case 'cmo':
        return 'Chief Marketing Officer: Brand Strategy & Growth';
      case 'cio':
        return 'Chief Information Officer: Technology Strategy';
      case 'chro':
        return 'Chief HR Officer: Talent Strategy & Culture';
      default:
        return 'Strategic Advisor';
    }
  };

  return (
    <div className="dashboard-card flex flex-col items-center text-center group">
      <Link to={`/dashboard/ai-bots/${encodeURIComponent(bot.name)}/${bot.role}`} className="block w-full">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary mx-auto transition-transform group-hover:scale-105">
          <img src={bot.avatar} alt={bot.name} className="w-full h-full object-cover" />
        </div>
        
        <h3 className="text-xl font-bold mb-1">{bot.name}</h3>
        <p className="text-primary mb-1">{bot.title}</p>
        <p className="text-gray-400 text-sm mb-2">{bot.specialty}</p>
      </Link>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs text-muted-foreground mb-4 inline-block">
              {bot.role.toUpperCase()}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getRoleDescription(bot.role)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Button className="mt-auto w-full" onClick={onConsult}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Consult
      </Button>
    </div>
  );
}
