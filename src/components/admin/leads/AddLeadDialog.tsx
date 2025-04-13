
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type AddLeadDialogProps = {
  campaigns?: any[];
  onLeadAdded?: () => void;
  isMobileView?: boolean;
};

export const AddLeadDialog: React.FC<AddLeadDialogProps> = ({
  campaigns = [],
  onLeadAdded,
  isMobileView
}) => {
  return (
    <Button size={isMobileView ? "sm" : "default"} onClick={() => onLeadAdded?.()}>
      <Plus className="mr-2 h-4 w-4" />
      Add Lead
    </Button>
  );
};
