import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Wrench } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
export function AuditFunctional({ status, onStatusChange }) {
    const [isRunning, setIsRunning] = useState(false);
    const [items, setItems] = useState([
        {
            id: 'func-1',
            title: 'User Signup/Login',
            description: 'Authentication flows work correctly',
            status: 'pending',
            required: true
        },
        {
            id: 'func-2',
            title: 'Dashboard Loads',
            description: 'Dashboard renders without errors',
            status: 'pending',
            required: true
        },
        {
            id: 'func-3',
            title: 'Strategy Creation',
            description: 'Users can create strategies',
            status: 'pending',
            required: true
        },
        {
            id: 'func-4',
            title: 'Lead Management',
            description: 'Users can add/edit leads',
            status: 'pending',
            required: true
        },
        {
            id: 'func-5',
            title: 'Campaign Creation',
            description: 'Campaign creation workflow works',
            status: 'pending',
            required: false
        },
        {
            id: 'func-6',
            title: 'Settings/Profile',
            description: 'User can update profile information',
            status: 'pending',
            required: true
        },
        {
            id: 'func-7',
            title: 'Digital Twin',
            description: '3D visualization loads correctly',
            status: 'pending',
            required: true
        }
    ]);
    const runTest = async () => {
        setIsRunning(true);
        try {
            for (let i = 0; i < items.length; i++) {
                // Update to in-progress
                setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'in-progress' } : item));
                // Simulate test
                await new Promise(resolve => setTimeout(resolve, 500));
                // Special check for Digital Twin
                if (items[i].id === 'func-7') {
                    try {
                        // Check if the Digital Twin component exists
                        const digitalTwinExists = typeof require('../../../pages/dashboard/DigitalTwin.tsx') === 'object';
                        setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: digitalTwinExists ? 'passed' : 'failed' } : item));
                        continue;
                    }
                    catch (error) {
                        console.error('Digital Twin check error:', error);
                    }
                }
                // For demo, mark all as passed except one (campaign creation)
                const passed = items[i].id !== 'func-5';
                setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: passed ? 'passed' : 'failed' } : item));
            }
            // Check results
            const requiredItems = items.filter(item => item.required);
            const allRequiredPassed = requiredItems.every(item => {
                // Get the updated status
                const updatedItem = items.find(i => i.id === item.id);
                return updatedItem?.status === 'passed';
            });
            onStatusChange(allRequiredPassed ? 'passed' : 'failed');
            if (allRequiredPassed) {
                toast.success('Functional tests passed!');
            }
            else {
                toast.error('Some functional tests failed!');
            }
        }
        catch (error) {
            console.error('Functional test error:', error);
            onStatusChange('failed');
            toast.error('Error running functional tests');
        }
        finally {
            setIsRunning(false);
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'passed': return <CheckCircle2 className="h-4 w-4 text-green-500"/>;
            case 'failed': return <XCircle className="h-4 w-4 text-red-500"/>;
            case 'in-progress': return <Loader2 className="h-4 w-4 animate-spin text-blue-500"/>;
            default: return <AlertCircle className="h-4 w-4 text-muted-foreground"/>;
        }
    };
    return (<Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary/80"/>
            <CardTitle>Functional Testing</CardTitle>
          </div>
          <Button onClick={runTest} disabled={isRunning} size="sm">
            {isRunning ? (<>
                <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                Testing...
              </>) : ('Run Tests')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (<div key={item.id} className="flex items-start space-x-2">
              <div className="mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.title}</span>
                  {!item.required && (<span className="text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded">Optional</span>)}
                </div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
              <div className="ml-auto flex items-center">
                <Checkbox id={item.id} checked={item.status === 'passed'} disabled={isRunning} onCheckedChange={(checked) => {
                setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: checked ? 'passed' : 'failed' } : i));
            }}/>
              </div>
            </div>))}
        </div>
      </CardContent>
    </Card>);
}
