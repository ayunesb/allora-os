import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HelpTooltip } from "@/components/help/HelpTooltip";
export const TimeoutError = ({ onRefresh }) => {
    return (<Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
          <HelpTooltip content={<div className="space-y-1">
              <p>Executive debates occasionally require more processing time than expected.</p>
              <p>This is typically due to high system load or complexity of the debate topic.</p>
            </div>}>
            <Info className="h-4 w-4 text-muted-foreground cursor-help"/>
          </HelpTooltip>
        </div>
        <CardDescription>Taking longer than expected...</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <AlertTriangle className="h-10 w-10 text-amber-500 mb-4"/>
        <p className="text-sm text-muted-foreground mb-4">
          The debate is taking longer than usual to load. This may be due to:
        </p>
        <ul className="text-sm text-muted-foreground mb-4 list-disc pl-5 space-y-1 text-left w-full">
          <li>High complexity of the selected debate topic</li>
          <li>Temporary connectivity issues with our AI services</li>
          <li>High system load during peak usage times</li>
        </ul>
        <Button variant="default" onClick={onRefresh} className="mt-2">
          Refresh the Page
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          If the problem persists after refreshing, try selecting a different debate topic or contact support.
        </p>
      </CardContent>
    </Card>);
};
