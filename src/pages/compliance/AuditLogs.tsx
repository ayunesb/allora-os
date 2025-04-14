
import React, { useState } from 'react';
import AuditLogTable from '@/components/compliance/audit-logs/AuditLogTable';
import AuditLogFilters from '@/components/compliance/audit-logs/AuditLogFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditLog } from '@/components/compliance/audit-logs/AuditLogTable';

// Mock audit logs data
const mockLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2025-04-13T15:23:45Z",
    user: "john.doe@example.com",
    action: "DATA_ACCESS",
    resource: "Customer Database",
    details: "Viewed customer records",
    ip: "192.168.1.100"
  },
  {
    id: "2",
    timestamp: "2025-04-13T14:12:30Z",
    user: "admin@allora.ai",
    action: "SYSTEM_CHANGE",
    resource: "System Settings",
    details: "Updated security settings",
    ip: "192.168.1.101"
  },
  {
    id: "3",
    timestamp: "2025-04-12T09:45:22Z",
    user: "sarah.smith@example.com",
    action: "AUTHENTICATION",
    resource: "User Account",
    details: "Failed login attempt",
    ip: "192.168.1.102"
  },
  {
    id: "4",
    timestamp: "2025-04-11T16:33:10Z",
    user: "admin@allora.ai",
    action: "DATA_MODIFICATION",
    resource: "Strategy Document",
    details: "Modified business strategy document",
    ip: "192.168.1.101"
  },
  {
    id: "5",
    timestamp: "2025-04-10T11:18:45Z",
    user: "john.doe@example.com",
    action: "EXPORT",
    resource: "Analytics Report",
    details: "Exported quarterly analytics report",
    ip: "192.168.1.100"
  }
];

export default function AuditLogs() {
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Filter logs based on selected filters
  const filteredLogs = mockLogs.filter(log => {
    // Filter by action type
    if (actionFilter !== "all" && log.action !== actionFilter) {
      return false;
    }
    
    // Filter by user
    if (userFilter && !log.user.toLowerCase().includes(userFilter.toLowerCase())) {
      return false;
    }
    
    // Filter by date
    if (date) {
      const logDate = new Date(log.timestamp).toDateString();
      const filterDate = date.toDateString();
      if (logDate !== filterDate) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleExportLogs = () => {
    console.log("Exporting logs...");
    // In a real app, this would trigger a download of the filtered logs
    alert("Logs export initiated");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Audit Logs</CardTitle>
          <CardDescription>Track all system activities and compliance-related events</CardDescription>
        </CardHeader>
        <CardContent>
          <AuditLogFilters 
            actionFilter={actionFilter}
            setActionFilter={setActionFilter}
            userFilter={userFilter}
            setUserFilter={setUserFilter}
            date={date}
            setDate={setDate}
            onExportLogs={handleExportLogs}
          />
          <div className="mt-6">
            <AuditLogTable logs={filteredLogs} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
