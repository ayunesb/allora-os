
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, FileText, Save, Check } from "lucide-react";
import { toast } from "sonner";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Toaster } from "sonner";

export default function UserOnboarding() {
  const [progress, setProgress] = useState<number>(0);
  const [totalItems] = useState<number>(5);
  const { screenReaderFriendly, highContrast } = useAccessibility();
  
  const onboardingItems = [
    {
      id: 'signup',
      text: 'Verify the complete signup and onboarding process works without errors',
      priority: 'critical',
      checked: false
    },
    {
      id: 'company',
      text: 'Confirm company details are correctly saved in the database',
      priority: 'high',
      checked: false
    },
    {
      id: 'fields',
      text: 'Validate Company Name, Industry, Goals, Risk Appetite fields work as expected',
      priority: 'normal',
      checked: false
    },
    {
      id: 'triggers',
      text: 'Verify onboarding triggers AI Strategy Creation, Campaigns, Call Scripts, and AI Bot Debate automatically',
      priority: 'high',
      checked: false
    },
    {
      id: 'preferences',
      text: 'Confirm onboarding saves preferences like language, company logo, primary contact',
      priority: 'normal',
      checked: false
    }
  ];
  
  const [items, setItems] = useState(onboardingItems);
  
  const handleToggleItem = (id: string) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    
    const newProgress = updatedItems.filter(item => item.checked).length;
    setProgress(newProgress);
    
    // Show toast for toggled items
    const item = items.find(item => item.id === id);
    if (item) {
      const action = !item.checked ? 'completed' : 'reopened';
      const description = action === 'completed' 
        ? `${Math.round((newProgress / totalItems) * 100)}% of onboarding checklist completed`
        : undefined;
        
      toast.success(`Item ${action}: ${item.text.substring(0, 30)}...`, {
        description
      });
      
      // ARIA announcement for screen readers
      if (screenReaderFriendly) {
        const liveRegion = document.getElementById('aria-live-polite');
        if (liveRegion) {
          liveRegion.textContent = `Item ${action}: ${item.text}. ${newProgress} of ${totalItems} items completed.`;
        }
      }
    }
  };
  
  const handleSaveProgress = () => {
    toast.success('Progress saved successfully!', {
      description: `${progress} of ${totalItems} items completed (${Math.round((progress / totalItems) * 100)}%)`,
      duration: 3000
    });
  };
  
  // Setup keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'o') {
        // Alt+O shows onboarding shortcuts
        e.preventDefault();
        toast.info("Onboarding Shortcuts", {
          description: "Alt+S: Save progress | Alt+1-5: Toggle checklist items",
          duration: 5000
        });
      }
      
      if (e.altKey && e.key === 's') {
        // Alt+S saves progress
        e.preventDefault();
        handleSaveProgress();
      }
      
      // Alt+1 through Alt+5 toggle the corresponding items
      if (e.altKey && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const itemIndex = parseInt(e.key) - 1;
        if (itemIndex >= 0 && itemIndex < items.length) {
          handleToggleItem(items[itemIndex].id);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, progress, totalItems]);

  return (
    <div className="animate-fadeIn space-y-4">
      <Toaster position="top-right" closeButton richColors />
      
      {/* Accessible ARIA regions */}
      <div id="aria-live-polite" className="sr-only" aria-live="polite"></div>
      <div id="aria-live-assertive" className="sr-only" aria-live="assertive"></div>
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">User Onboarding</h1>
        <p className="text-muted-foreground mt-1">
          Verify the user onboarding process and setup
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <div 
          className="text-sm text-muted-foreground"
          aria-live="polite"
          role={screenReaderFriendly ? "status" : undefined}
        >
          {progress}/{totalItems} Completed ({Math.round((progress / totalItems) * 100)}%)
        </div>
      </div>
      
      <div 
        className="space-y-4" 
        role={screenReaderFriendly ? "list" : undefined}
        aria-label={screenReaderFriendly ? "Onboarding checklist" : undefined}
      >
        {items.map((item, index) => (
          <Card 
            key={item.id} 
            className={`border p-4 ${item.checked ? 'bg-opacity-50' : ''} transition-all`}
            role={screenReaderFriendly ? "listitem" : undefined}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center mt-1">
                <input 
                  type="checkbox" 
                  id={item.id} 
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                  className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  aria-label={item.text}
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label 
                  htmlFor={item.id} 
                  className={`font-medium ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                >
                  {item.text}
                  {item.checked && (
                    <span className="inline-flex ml-2 text-green-600" aria-label="Completed">
                      <Check size={16} aria-hidden="true" />
                    </span>
                  )}
                </label>
                {item.priority === 'high' && (
                  <span className="mt-1 text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full w-fit">
                    HIGH PRIORITY
                  </span>
                )}
                {item.priority === 'critical' && (
                  <span className="mt-1 text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full w-fit">
                    CRITICAL PRIORITY
                  </span>
                )}
                
                <div className="mt-2 text-xs text-muted-foreground">
                  Keyboard shortcut: <kbd className="px-1 py-0.5 bg-muted rounded border">Alt</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded border">{index + 1}</kbd>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between pt-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2" 
            aria-label="Load saved onboarding progress"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            Load Saved
          </Button>
          
          <Button 
            variant="outline" 
            className="gap-2" 
            aria-label="Export onboarding progress"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Export
          </Button>
        </div>
        
        <Button 
          onClick={handleSaveProgress} 
          className="gap-2"
          aria-label="Save onboarding progress"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          Save Progress (Alt+S)
        </Button>
      </div>
      
      {progress === totalItems && (
        <div 
          className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 mt-4"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
            <strong>All onboarding checks complete!</strong>
          </div>
          <p className="text-sm mt-1">
            The onboarding process has been fully verified and is ready for users.
          </p>
        </div>
      )}
    </div>
  );
}
