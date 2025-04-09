
import React from 'react';
import { Separator } from '@/components/ui/separator';
import DeleteAccountDialog from './DeleteAccountDialog';

const DangerZone: React.FC = () => {
  return (
    <div className="w-full">
      <Separator className="my-4" />
      
      <h3 className="text-lg font-medium text-destructive mb-2">Danger Zone</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>
      <DeleteAccountDialog />
    </div>
  );
};

export default DangerZone;
