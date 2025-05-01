
export interface ChecklistItem {
  id: string;
  name: string;
  status: 'completed' | 'warning' | 'in-progress' | 'pending';
  isRequired: boolean;
  statusMessage?: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
}

export interface VerificationResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: any;
}
