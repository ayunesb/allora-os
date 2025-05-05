import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, Download, RefreshCw } from 'lucide-react';
export function ChecklistActions({ isSaving, isLoading, onLoadChecklist, onSaveChecklist }) {
    return (<div className="flex flex-wrap gap-2 mt-4">
      <Button onClick={onSaveChecklist} disabled={isSaving} variant="default" className="gap-2">
        {isSaving ? (<>
            <RefreshCw className="h-4 w-4 animate-spin"/>
            Saving...
          </>) : (<>
            <Save className="h-4 w-4"/>
            Save Progress
          </>)}
      </Button>
      
      <Button onClick={onLoadChecklist} disabled={isLoading} variant="outline" className="gap-2">
        {isLoading ? (<>
            <RefreshCw className="h-4 w-4 animate-spin"/>
            Loading...
          </>) : (<>
            <Download className="h-4 w-4"/>
            Load Saved Progress
          </>)}
      </Button>
    </div>);
}
