
import { useState } from "react";
import ComplianceLayout from "@/components/ComplianceLayout";
import AuditLogFilters from "@/components/compliance/audit-logs/AuditLogFilters";
import AuditLogTable from "@/components/compliance/audit-logs/AuditLogTable";
import { mockAuditLogs } from "@/components/compliance/audit-logs/mockData";

export default function AuditLogs() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [actionFilter, setActionFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  
  // Filter logs based on selected filters
  const filteredLogs = mockAuditLogs.filter(log => {
    // Filter by action type if selected
    if (actionFilter && log.action !== actionFilter) return false;
    
    // Filter by user search term
    if (userFilter && !log.user.toLowerCase().includes(userFilter.toLowerCase())) return false;
    
    // Filter by date if selected
    if (date) {
      const logDate = new Date(log.timestamp).toDateString();
      const selectedDate = date.toDateString();
      if (logDate !== selectedDate) return false;
    }
    
    return true;
  });
  
  // Handle log export (mock function)
  const handleExportLogs = () => {
    console.log("Exporting logs:", filteredLogs);
    // In a real app, this would trigger a download
  };
  
  return (
    <ComplianceLayout>
      <div className="space-y-6">
        <AuditLogFilters 
          actionFilter={actionFilter}
          setActionFilter={setActionFilter}
          userFilter={userFilter}
          setUserFilter={setUserFilter}
          date={date}
          setDate={setDate}
          onExportLogs={handleExportLogs}
        />
        
        <AuditLogTable logs={filteredLogs} />
      </div>
    </ComplianceLayout>
  );
}
