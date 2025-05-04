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
export default function AuditLogTable({ logs }: AuditLogTableProps): import("react").JSX.Element;
export {};
