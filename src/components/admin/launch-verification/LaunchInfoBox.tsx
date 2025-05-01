
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LaunchInfoBoxProps } from './types';

export function LaunchInfoBox({ title, content }: LaunchInfoBoxProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
