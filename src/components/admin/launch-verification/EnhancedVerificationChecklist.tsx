
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChecklistCategory } from './ChecklistCategory';
import { ChecklistProgress } from './ChecklistProgress';
import { SeverityCounts } from './SeverityCounts';
import { VerificationActions } from './VerificationActions';
import type { ChecklistCategory as ChecklistCategoryType } from './types';

interface EnhancedVerificationChecklistProps {
  categories: ChecklistCategoryType[];
  isLoading?: boolean;
  onRerun?: () => void;
  onReset?: () => void;
}

export function EnhancedVerificationChecklist({
  categories,
  isLoading = false,
  onRerun,
  onReset
}: EnhancedVerificationChecklistProps) {
  
  // Calculate metrics for the dashboard
  const allItems = categories.flatMap(category => category.items);
  const completedItems = allItems.filter(item => item.status === 'completed').length;
  const warningItems = allItems.filter(item => item.status === 'warning').length;
  const errorItems = allItems.filter(item => item.status === 'error' || item.status === 'pending').length;
  const progressPercentage = allItems.length > 0 
    ? Math.round((completedItems / allItems.length) * 100) 
    : 0;
  
  return (
    <Card className="border-muted/30">
      <CardHeader className="bg-muted/10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle>Launch Verification</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onRerun}
              disabled={isLoading}
            >
              Re-run Verification
            </Button>
            <Button 
              variant="outline" 
              onClick={onReset}
              disabled={isLoading}
            >
              Reset Results
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 space-y-4">
          <ChecklistProgress value={progressPercentage} />
          <SeverityCounts 
            completed={completedItems}
            warnings={warningItems} 
            errors={errorItems}
          />
        </div>
        
        <div className="space-y-6 mt-8">
          {categories.map((category) => (
            <ChecklistCategory key={category.id} category={category} />
          ))}
        </div>
        
        <VerificationActions />
      </CardContent>
    </Card>
  );
}
