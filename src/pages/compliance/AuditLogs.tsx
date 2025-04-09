
import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";
import { cn } from "@/lib/utils";

// Mock audit log data
const mockAuditLogs = [
  {
    id: "1",
    timestamp: "2025-04-09T08:23:11Z",
    user: "john.smith@example.com",
    action: "DATA_ACCESS",
    resource: "customer_records",
    details: "Viewed customer #1098 personal information",
    ip: "192.168.1.45"
  },
  {
    id: "2",
    timestamp: "2025-04-09T07:15:22Z",
    user: "admin@allora-ai.com",
    action: "SYSTEM_CHANGE",
    resource: "security_settings",
    details: "Updated password policy requirements",
    ip: "203.0.113.42"
  },
  {
    id: "3",
    timestamp: "2025-04-08T16:47:03Z",
    user: "jane.doe@example.com",
    action: "EXPORT",
    resource: "financial_data",
    details: "Exported Q1 financial report",
    ip: "198.51.100.73"
  },
  {
    id: "4",
    timestamp: "2025-04-08T14:32:18Z",
    user: "system",
    action: "AUTHENTICATION",
    resource: "login_service",
    details: "Failed login attempt for user mark@example.com",
    ip: "203.0.113.15"
  },
  {
    id: "5",
    timestamp: "2025-04-08T10:05:47Z",
    user: "sarah.johnson@example.com",
    action: "DATA_MODIFICATION",
    resource: "product_database",
    details: "Updated pricing for product SKU-7734",
    ip: "192.168.1.27"
  }
];

export default function AuditLogs() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [actionFilter, setActionFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  
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
  
  return (
    <ComplianceLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-medium">Action Type</label>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All actions</SelectItem>
                <SelectItem value="DATA_ACCESS">Data Access</SelectItem>
                <SelectItem value="DATA_MODIFICATION">Data Modification</SelectItem>
                <SelectItem value="AUTHENTICATION">Authentication</SelectItem>
                <SelectItem value="SYSTEM_CHANGE">System Change</SelectItem>
                <SelectItem value="EXPORT">Export</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 w-full md:w-60">
            <label className="text-sm font-medium">User</label>
            <Input 
              placeholder="Search by user" 
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 w-full md:w-48">
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button
            variant="outline"
            onClick={() => {
              setActionFilter("");
              setUserFilter("");
              setDate(undefined);
            }}
          >
            Reset Filters
          </Button>
          
          <Button className="ml-auto" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
                <TableHead className="hidden md:table-cell">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        {
                          "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300": log.action === "DATA_ACCESS",
                          "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300": log.action === "DATA_MODIFICATION",
                          "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300": log.action === "AUTHENTICATION",
                          "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300": log.action === "SYSTEM_CHANGE",
                          "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300": log.action === "EXPORT",
                        }
                      )}>
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell className="hidden md:table-cell">{log.details}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">{log.ip}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No audit logs match the current filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </ComplianceLayout>
  );
}
