
import React from 'react';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type LeadsHeaderProps = {
  isMobileView: boolean;
  onAddNewLead?: () => void;
};

export const LeadsHeader: React.FC<LeadsHeaderProps> = ({ 
  isMobileView,
  onAddNewLead
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold`}>
          Leads Management
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          View and manage all leads
        </p>
      </div>
      
      <Button 
        size={isMobileView ? "sm" : "default"} 
        className="w-full sm:w-auto"
        onClick={onAddNewLead}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add New Lead
      </Button>
    </div>
  );
};
