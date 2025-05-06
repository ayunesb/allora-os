import { useState } from "react";

export function useAnalytics() {
  const [systemAnalytics, setSystemAnalytics] = useState<any>(null);
  const [dashboardAnalytics, setDashboardAnalytics] = useState<any>(null);

  return {
    systemAnalytics,
    dashboardAnalytics,
    setSystemAnalytics,
    setDashboardAnalytics,
  };
}
