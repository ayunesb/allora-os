
import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChecklistCategory } from "./types";

interface ChecklistCategoryProps {
  category: ChecklistCategory;
}

export function ChecklistCategory({ category }: ChecklistCategoryProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const completedItems = category.items.filter(item => item.status === 'completed').length;
  const totalItems = category.items.length;
  const isComplete = completedItems === totalItems;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 bg-secondary/20">
        <div className="flex items-center gap-3">
          <div className={`p-1 rounded-full ${
            isComplete ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {isComplete ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Clock className="h-5 w-5 text-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className={isComplete ? "text-green-600 font-medium" : "text-gray-500"}>
              {completedItems}/{totalItems}
            </span>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Toggle</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isOpen ? 'rotate-180 transform' : ''} h-4 w-4`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      
      <CollapsibleContent>
        <div className="p-4 space-y-3 border-t">
          {category.items.map(item => (
            <div key={item.id} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <span className={
                  item.status === 'completed' ? 'text-green-800' : 
                  item.status === 'warning' ? 'text-amber-800' :
                  item.status === 'in-progress' ? 'text-blue-800' : 'text-gray-800'
                }>
                  {item.name}
                </span>
                {item.isRequired && (
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                    Required
                  </span>
                )}
              </div>
              
              {item.statusMessage && (
                <span className="text-xs text-muted-foreground">
                  {item.statusMessage}
                </span>
              )}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
