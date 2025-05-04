import { CategoryStatus } from './types';
interface StatusItem {
    id: string;
    label: string;
    status: CategoryStatus;
    passedMessage: string;
    failedMessage: string;
    pendingMessage: string;
}
interface AuditStatusListProps {
    items: StatusItem[];
}
export declare function AuditStatusList({ items }: AuditStatusListProps): JSX.Element;
export {};
