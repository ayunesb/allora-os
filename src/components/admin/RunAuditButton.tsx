
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { PlayIcon } from 'lucide-react';

export function RunAuditButton() {
  const router = useRouter();
  
  const handleRunAudit = () => {
    router.push('/admin/run-audit');
  };
  
  return (
    <Button 
      onClick={handleRunAudit} 
      className="gap-2"
      variant="outline"
    >
      <PlayIcon className="h-4 w-4" />
      Run Full System Audit
    </Button>
  );
}
