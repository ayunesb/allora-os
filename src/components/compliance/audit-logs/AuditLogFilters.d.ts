interface AuditLogFiltersProps {
  actionFilter: string;
  setActionFilter: (value: string) => void;
  userFilter: string;
  setUserFilter: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onExportLogs: () => void;
}
export default function AuditLogFilters({
  actionFilter,
  setActionFilter,
  userFilter,
  setUserFilter,
  date,
  setDate,
  onExportLogs,
}: AuditLogFiltersProps): import("react").JSX.Element;
export {};
