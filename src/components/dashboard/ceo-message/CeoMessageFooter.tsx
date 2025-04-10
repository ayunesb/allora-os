
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CeoMessageFooter() {
  return (
    <div className="border-t bg-muted/20 justify-between flex items-center p-6 pt-4">
      <div className="text-sm text-muted-foreground">
        From: <span className="font-medium">Elon Musk, AI CEO</span>
      </div>
      <Button size="sm" variant="default" asChild>
        <Link to="/dashboard/ai-bots">Schedule Strategy Meeting</Link>
      </Button>
    </div>
  );
}
