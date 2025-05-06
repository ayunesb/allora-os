import React from "react";
type AddLeadDialogProps = {
  onLeadAdded: () => void;
  campaigns: Array<{
    id: string;
    name: string;
  }>;
  isMobileView: boolean;
};
export declare const AddLeadDialog: React.FC<AddLeadDialogProps>;
export {};
