
export interface AuditComponentProps {
  status: string;
  onStatusChange: (status: string) => void;
}

export interface AuditCheckItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'passed' | 'failed';
  required: boolean;
}
