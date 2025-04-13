
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChecklistItemComponent } from './ChecklistItem';
import { ChecklistItem, ChecklistCategory } from './types';

interface ChecklistCategoryProps {
  categoryKey: ChecklistCategory;
  items: ChecklistItem[];
  icon: React.ReactNode;
  onCheckItem: (id: string, checked: boolean) => void;
}

export function ChecklistCategoryComponent({ 
  categoryKey, 
  items, 
  icon, 
  onCheckItem 
}: ChecklistCategoryProps) {
  const formattedCategoryName = categoryKey.replace(/_/g, ' ');

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2 mb-4">
          {icon}
          <h3 className="text-lg font-medium capitalize">{formattedCategoryName}</h3>
        </div>
        <div className="space-y-1 divide-y">
          {items.map(item => (
            <ChecklistItemComponent 
              key={item.id} 
              item={item} 
              onCheckItem={onCheckItem} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
