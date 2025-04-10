import React, { useState } from 'react';
import { Check, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  completed: boolean;
  critical: boolean;
}

export default function PreLaunchChecklist() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // API Integrations
    { id: '1', category: 'Supabase', task: 'Connect to real database (NOT test project)', completed: true, critical: true },
    { id: '2', category: 'Supabase', task: 'Ensure real tables exist (profiles, companies, strategies, campaigns, leads)', completed: true, critical: true },
    { id: '3', category: 'Stripe', task: 'Connect real Stripe API keys (test mode is fine)', completed: true, critical: true },
    { id: '4', category: 'Postmark', task: 'Hook real Postmark API Key for emails', completed: true, critical: true },
    { id: '5', category: 'Twilio', task: 'Hook Twilio API Key for SMS functionality', completed: true, critical: true },
    { id: '6', category: 'Heygen', task: 'Hook Heygen API Key for AI video generation', completed: true, critical: true },
    { id: '7', category: 'Zapier', task: 'Make sure Zapier hooks are ready (if applicable)', completed: true, critical: false },
    
    // Code Cleanups
    { id: '8', category: 'Cleanup', task: 'Remove any dummy/test data', completed: true, critical: true },
    { id: '9', category: 'Cleanup', task: 'Set environment variables in Supabase Edge Functions', completed: true, critical: true },
    { id: '10', category: 'Cleanup', task: 'Turn off test modes in API calls', completed: true, critical: true },
    { id: '11', category: 'Cleanup', task: 'Format and lint all files', completed: true, critical: false },
    { id: '12', category: 'Cleanup', task: 'Remove console.logs and TODO comments', completed: true, critical: false },
    
    // Final Checks
    { id: '13', category: 'Testing', task: 'Test user authentication flows', completed: true, critical: true },
    { id: '14', category: 'Testing', task: 'Test lead management functionality', completed: true, critical: true },
    { id: '15', category: 'Testing', task: 'Test payment processing', completed: true, critical: true },
    { id: '16', category: 'Testing', task: 'Test email notifications', completed: true, critical: true },
    { id: '17', category: 'Testing', task: 'Test SMS functionality', completed: true, critical: true },
    { id: '18', category: 'Testing', task: 'Test video generation', completed: true, critical: true },
  ]);

  const toggleItem = (id: string) => {
    setChecklistItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const criticalItemsCompleted = checklistItems.filter(item => item.critical && !item.completed).length === 0;
  const allItemsCompleted = checklistItems.filter(item => !item.completed).length === 0;

  return (
    <Card className="border-primary/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          Pre-Launch Checklist
          {allItemsCompleted ? 
            <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Ready for Launch</span> : 
            criticalItemsCompleted ?
              <span className="text-sm bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Ready for Launch</span> : 
              <span className="text-sm bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">Critical Items Pending</span>
          }
        </CardTitle>
        <CardDescription>
          All items completed - ready for launch!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">API Integrations</h3>
            <div className="space-y-2">
              {checklistItems
                .filter(item => ['Supabase', 'Stripe', 'Postmark', 'Twilio', 'Heygen', 'Zapier'].includes(item.category))
                .map(item => (
                  <div key={item.id} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      item.completed ? 'bg-green-500/5' : item.critical ? 'bg-yellow-500/5' : 'bg-secondary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.completed ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        item.critical ? 
                          <AlertCircle className="h-5 w-5 text-yellow-500" /> : 
                          <div className="h-5 w-5 border border-gray-300 rounded-md" />
                      }
                      <div>
                        <div className="text-sm font-medium">{item.task}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </div>
                    <Button 
                      variant={item.completed ? "outline" : "default"} 
                      size="sm"
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Code Cleanup</h3>
            <div className="space-y-2">
              {checklistItems
                .filter(item => item.category === 'Cleanup')
                .map(item => (
                  <div key={item.id} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      item.completed ? 'bg-green-500/5' : item.critical ? 'bg-yellow-500/5' : 'bg-secondary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.completed ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        item.critical ? 
                          <AlertCircle className="h-5 w-5 text-yellow-500" /> : 
                          <div className="h-5 w-5 border border-gray-300 rounded-md" />
                      }
                      <div>
                        <div className="text-sm font-medium">{item.task}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </div>
                    <Button 
                      variant={item.completed ? "outline" : "default"} 
                      size="sm"
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Final Testing</h3>
            <div className="space-y-2">
              {checklistItems
                .filter(item => item.category === 'Testing')
                .map(item => (
                  <div key={item.id} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      item.completed ? 'bg-green-500/5' : item.critical ? 'bg-yellow-500/5' : 'bg-secondary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.completed ? 
                        <Check className="h-5 w-5 text-green-500" /> : 
                        item.critical ? 
                          <AlertCircle className="h-5 w-5 text-yellow-500" /> : 
                          <div className="h-5 w-5 border border-gray-300 rounded-md" />
                      }
                      <div>
                        <div className="text-sm font-medium">{item.task}</div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </div>
                    <Button 
                      variant={item.completed ? "outline" : "default"} 
                      size="sm"
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </Button>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium">Launch Status</div>
                <div className="text-sm text-muted-foreground">
                  {allItemsCompleted ? 
                    "All items completed! You're ready to launch." : 
                    criticalItemsCompleted ?
                      "All critical items completed. Ready for launch, but consider completing remaining items." :
                      "Complete all critical items before launching."
                  }
                </div>
              </div>
              <Button className="gap-2" disabled={!criticalItemsCompleted}>
                <ExternalLink className="h-4 w-4" />
                {criticalItemsCompleted ? "Launch Project" : "Complete Critical Items"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
