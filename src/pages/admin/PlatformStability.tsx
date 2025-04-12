
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, FileText, Save } from "lucide-react";
import { toast } from "sonner";

export default function PlatformStability() {
  const [progress, setProgress] = useState<number>(0);
  const [totalItems] = useState<number>(6);
  
  const stabilityItems = [
    {
      id: 'build',
      text: 'Check that the application builds without errors on Vercel or other hosting platforms',
      priority: 'critical',
      checked: false
    },
    {
      id: 'supabase',
      text: 'Confirm Supabase is connected, healthy, and shows no critical lints',
      priority: 'critical',
      checked: false
    },
    {
      id: 'apis',
      text: 'Verify Twilio, Stripe, Zoom, Heygen, Postmark, Zapier are connected with test data flows',
      priority: 'high',
      checked: false
    },
    {
      id: 'flow',
      text: 'Test full flow: Signup → Onboarding → Dashboard → Strategy → Campaigns → Calls → Leads → Payments',
      priority: 'high',
      checked: false
    },
    {
      id: 'rls',
      text: 'Verify Supabase tables and permissions are secured with Row Level Security activated',
      priority: 'critical',
      checked: false
    },
    {
      id: 'errors',
      text: 'Ensure the application displays appropriate user feedback for various error scenarios',
      priority: 'normal',
      checked: false
    }
  ];
  
  const [items, setItems] = useState(stabilityItems);
  
  const handleToggleItem = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    setProgress(updatedItems.filter(item => item.checked).length);
    
    // Show toast for toggled items
    const item = items.find(item => item.id === id);
    if (item) {
      const action = !item.checked ? 'completed' : 'reopened';
      toast.success(`Item ${action}: ${item.text.substring(0, 30)}...`);
    }
  };
  
  const handleSaveProgress = () => {
    toast.success('Progress saved successfully!');
  };
  
  return (
    <div className="animate-fadeIn space-y-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Platform Stability</h1>
        <p className="text-muted-foreground mt-1">
          Verify core platform stability and integrations
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {progress}/{totalItems} Completed
        </div>
      </div>
      
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="border p-4">
            <div className="flex items-start gap-3">
              <div>
                <input 
                  type="checkbox" 
                  id={item.id} 
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                  className="h-5 w-5 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label 
                  htmlFor={item.id} 
                  className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                >
                  {item.text}
                </label>
                {item.priority === 'high' && (
                  <span className="mt-1 text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full w-fit">
                    HIGH
                  </span>
                )}
                {item.priority === 'critical' && (
                  <span className="mt-1 text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full w-fit">
                    CRITICAL
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between pt-4">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RotateCw className="h-4 w-4" />
            Load Saved
          </Button>
          
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        <Button onClick={handleSaveProgress} className="gap-2">
          <Save className="h-4 w-4" />
          Save Progress
        </Button>
      </div>
    </div>
  );
}
