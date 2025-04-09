
import { Loader2 } from "lucide-react";

export function AuthLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Loading your account information...</p>
    </div>
  );
}
