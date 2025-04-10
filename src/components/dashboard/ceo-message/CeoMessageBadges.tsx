
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export function CeoMessageBadges() {
  // Get current date for production
  const today = new Date();
  const daysDiff = 0; // Updated to show the message is from today
  const timeString = daysDiff === 0 ? "today" : `${daysDiff} days ago`;

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
        Priority
      </Badge>
      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
        <Clock className="mr-1 h-3 w-3" /> {timeString}
      </Badge>
    </div>
  );
}
