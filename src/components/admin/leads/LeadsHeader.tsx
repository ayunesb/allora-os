import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart2, Download, PlusCircle } from "lucide-react";
export const LeadsHeader = ({ isMobileView, onAddLead }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Lead Management</h1>
        <p className="text-muted-foreground mt-1">
          Oversee all leads generated through the platform
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm">
          <BarChart2 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        {onAddLead && (
          <Button size="sm" onClick={onAddLead}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        )}
      </div>
    </div>
  );
};
