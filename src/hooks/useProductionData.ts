
import { useState } from 'react';

export function useProductionData() {
  const [isProduction, setIsProduction] = useState(
    localStorage.getItem('production-mode') === 'true'
  );
  
  const forceProductionMode = (value: boolean) => {
    localStorage.setItem('production-mode', value.toString());
    setIsProduction(value);
  };
  
  return {
    isProduction,
    forceProductionMode
  };
}
