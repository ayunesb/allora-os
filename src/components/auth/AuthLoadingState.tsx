import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export function AuthLoadingState() {
  const [longLoading, setLongLoading] = useState(false);
  useEffect(() => {
    // If loading takes more than 5 seconds, show additional message
    const timer = setTimeout(() => {
      setLongLoading(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground mb-2">
        Loading your account information...
      </p>

      {longLoading && (
        <div className="mt-6 text-center max-w-md">
          <p className="text-sm text-muted-foreground mb-4">
            This is taking longer than expected. If the page doesn't load in a
            few seconds, try refreshing the page.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      )}
    </div>
  );
}
