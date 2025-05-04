import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, FileText } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
export function AuditLegal({ status, onStatusChange }) {
    const [isRunning, setIsRunning] = useState(false);
    const [items, setItems] = useState([
        {
            id: 'legal-1',
            title: 'Privacy Policy',
            description: 'GDPR and CCPA compliant Privacy Policy',
            status: 'pending',
            required: true
        },
        {
            id: 'legal-2',
            title: 'Terms of Service',
            description: 'Clear Terms of Service document',
            status: 'pending',
            required: true
        },
        {
            id: 'legal-3',
            title: 'Cookie Policy',
            description: 'Cookie usage details and opt-out options',
            status: 'pending',
            required: true
        },
        {
            id: 'legal-4',
            title: 'GDPR Compliance',
            description: 'Data deletion and export options',
            status: 'pending',
            required: true
        },
        {
            id: 'legal-5',
            title: 'Refund Policy',
            description: 'Clear refund terms for paid services',
            status: 'pending',
            required: false
        },
        {
            id: 'legal-6',
            title: 'Consent Management',
            description: 'Cookie consent banner implementation',
            status: 'pending',
            required: true
        }
    ]);
    const runTest = async () => {
        setIsRunning(true);
        // Check for existence of legal pages in routes
        try {
            // For each item, perform a check (simulated for now)
            for (let i = 0; i < items.length; i++) {
                // Update item to in-progress
                setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: 'in-progress' } : item));
                // Wait a short time to simulate check
                await new Promise(resolve => setTimeout(resolve, 500));
                // Check the routes for legal documents
                const hasDocument = checkForLegalDocument(items[i].id);
                // Update item status
                setItems(prev => prev.map((item, idx) => idx === i ? { ...item, status: hasDocument ? 'passed' : 'failed' } : item));
            }
            // Check overall status
            const requiredItems = items.filter(item => item.required);
            const allRequiredPassed = requiredItems.every(item => item.status === 'passed');
            onStatusChange(allRequiredPassed ? 'passed' : 'failed');
            if (allRequiredPassed) {
                toast.success('Legal documents check passed!');
            }
            else {
                toast.error('Some required legal documents are missing!');
            }
        }
        catch (error) {
            console.error('Error checking legal documents:', error);
            onStatusChange('failed');
            toast.error('Error checking legal documents');
        }
        finally {
            setIsRunning(false);
        }
    };
    // Helper to check for legal document (simplified for demo)
    const checkForLegalDocument = (id) => {
        // In a real app, this would check the routes or API for the document
        const documentMap = {
            'legal-1': '/privacy',
            'legal-2': '/terms',
            'legal-3': '/cookie-policy',
            'legal-4': '/gdpr',
            'legal-5': '/refund-policy',
            'legal-6': '/cookie-consent'
        };
        // Simulate checking routes
        // For demo purposes, let's pass all but refund policy
        return id !== 'legal-5';
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
            <FileText className="h-5 w-5 text-primary/80"/>
            <CardTitle>Legal Documents Audit</CardTitle>
          </div>
          <Button onClick={runTest} disabled={isRunning} size="sm">
            {isRunning ? (<>
                <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                Checking...
              </>) : ('Check Documents')}
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
