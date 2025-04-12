
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowClockwise, FileExport, Save } from "lucide-react";
import { toast } from "sonner";

export default function CommunicationTools() {
  const [progress, setProgress] = useState<number>(0);
  const [totalItems] = useState<number>(5);
  
  const communicationItems = [
    {
      id: 'whatsapp',
      text: 'Verify WhatsApp message sending via Twilio integration',
      priority: 'high',
      checked: false
    },
    {
      id: 'calling',
      text: 'Verify outbound calling via Twilio API',
      priority: 'high',
      checked: false
    },
    {
      id: 'zoom',
      text: 'Confirm Zoom link scheduling through Zoom API',
      priority: 'normal',
      checked: false
    },
    {
      id: 'email',
      text: 'Test Postmark emails (Welcome Email, Lead Follow-up Email)',
      priority: 'high',
      checked: false
    },
    {
      id: 'timeline',
      text: 'Verify all communications are tracked in the Timeline Log',
      priority: 'normal',
      checked: false
    }
  ];
  
  const [items, setItems] = useState(communicationItems);
  
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
        <h1 className="text-2xl sm:text-3xl font-bold">Communication Tools</h1>
        <p className="text-muted-foreground mt-1">
          Verify communication integrations for the platform
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
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between pt-4">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowClockwise className="h-4 w-4" />
            Load Saved
          </Button>
          
          <Button variant="outline" className="gap-2">
            <FileExport className="h-4 w-4" />
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
