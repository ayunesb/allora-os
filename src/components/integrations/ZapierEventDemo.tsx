
import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { onNewLeadAdded, onStrategyApproved } from '@/utils/zapierEventTriggers';

interface ZapierEventDemoProps {
  className?: string;
}

const ZapierEventDemo: React.FC<ZapierEventDemoProps> = ({ className = "" }) => {
  const [isLeadLoading, setIsLeadLoading] = React.useState(false);
  const [isStrategyLoading, setIsStrategyLoading] = React.useState(false);

  const triggerDemoLead = async () => {
    if (isLeadLoading) return;
    setIsLeadLoading(true);
    
    try {
      // Use the new standardized event system
      const result = await onNewLeadAdded({
        company: "Allora AI Sample Company",
        leadName: "John Smith",
        source: "Demo Trigger",
        leadId: `demo_${Date.now()}`
      });
      
      if (result.success) {
        toast.success("Demo lead event sent to Zapier");
      } else {
        toast.error("Failed to send lead event");
      }
    } catch (error) {
      console.error("Error sending demo lead event:", error);
      toast.error("Error sending lead event to Zapier");
    } finally {
      setIsLeadLoading(false);
    }
  };
  
  const triggerDemoStrategy = async () => {
    if (isStrategyLoading) return;
    setIsStrategyLoading(true);
    
    try {
      // Use the new standardized event system
      const result = await onStrategyApproved({
        company: "Allora AI Sample Company",
        strategyTitle: "Expand to International Markets",
        suggestedBy: "Elon Musk Bot"
      });
      
      if (result.success) {
        toast.success("Demo strategy event sent to Zapier");
      } else {
        toast.error("Failed to send strategy event");
      }
    } catch (error) {
      console.error("Error sending demo strategy event:", error);
      toast.error("Error sending strategy event to Zapier");
    } finally {
      setIsStrategyLoading(false);
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      <Alert variant="warning" className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Due to browser security restrictions (CORS), webhook requests may show errors
          in the console but will still reach Zapier. Check your Zap's task history to confirm
          receipt.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          variant="default" 
          className="bg-indigo-900 hover:bg-indigo-800 text-white" 
          onClick={triggerDemoLead}
          disabled={isLeadLoading}
        >
          <Zap className="mr-2 h-4 w-4" />
          {isLeadLoading ? "Sending..." : "Demo: New Lead Added"}
        </Button>
        
        <Button 
          variant="default" 
          className="bg-indigo-900 hover:bg-indigo-800 text-white" 
          onClick={triggerDemoStrategy}
          disabled={isStrategyLoading}
        >
          <Zap className="mr-2 h-4 w-4" />
          {isStrategyLoading ? "Sending..." : "Demo: Strategy Approved"}
        </Button>
      </div>
    </div>
  );
};

export default ZapierEventDemo;
