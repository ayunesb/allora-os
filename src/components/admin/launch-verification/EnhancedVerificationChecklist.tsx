
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { ChecklistProgress } from './ChecklistProgress';
import { ChecklistCategory } from './ChecklistCategory';
import { toast } from 'sonner';

// Import the necessary types
import { ChecklistItem, ChecklistCategory as ChecklistCategoryType } from './types';

export function EnhancedVerificationChecklist() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ChecklistCategoryType[]>([]);
  const [completedItems, setCompletedItems] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Initialize with default verification categories and items
  useEffect(() => {
    const defaultCategories: ChecklistCategoryType[] = [
      {
        id: 'system',
        name: 'System Components',
        description: 'Core system components and services',
        items: [
          {
            id: 'system-1',
            name: 'Database Connection',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'system-2',
            name: 'Authentication Service',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'system-3',
            name: 'Storage Service',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'system-4',
            name: 'Edge Functions',
            status: 'completed',
            isRequired: true
          }
        ]
      },
      {
        id: 'apis',
        name: 'External APIs',
        description: 'Third-party service connections',
        items: [
          {
            id: 'api-1',
            name: 'Stripe Integration',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'api-2',
            name: 'Twilio Integration',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'api-3',
            name: 'Postmark Integration',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'api-4',
            name: 'OpenAI Integration',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'api-5',
            name: 'Heygen Integration',
            status: 'completed',
            isRequired: false
          }
        ]
      },
      {
        id: 'features',
        name: 'Core Features',
        description: 'Business-critical application features',
        items: [
          {
            id: 'feature-1',
            name: 'User Onboarding',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'feature-2',
            name: 'AI Executive Team',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'feature-3',
            name: 'Strategy Generation',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'feature-4',
            name: 'Campaign Management',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'feature-5',
            name: 'Lead Tracking',
            status: 'completed',
            isRequired: true
          },
          {
            id: 'feature-6',
            name: 'Communication Tools',
            status: 'completed',
            isRequired: true
          }
        ]
      },
      {
        id: 'integrations',
        name: 'External Integrations',
        description: 'Connectivity with third-party platforms',
        items: [
          {
            id: 'integration-1',
            name: 'Zapier Webhooks',
            status: 'completed',
            isRequired: false
          },
          {
            id: 'integration-2',
            name: 'WhatsApp Business',
            status: 'completed',
            isRequired: false
          },
          {
            id: 'integration-3',
            name: 'Zoom Meetings',
            status: 'completed',
            isRequired: false
          },
          {
            id: 'integration-4',
            name: 'CRM Connectors',
            status: 'completed',
            isRequired: false
          }
        ]
      }
    ];

    setCategories(defaultCategories);
    
    // Calculate totals
    const total = defaultCategories.reduce((sum, category) => sum + category.items.length, 0);
    const completed = defaultCategories.reduce((sum, category) => 
      sum + category.items.filter(item => item.status === 'completed').length, 0
    );
    
    setTotalItems(total);
    setCompletedItems(completed);
  }, []);

  const handleVerify = async () => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual verification logic in a real implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Verification completed successfully!");
      
      // Update verification statuses (mock implementation)
      setCategories(prevCategories => {
        const newCategories = [...prevCategories];
        
        // Randomly set a few items to warning or in-progress for demonstration
        const randomIndex = Math.floor(Math.random() * totalItems);
        let count = 0;
        
        for (let i = 0; i < newCategories.length; i++) {
          for (let j = 0; j < newCategories[i].items.length; j++) {
            if (count === randomIndex) {
              newCategories[i].items[j].status = 'warning';
              newCategories[i].items[j].statusMessage = 'Needs attention before launch';
            } else if (count === randomIndex + 1) {
              newCategories[i].items[j].status = 'in-progress';
              newCategories[i].items[j].statusMessage = 'Still being configured';
            }
            count++;
          }
        }
        
        return newCategories;
      });
      
      // Recalculate completion
      const completed = categories.reduce((sum, category) => 
        sum + category.items.filter(item => item.status === 'completed').length, 0
      );
      setCompletedItems(completed);
      
    } catch (error) {
      console.error('Verification error:', error);
      toast.error("Failed to complete verification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Launch Verification Checklist</CardTitle>
            <CardDescription>
              System verification for production readiness
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleVerify}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Verify
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChecklistProgress 
          completed={completedItems} 
          total={totalItems} 
        />
        
        <div className="mt-6 space-y-6">
          {categories.map(category => (
            <ChecklistCategory 
              key={category.id} 
              category={category} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
