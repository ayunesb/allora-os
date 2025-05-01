
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Archive, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function ReadinessChecklist() {
  const [items, setItems] = useState([
    // API Integration items
    { id: 'api-1', category: 'API Integrations', text: 'Connect to Supabase database', checked: true, critical: true },
    { id: 'api-2', category: 'API Integrations', text: 'Set up Stripe API keys', checked: true, critical: true },
    { id: 'api-3', category: 'API Integrations', text: 'Configure Twilio SMS', checked: true, critical: true },
    { id: 'api-4', category: 'API Integrations', text: 'Set up OpenAI for AI executives', checked: true, critical: true },
    { id: 'api-5', category: 'API Integrations', text: 'Configure Heygen for AI video generation', checked: true, critical: false },
    { id: 'api-6', category: 'API Integrations', text: 'Set up Zapier webhooks', checked: true, critical: false },
    
    // Security items
    { id: 'sec-1', category: 'Security', text: 'Enable Row Level Security in Supabase', checked: true, critical: true },
    { id: 'sec-2', category: 'Security', text: 'Secure API keys in environment variables', checked: true, critical: true },
    { id: 'sec-3', category: 'Security', text: 'Set up authentication flow', checked: true, critical: true },
    { id: 'sec-4', category: 'Security', text: 'Configure CORS settings', checked: true, critical: true },
    { id: 'sec-5', category: 'Security', text: 'Enable audit logging', checked: true, critical: false },
    
    // Content items
    { id: 'con-1', category: 'Content', text: 'Finalize product copy', checked: true, critical: true },
    { id: 'con-2', category: 'Content', text: 'Create privacy policy', checked: true, critical: true },
    { id: 'con-3', category: 'Content', text: 'Create terms of service', checked: true, critical: true },
    { id: 'con-4', category: 'Content', text: 'Add contact information', checked: true, critical: false },
    
    // Testing items
    { id: 'test-1', category: 'Testing', text: 'Conduct security testing', checked: true, critical: true },
    { id: 'test-2', category: 'Testing', text: 'Test authentication flows', checked: true, critical: true },
    { id: 'test-3', category: 'Testing', text: 'Test payment processing', checked: true, critical: true },
    { id: 'test-4', category: 'Testing', text: 'Test email notifications', checked: true, critical: true },
    { id: 'test-5', category: 'Testing', text: 'Test on mobile devices', checked: true, critical: false },
    
    // Features items
    { id: 'feat-1', category: 'Features', text: 'Strategy generation functionality', checked: true, critical: true },
    { id: 'feat-2', category: 'Features', text: 'Executive debate system', checked: true, critical: true },
    { id: 'feat-3', category: 'Features', text: 'Strategy approval workflow', checked: true, critical: true },
    { id: 'feat-4', category: 'Features', text: 'Dashboard metrics', checked: true, critical: true },
    { id: 'feat-5', category: 'Features', text: 'Lead management', checked: true, critical: false },
    { id: 'feat-6', category: 'Features', text: 'Campaign tracking', checked: true, critical: false },
  ]);
  
  const toggleItem = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const getGroupedItems = () => {
    const grouped: Record<string, typeof items> = {};
    
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    
    return grouped;
  };
  
  const getCompletionStatus = () => {
    const total = items.length;
    const completed = items.filter(item => item.checked).length;
    const criticalTotal = items.filter(item => item.critical).length;
    const criticalCompleted = items.filter(item => item.critical && item.checked).length;
    
    return {
      total,
      completed,
      percentage: Math.round((completed / total) * 100),
      criticalPercentage: Math.round((criticalCompleted / criticalTotal) * 100),
      allCriticalComplete: criticalCompleted === criticalTotal,
    };
  };
  
  const status = getCompletionStatus();
  const groupedItems = getGroupedItems();
  
  const exportChecklist = () => {
    try {
      const checklistData = {
        timestamp: new Date().toISOString(),
        completionRate: `${status.percentage}%`,
        criticalItemsComplete: status.allCriticalComplete,
        categories: Object.keys(groupedItems).map(category => ({
          name: category,
          items: groupedItems[category].map(item => ({
            description: item.text,
            completed: item.checked,
            critical: item.critical
          }))
        }))
      };
      
      // Generate data URL for download
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(checklistData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `allora_launch_checklist_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      toast.success("Checklist exported successfully");
    } catch (error) {
      console.error("Error exporting checklist:", error);
      toast.error("Failed to export checklist");
    }
  };
  
  const resetChecklist = () => {
    const shouldReset = window.confirm("Are you sure you want to reset the checklist? This will uncheck all items.");
    
    if (shouldReset) {
      setItems(prevItems => 
        prevItems.map(item => ({ ...item, checked: false }))
      );
      toast.info("Checklist has been reset");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Launch Readiness Checklist</CardTitle>
            <CardDescription>Track completion of critical launch items</CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={exportChecklist}>
              <Archive className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={resetChecklist}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm font-medium">Overall Completion</div>
            <div className="text-2xl font-bold">{status.percentage}%</div>
            <div className="text-xs text-muted-foreground">
              {status.completed} of {status.total} items complete
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm font-medium">Critical Items</div>
            <div className={`text-2xl font-bold ${status.allCriticalComplete ? 'text-green-600' : 'text-amber-600'}`}>
              {status.criticalPercentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              {status.allCriticalComplete ? 'All critical items complete' : 'Some critical items incomplete'}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-medium border-b pb-2">{category}</h3>
              
              <div className="space-y-3">
                {categoryItems.map(item => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox 
                      id={item.id} 
                      checked={item.checked} 
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label 
                        htmlFor={item.id} 
                        className={`${item.checked ? 'line-through text-muted-foreground' : ''} flex items-center`}
                      >
                        {item.text}
                        {item.critical && (
                          <span className="ml-2 bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                            Critical
                          </span>
                        )}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
