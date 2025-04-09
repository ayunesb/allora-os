
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  details: string;
  ip: string;
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  return (
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
          {logs.length > 0 ? (
            logs.map((log) => (
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
  );
}
