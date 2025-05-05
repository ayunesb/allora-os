import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
export function CeoMessageBadges() {
    // Production-ready time display
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    }).format(currentDate);
    return (<div className="flex items-center space-x-2">
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
        Priority
      </Badge>
      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
        <Clock className="mr-1 h-3 w-3"/> {formattedDate}
      </Badge>
    </div>);
}
