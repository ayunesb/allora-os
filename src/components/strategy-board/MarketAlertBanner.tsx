
import React, { useState } from "react";
import { Bell, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MarketAlert {
  id: string;
  title: string;
  description: string;
  relatedStrategyId?: string;
  severity: 'low' | 'medium' | 'high';
}

interface MarketAlertBannerProps {
  alerts: MarketAlert[];
}

export default function MarketAlertBanner({ alerts }: MarketAlertBannerProps) {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  
  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));
  
  if (visibleAlerts.length === 0) {
    return null;
  }
  
  const currentAlert = visibleAlerts[currentAlertIndex];
  
  const handleDismiss = () => {
    setDismissedAlerts(prev => new Set([...prev, currentAlert.id]));
    
    // If there are more alerts, move to the next one
    if (currentAlertIndex < visibleAlerts.length - 1) {
      setCurrentAlertIndex(prev => prev + 1);
    }
  };
  
  // Get alert style based on severity
  const getAlertStyle = () => {
    switch (currentAlert.severity) {
      case 'high':
        return "border-red-500/30 bg-red-500/10";
      case 'medium':
        return "border-amber-500/30 bg-amber-500/10";
      case 'low':
        return "border-blue-500/30 bg-blue-500/10";
      default:
        return "border-primary/30 bg-primary/10";
    }
  };
  
  return (
    <Alert className={`backdrop-blur-md flex items-center gap-4 ${getAlertStyle()}`}>
      <Bell className="h-5 w-5 text-amber-400 animate-pulse" />
      <div className="flex-1">
        <AlertTitle className="text-white">{currentAlert.title}</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          {currentAlert.description}
        </AlertDescription>
      </div>
      
      <div className="flex gap-2">
        {currentAlert.relatedStrategyId && (
          <Button variant="outline" size="sm" className="hidden sm:flex">
            View Strategy <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
        
        <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-muted-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}
