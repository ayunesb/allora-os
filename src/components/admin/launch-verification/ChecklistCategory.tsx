
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChecklistItem } from './ChecklistItem';
import { ChecklistCategory as CategoryType } from './types';

interface ChecklistCategoryProps {
  category: CategoryType;
}

export function ChecklistCategory({ category }: ChecklistCategoryProps) {
  const [expanded, setExpanded] = useState(true);

  const statusCounts = {
    completed: category.items.filter(item => item.status === 'completed').length,
    warning: category.items.filter(item => item.status === 'warning').length,
    error: category.items.filter(item => item.status === 'error').length,
    pending: category.items.filter(item => ['pending', 'in-progress'].includes(item.status)).length
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-lg">{category.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex gap-3 mt-2">
          {statusCounts.completed > 0 && (
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {statusCounts.completed} Completed
            </div>
          )}
          {statusCounts.warning > 0 && (
            <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              {statusCounts.warning} Warning
            </div>
          )}
          {statusCounts.error > 0 && (
            <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
              {statusCounts.error} Error
            </div>
          )}
          {statusCounts.pending > 0 && (
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {statusCounts.pending} Pending
            </div>
          )}
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {category.items.map((item) => (
              <ChecklistItem key={item.id} item={item} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
