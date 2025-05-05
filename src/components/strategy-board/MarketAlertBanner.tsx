import React, { useState } from "react";
import { Bell, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrendReportModal from "./TrendReportModal";
export default function MarketAlertBanner({ alerts, onDismiss }) {
    const [trendReportOpen, setTrendReportOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState(null);
    if (!alerts || alerts.length === 0)
        return null;
    const openTrendReport = (alert) => {
        setSelectedAlert(alert);
        setTrendReportOpen(true);
    };
    const closeTrendReport = () => {
        setTrendReportOpen(false);
    };
    return (<div className="mb-6 animate-fadeIn">
      {alerts.map((alert) => (<div key={alert.id} className="relative flex items-center gap-3 p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg text-amber-100">
          <Bell className="h-5 w-5 text-amber-400 flex-shrink-0 animate-pulse"/>
          <div className="flex-1">
            <p className="font-medium">
              🔔 Market Alert: {alert.message}
            </p>
            {alert.affectedStrategies && alert.affectedStrategies.length > 0 && (<p className="text-sm text-amber-300/70 mt-1">
                Affected strategies: {alert.affectedStrategies.join(', ')}
              </p>)}
          </div>
          <div className="flex gap-2 items-center">
            {alert.trendReport && (<Button variant="outline" size="sm" className="text-xs border-amber-700 bg-amber-900/30 hover:bg-amber-800/40 text-amber-300" onClick={() => openTrendReport(alert)}>
                View AI Trend Report
                <ExternalLink className="ml-1 h-3 w-3"/>
              </Button>)}
            {onDismiss && (<Button variant="ghost" size="sm" className="text-amber-300 hover:text-amber-100 hover:bg-amber-950/50 h-8 w-8 p-0" onClick={() => onDismiss(alert.id)}>
                <span className="sr-only">Dismiss</span>
                <XCircle className="h-5 w-5"/>
              </Button>)}
          </div>
        </div>))}
      
      {/* Trend Report Modal */}
      <TrendReportModal isOpen={trendReportOpen} onClose={closeTrendReport} trendData={selectedAlert?.trendReport}/>
    </div>);
}
