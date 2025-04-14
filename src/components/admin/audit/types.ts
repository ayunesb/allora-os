
export type CategoryStatus = 'pending' | 'in-progress' | 'passed' | 'failed';

export interface AuditComponentProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export interface AuditCheckItem {
  id: string;
  title: string;
  description: string;
  status: CategoryStatus;
  required: boolean;
}
