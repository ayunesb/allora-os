
import React from 'react';
import AuditLogTable from '@/components/compliance/audit-logs/AuditLogTable';
import AuditLogFilters from '@/components/compliance/audit-logs/AuditLogFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Audit Logs</CardTitle>
          <CardDescription>Track all system activities and compliance-related events</CardDescription>
        </CardHeader>
        <CardContent>
          <AuditLogFilters />
          <div className="mt-6">
            <AuditLogTable />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
