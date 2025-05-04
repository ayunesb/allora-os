import { SystemService } from './SystemHealthPage';
interface SystemHealthCardsProps {
    systemHealth: {
        status: 'healthy' | 'degraded' | 'down';
        percentage: number;
    };
    services: SystemService[];
}
export default function SystemHealthCards({ systemHealth, services }: SystemHealthCardsProps): JSX.Element;
export {};
