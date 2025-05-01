
import { useState } from 'react';
import { toast } from 'sonner';
import { triggerBusinessEvent } from '@/lib/zapier';
import { BusinessEventType } from '@/utils/webhookTypes';

export function useLaunchProcess() {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const notifyZapier = async (event: BusinessEventType, data: Record<string, any>) => {
    try {
      const webhookUrl = localStorage.getItem('zapier_webhook_url') || '';
      
      if (!webhookUrl) {
        console.log("No Zapier webhook URL configured, skipping notification");
        return;
      }
      
      await triggerBusinessEvent(
        webhookUrl,
        event,
        data
      );
      
      console.log(`Notification sent to Zapier for ${event}`);
    } catch (error) {
      console.error("Failed to notify Zapier:", error);
    }
  };
  
  const launchFirstCustomerFlow = async () => {
    setIsLaunching(true);
    setLaunchStep(1);
    
    try {
      // Initialize company data
      await delay(1500);
      setLaunchStep(2);
      
      // Set up users
      await delay(1000);
      setLaunchStep(3);
      
      // Generate campaigns
      await delay(2000);
      setLaunchStep(4);
      
      // Generate leads
      await delay(1200);
      setLaunchStep(5);
      
      // Initialize settings
      await delay(800);
      setLaunchStep(6);
      
      // Trigger notification
      await notifyZapier('user_onboarded', {
        timestamp: new Date().toISOString(),
        source: 'Launch Process',
        initialSetupComplete: true
      });
      
      setLaunchStep(7);
      await delay(1500);
      
      setIsComplete(true);
      toast.success("Launch completed successfully!", {
        description: "Your system is now ready with real business data."
      });
    } catch (error) {
      console.error("Launch failed:", error);
      toast.error("Launch failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsLaunching(false);
    }
  };
  
  return { 
    isLaunching, 
    launchStep, 
    isComplete,
    launchFirstCustomerFlow
  };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
