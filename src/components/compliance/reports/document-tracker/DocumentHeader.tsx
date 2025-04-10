
import { Button } from "@/components/ui/button";

interface DocumentHeaderProps {
  onCheckForUpdates: () => void;
  isCheckingUpdates: boolean;
  lastChecked: Date | null;
}

export default function DocumentHeader({ 
  onCheckForUpdates, 
  isCheckingUpdates,
  lastChecked 
}: DocumentHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Document Version Tracker</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCheckForUpdates}
          disabled={isCheckingUpdates}
        >
          {isCheckingUpdates ? "Checking..." : "Check for Updates"}
        </Button>
      </div>
      
      {lastChecked && (
        <p className="text-sm text-muted-foreground mb-4">
          Last checked: {lastChecked.toLocaleString()}
        </p>
      )}
    </>
  );
}
