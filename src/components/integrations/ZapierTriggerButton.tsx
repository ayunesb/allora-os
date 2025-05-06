import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export default function ZapierTriggerButton({
  webhookType,
  event,
  payload,
  label,
  onResult,
  autoTrigger = false,
  size = "default",
  variant = "outline",
  className = "",
}) {
  const [isTriggering, setIsTriggering] = useState(false);
  const triggerWebhook = async () => {
    setIsTriggering(true);
    try {
      // In a real implementation, this would make an API call to trigger the webhook
      // For this demo, we'll simulate a successful webhook trigger
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const eventType = event || webhookType || "generic";
      const eventPayload = payload || {};
      toast.success(`Zapier webhook for ${eventType} triggered successfully`);
      if (onResult) {
        onResult(true);
      }
    } catch (error) {
      console.error(`Error triggering webhook:`, error);
      toast.error(
        `Failed to trigger webhook: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      if (onResult) {
        onResult(false);
      }
    } finally {
      setIsTriggering(false);
    }
  };
  // Auto-trigger the webhook if the autoTrigger prop is true
  React.useEffect(() => {
    if (autoTrigger) {
      triggerWebhook();
    }
  }, []);
  if (autoTrigger && label === null) {
    return null; // Don't render anything for auto-trigger with no label
  }
  return (
    <Button
      onClick={triggerWebhook}
      disabled={isTriggering}
      variant={variant}
      size={size}
      className={className}
    >
      {isTriggering ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Triggering...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
