
import { ReactNode } from 'react';

export interface LaunchInfoProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  status?: 'initial' | 'in-progress' | 'completed' | 'error';
  children?: ReactNode;
}

export interface LaunchInfoBoxProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  status?: 'initial' | 'in-progress' | 'completed' | 'error';
  children?: ReactNode;
}

export interface LaunchProgressProps {
  totalItems: number;
  completedItems: number;
  status: string;
  isComplete?: boolean;
  launchStep?: string;
}

export interface ValidationResultItemProps {
  id: string;
  title: string;
  result: { valid: boolean; message: string };
}

export interface DatabaseTableStatus {
  name: string;
  description?: string;
  exists: boolean;
  hasData?: boolean;
  columnsValid?: boolean;
}

export interface ChecklistItemProps {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  isRequired?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  disableAction?: boolean;
}
