
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CampaignForm from './CampaignForm';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    platform: string;
    budget: number;
    company_id: string;
  };
  onChange: (data: Partial<{
    name: string;
    platform: string;
    budget: number;
    company_id: string;
  }>) => void;
  onSubmit: () => void;
  companies: Array<{ id: string; name: string }>;
  isSubmitting: boolean;
}

const CreateCampaignDialog = ({
  open,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
  companies,
  isSubmitting
}: CreateCampaignDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <CampaignForm 
          data={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          companies={companies}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignDialog;
