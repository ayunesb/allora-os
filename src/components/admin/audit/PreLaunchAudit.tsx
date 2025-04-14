
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { ArrowRightIcon, CheckCircle2, Loader2 } from 'lucide-react';
import { AuditNavigation } from './AuditNavigation';
import { AuditFunctional } from './AuditFunctional';
import { AuditSecurity } from './AuditSecurity';
import { AuditPerformance } from './AuditPerformance';
import { AuditUX } from './AuditUX';
import { AuditAI } from './AuditAI';
import { AuditLegal } from './AuditLegal';
import { AuditIntegrations } from './AuditIntegrations';
import { CategoryStatus } from './types';

export function PreLaunchAudit() {
  const [isRunningFullAudit, setIsRunningFullAudit] = useState(false);
  const [auditStatuses, setAuditStatuses] = useState<Record<string, CategoryStatus>>({
    navigation: 'pending',
    functional: 'pending',
    security: 'pending',
    performance: 'pending',
    ux: 'pending',
    ai: 'pending',
    legal: 'pending',
    integrations: 'pending'
  });

  const handleStatusChange = (category: string, status: CategoryStatus) => {
    setAuditStatuses(prev => ({
      ...prev,
      [category]: status
    }));
  };

  const runFullAudit = async () => {
    if (isRunningFullAudit) return;
    
    setIsRunningFullAudit(true);
    
    // Reset all statuses
    setAuditStatuses({
      navigation: 'in-progress',
      functional: 'pending',
      security: 'pending',
      performance: 'pending',
      ux: 'pending',
      ai: 'pending',
      legal: 'pending',
      integrations: 'pending'
    });
    
    // Simulate running each audit in sequence
    const categories = [
      'navigation', 'functional', 'security', 
      'performance', 'ux', 'ai', 'legal', 'integrations'
    ];
    
    for (const category of categories) {
      setAuditStatuses(prev => ({
        ...prev,
        [category]: 'in-progress'
      }));
      
      // Simulate audit taking some time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly determine if the audit passed or failed (90% pass rate for demo)
      const passed = Math.random() < 0.9;
      
      setAuditStatuses(prev => ({
        ...prev,
        [category]: passed ? 'passed' : 'failed'
      }));
      
      if (!passed) {
        toast.error(`${category.charAt(0).toUpperCase() + category.slice(1)} audit failed. Please check the details.`);
      }
    }
    
    setIsRunningFullAudit(false);
    
    // Check overall status
    const allPassed = Object.values(auditStatuses).every(status => status === 'passed');
    
    if (allPassed) {
      toast.success('All audits passed! Allora AI is launch ready! 🚀', {
        duration: 5000,
      });
    } else {
      toast.warning('Some audits failed. Please address the issues before launching.', {
        duration: 5000,
      });
    }
  };

  const getAllAuditsPassed = () => {
    return Object.values(auditStatuses).every(status => status === 'passed');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pre-Launch Audit</h1>
        <Button 
          onClick={runFullAudit}
          disabled={isRunningFullAudit}
          className="gap-2"
        >
          {isRunningFullAudit ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Running Full Audit...
            </>
          ) : (
            <>
              Run Full Audit
              <ArrowRightIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      {getAllAuditsPassed() && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold text-green-600">Launch Ready!</h3>
                <p className="text-green-600/80">
                  All audits have passed. Allora AI is ready for launch!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AuditNavigation 
          status={auditStatuses.navigation} 
          onStatusChange={(status) => handleStatusChange('navigation', status)}
        />
        
        <AuditFunctional 
          status={auditStatuses.functional} 
          onStatusChange={(status) => handleStatusChange('functional', status)}
        />
        
        <AuditSecurity 
          status={auditStatuses.security} 
          onStatusChange={(status) => handleStatusChange('security', status)}
        />
        
        <AuditPerformance 
          status={auditStatuses.performance} 
          onStatusChange={(status) => handleStatusChange('performance', status)}
        />
        
        <AuditUX 
          status={auditStatuses.ux} 
          onStatusChange={(status) => handleStatusChange('ux', status)}
        />
        
        <AuditAI 
          status={auditStatuses.ai} 
          onStatusChange={(status) => handleStatusChange('ai', status)}
        />
        
        <AuditLegal 
          status={auditStatuses.legal} 
          onStatusChange={(status) => handleStatusChange('legal', status)}
        />
        
        <AuditIntegrations 
          status={auditStatuses.integrations} 
          onStatusChange={(status) => handleStatusChange('integrations', status)}
        />
      </div>
    </div>
  );
}
