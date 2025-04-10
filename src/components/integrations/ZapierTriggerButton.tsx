
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useZapier } from '@/lib/zapier';

interface ZapierTriggerButtonProps {
  event: string;
  payload?: Record<string, any>;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  entityId?: string;
  entityType?: string;
}

const ZapierTriggerButton: React.FC<ZapierTriggerButtonProps> = ({
  event,
  payload = {},
  label = "Trigger Zapier",
  variant = "outline",
  size = "default",
  className = "",
  entityId,
  entityType
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { triggerWorkflow } = useZapier();
  
  const handleTrigger = async () => {
    setIsLoading(true);
    
    try {
      // Get the webhook URL from localStorage with a fallback
      const webhookUrl = localStorage.getItem('zapier_webhook_url') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
      
      if (!webhookUrl) {
        toast.error("Zapier webhook URL not configured");
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
        toast.success("Zapier workflow triggered successfully");
      } else {
        // More user-friendly error message
        toast.error(`Failed to trigger Zapier: ${result.message || result.error?.message || "Unknown error"}. CORS restrictions may apply.`);
      }
    } catch (error: any) {
      console.error("Error triggering Zapier:", error);
      toast.error(`Error: ${error.message || "Failed to trigger Zapier"}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      variant={variant}
      size={size}
      className={className}
      onClick={handleTrigger}
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
