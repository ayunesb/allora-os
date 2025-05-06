import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Info } from "lucide-react";
import { HelpTooltip } from "@/components/help/HelpTooltip";
export const LoadingState = ({
  title = "AI Executive Boardroom",
  description = "Simulating a live debate among your AI executives",
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{title}</CardTitle>
          <HelpTooltip
            content={
              <div className="space-y-1">
                <p>
                  Our system is generating a realistic debate between AI
                  executive personas.
                </p>
                <p>
                  Each executive will represent different business perspectives
                  based on their role.
                </p>
              </div>
            }
          >
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </HelpTooltip>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">
          Loading the latest boardroom discussion...
        </p>
        <ul className="mt-3 text-xs text-muted-foreground space-y-1 list-none">
          <li>• Generating executive perspectives</li>
          <li>• Analyzing strategic implications</li>
          <li>• Formulating debate structure</li>
          <li>• Preparing insights and recommendations</li>
        </ul>
      </CardContent>
    </Card>
  );
};
