
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SessionRefreshBarProps {
  onRefreshSession: () => void;
}

export function SessionRefreshBar({ onRefreshSession }: SessionRefreshBarProps) {
  return (
    <div className="bg-muted py-2 px-4 border-b">
      <div className="container mx-auto flex justify-end">
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onRefreshSession}
          className="text-xs flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> Refresh Session
        </Button>
      </div>
    </div>
  );
}
