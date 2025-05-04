export interface SystemService {
    id: string;
    name: string;
    description: string;
    status: 'healthy' | 'degraded' | 'down';
    lastChecked: string;
    responseTime?: number;
    details?: string;
}
export default function SystemHealthPage(): JSX.Element;
