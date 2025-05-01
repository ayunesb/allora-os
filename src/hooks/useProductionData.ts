
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useProductionData() {
  const [isProductionReady, setIsProductionReady] = useState(true);
  const [isProductionMode, setIsProductionMode] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  
  // Check if in production mode based on URL or environment or localStorage override
  useEffect(() => {
    const forceProdMode = localStorage.getItem('allora_force_production_mode') === 'true';
    const productionMode = 
      forceProdMode ||
      window.location.hostname === 'all-or-a.online' || 
      process.env.NODE_ENV === 'production';
    
    setIsProductionMode(productionMode);
  }, []);
  
  const validateProductionData = async () => {
    setIsValidating(true);
    
    try {
      // For this demo, we'll simulate validation
      // In a real app, you'd check real data integrity
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always report ready in this demo
      setIsProductionReady(true);
      
    } catch (error: any) {
      console.error("Error validating production data:", error);
      toast.error("Error validating production data");
      setIsProductionReady(false);
    } finally {
      setIsValidating(false);
    }
  };
  
  const forceProductionMode = (force: boolean) => {
    if (force) {
      localStorage.setItem('allora_force_production_mode', 'true');
      setIsProductionMode(true);
      setIsProductionReady(true);
      toast.success("Production mode activated");
    } else {
      localStorage.removeItem('allora_force_production_mode');
      setIsProductionMode(false);
      validateProductionData();
      toast.info("Reverted to automatic mode detection");
    }
  };
  
  return {
    isValidating,
    isProductionReady,
    isProductionMode,
    validateProductionData,
    forceProductionMode
  };
}
