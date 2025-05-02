
import React from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Users } from 'lucide-react';
import ExecutiveBoard from '@/components/ai/ExecutiveBoard';
import { PageTitle } from '@/components/ui/page-title';

export default function AIBoardroom() {
  return (
    <div>
      <DashboardBreadcrumb
        rootPath="/dashboard/ai-boardroom"
        rootLabel="AI Boardroom"
        rootIcon={<Users className="h-4 w-4" />}
      />
      
      <PageTitle>AI Executive Board</PageTitle>
      
      <div className="space-y-6">
        <div className="pb-3">
          <p>
            Meet your AI executive team. They will debate and make decisions about your
            marketing strategies, budgets, and campaigns.
          </p>
        </div>
        
        <ExecutiveBoard />
      </div>
    </div>
  );
}
