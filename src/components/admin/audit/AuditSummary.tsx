
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CategoryStatus } from './types';

interface AuditSummaryProps {
  summary: {
    total: number;
    passed: number;
    failed: number;
    pending: number;
  };
}

export function AuditSummary({ summary }: AuditSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-muted/50">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-bold mb-2">{summary.total}</div>
          <div className="text-sm text-muted-foreground">Total Checks</div>
        </CardContent>
      </Card>
      <Card className="bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">{summary.passed}</div>
          <div className="text-sm text-green-600 dark:text-green-400">Passed</div>
        </CardContent>
      </Card>
      <Card className={summary.failed > 0 ? "bg-red-50 dark:bg-red-950/20" : "bg-muted/50"}>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <div className={`text-4xl font-bold mb-2 ${summary.failed > 0 ? "text-red-600 dark:text-red-500" : ""}`}>
            {summary.failed}
          </div>
          <div className={`text-sm ${summary.failed > 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
            Failed
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
