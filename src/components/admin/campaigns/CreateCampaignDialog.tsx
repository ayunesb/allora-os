import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CampaignForm from "./CampaignForm";
const CreateCampaignDialog = ({
  open,
  onOpenChange,
  formData,
  onChange,
  onSubmit,
  companies,
  isSubmitting,
}) => {
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
