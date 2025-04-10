
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

export function CeoMessageBadges() {
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
        Priority
      </Badge>
      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
        <Clock className="mr-1 h-3 w-3" /> 2 days ago
      </Badge>
    </div>
  );
}
