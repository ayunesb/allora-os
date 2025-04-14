
import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function ProductionDataAlert() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  
  // Hide alert if user dismissed it
  if (dismissed) {
    return null;
  }

  return (
    <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
      <div className="flex-1">
        <AlertTitle className="text-amber-800 dark:text-amber-400">
          Development Environment
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-500 text-sm">
          This is a development environment with sample data. Do not use for production purposes.
        </AlertDescription>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-amber-500/30 hover:border-amber-500/70 text-amber-700"
          onClick={() => navigate('/admin')}
        >
          Production Setup
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-amber-700 hover:text-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );
}

export default ProductionDataAlert;
