import { Alert } from '@/utils/monitoring';
interface AlertListProps {
    alerts: Alert[];
    onAcknowledge: (alertId: string) => void;
}
export declare const AlertList: ({ alerts, onAcknowledge }: AlertListProps) => JSX.Element;
export {};
