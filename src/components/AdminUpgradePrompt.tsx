
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronRight, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdminUpgradePromptProps {
  className?: string;
  onUpgrade?: () => void;
  onContinue?: () => void;
}

export default function AdminUpgradePrompt({ className, onUpgrade, onContinue }: AdminUpgradePromptProps) {
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Admin Access Required</CardTitle>
        <p className="text-muted-foreground">
          You need admin privileges to access this feature.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="bg-muted/50 p-4 rounded-lg border border-muted flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium">Restricted Access</p>
            <p className="text-sm text-muted-foreground">
              The audit and compliance section contains sensitive system information and is only accessible to administrators.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button className="w-full" onClick={onUpgrade}>
          Upgrade to Admin
        </Button>
        <Button variant="ghost" className="w-full flex items-center justify-between" onClick={onContinue}>
          <span>Continue to Dashboard</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
