
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";
import { useLaunchProcess } from '@/components/admin/launch-verification/useLaunchProcess';
import { useProductionData } from '@/hooks/useProductionData';

export function LaunchButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLaunching, launchStep, isComplete, launchFirstCustomerFlow } = useLaunchProcess();
  const { forceProductionMode } = useProductionData();
  
  const handleLaunch = async () => {
    if (isLaunching) return;
    
    // Show confirmation dialog
    if (confirm("This will initialize real company data and create core business entities for your platform. Continue?")) {
      setIsOpen(true);
      
      try {
        await launchFirstCustomerFlow();
        
        // Force production mode after successful launch
        forceProductionMode(true);
        localStorage.setItem('production-alert-dismissed', 'true');
      } catch (error) {
        console.error("Launch failed:", error);
      }
    }
  };
  
  return (
    <>
      <Button 
        onClick={handleLaunch} 
        size="lg" 
        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium px-6"
        disabled={isLaunching}
      >
        {isLaunching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Launching...
          </>
        ) : (
          <>
            <Rocket className="mr-2 h-4 w-4" />
            Initialize Real Data
          </>
        )}
      </Button>
    </>
  );
}
