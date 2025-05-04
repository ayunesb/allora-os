import React from 'react';
import { AlertSeverity } from '@/utils/monitoring';
interface AlertsPanelProps {
    maxAlerts?: number;
    defaultExpanded?: boolean;
    showOnlyUnacknowledged?: boolean;
    severityFilter?: AlertSeverity;
}
declare const AlertsPanel: React.FC<AlertsPanelProps>;
export default AlertsPanel;
