
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useZapier, BusinessEventType, BusinessEventPayload } from '@/lib/zapier';

interface ZapierTriggerButtonProps {
  event: string;
  payload?: Record<string, any>;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  entityId?: string;
  entityType?: string;
  autoTrigger?: boolean; // New prop to indicate if this should auto-trigger on mount
}

const ZapierTriggerButton: React.FC<ZapierTriggerButtonProps> = ({
  event,
  payload = {},
  label = "Trigger Zapier",
  variant = "outline",
  size = "default",
  className = "",
  entityId,
  entityType,
  autoTrigger = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { triggerWorkflow, triggerBusinessEvent } = useZapier();
  
  // Auto-trigger effect
  React.useEffect(() => {
    if (autoTrigger) {
      handleTrigger(true);
    }
  }, [autoTrigger, event]);
  
  const handleTrigger = async (silent = false) => {
    if (isLoading) return; // Prevent multiple triggers
    
    if (!silent) {
      setIsLoading(true);
    }
    
    try {
      // Get the webhook URL from localStorage with a fallback
      const webhookUrl = localStorage.getItem('zapier_webhook_url') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
      
      if (!webhookUrl) {
        if (!silent) toast.error("Zapier webhook URL not configured");
        return;
      }
      
      const result = await triggerWorkflow(
        webhookUrl,
        event,
        {
          ...payload,
          timestamp: new Date().toISOString(),
          trigger_source: window.location.href
        },
        entityId,
        entityType
      );
      
      if (result.success) {
        if (!silent) toast.success("Zapier workflow triggered successfully");
        console.log(`Zapier workflow triggered: ${event}`);
      } else {
        // More user-friendly error message
        if (!silent) toast.error(`Failed to trigger Zapier: ${result.message || result.error?.message || "Unknown error"}. CORS restrictions may apply.`);
        console.warn(`Failed to trigger Zapier: ${result.message || result.error?.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error triggering Zapier:", error);
      if (!silent) toast.error(`Error: ${error.message || "Failed to trigger Zapier"}`);
    } finally {
      if (!silent) setIsLoading(false);
    }
  };
  
  // If autoTrigger is true and no button is needed, return null
  if (autoTrigger && label === null) {
    return null;
  }
  
  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={() => handleTrigger()}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Triggering...
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default ZapierTriggerButton;
