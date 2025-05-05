import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
export function AuthIssue({ onSignOut, onRefresh }) {
    return (<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="bg-card border rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Authentication Issue</h2>
        <p className="text-muted-foreground mb-6">
          There was a problem loading your account information. This might be due to a temporary connection issue.
        </p>
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={onSignOut}>
            <LogOut className="mr-2 h-4 w-4"/>
            Sign out
          </Button>
          <Button onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4"/>
            Refresh page
          </Button>
        </div>
      </div>
    </div>);
}
