import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
export function CompanyHeader({ onAddCompanyClick }) {
    return (<div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Company Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage organizations in the platform
        </p>
      </div>
      <Button onClick={onAddCompanyClick}>
        <Plus className="mr-2 h-4 w-4"/>
        Add Company
      </Button>
    </div>);
}
