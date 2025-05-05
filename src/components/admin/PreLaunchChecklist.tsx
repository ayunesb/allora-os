import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePreLaunchChecklist } from '@/hooks/admin/usePreLaunchChecklist';
import { ChecklistSection, LaunchStatusFooter } from './pre-launch-checklist';
export default function PreLaunchChecklist() {
    const { toggleItem, criticalItemsCompleted, allItemsCompleted, getItemsByCategory } = usePreLaunchChecklist();
    const apiItems = getItemsByCategory('Supabase');
    const cleanupItems = getItemsByCategory('Cleanup');
    const testingItems = getItemsByCategory('Testing');
    return (<Card className="border-primary/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          Pre-Launch Checklist
          {allItemsCompleted ?
            <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Ready for Launch</span> :
            criticalItemsCompleted ?
                <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Ready for Launch</span> :
                <span className="text-sm bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">Critical Items Pending</span>}
        </CardTitle>
        <CardDescription>
          All items completed - ready for launch!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ChecklistSection title="API Integrations" items={apiItems} onToggle={toggleItem}/>
          
          <ChecklistSection title="Code Cleanup" items={cleanupItems} onToggle={toggleItem}/>
          
          <ChecklistSection title="Final Testing" items={testingItems} onToggle={toggleItem}/>
          
          <LaunchStatusFooter allItemsCompleted={allItemsCompleted} criticalItemsCompleted={criticalItemsCompleted}/>
        </div>
      </CardContent>
    </Card>);
}
