import { useState } from 'react';
export function useAnalytics() {
    const [systemAnalytics, setSystemAnalytics] = useState(null);
    const [dashboardAnalytics, setDashboardAnalytics] = useState(null);
    return {
        systemAnalytics,
        dashboardAnalytics,
        setSystemAnalytics,
        setDashboardAnalytics
    };
}
