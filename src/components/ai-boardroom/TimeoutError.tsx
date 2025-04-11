
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeoutErrorProps {
  onRefresh: () => void;
}

export const TimeoutError: React.FC<TimeoutErrorProps> = ({ onRefresh }) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
        <CardDescription>Taking longer than expected...</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
        <p className="text-sm text-muted-foreground mb-4">The debate seems to be taking a while to load. There might be an issue with the connection.</p>
        <Button 
          variant="default" 
          onClick={onRefresh}
          className="mt-2"
        >
          Refresh the Page
        </Button>
      </CardContent>
    </Card>
  );
};
