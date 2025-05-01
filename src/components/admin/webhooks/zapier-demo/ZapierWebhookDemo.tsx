
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useZapier } from '@/lib/zapier';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BusinessEventType } from '@/types/fixed/Webhook';

interface TestEvent {
  entityId: string;
  entityType: string;
  strategyName: string;
  botName: string;
  suggestedBy: string;
  riskLevel: string;
  timestamp: string;
}

interface ZapierWebhookDemoProps {
  webhookUrl: string;
}

const ZapierWebhookDemo: React.FC<ZapierWebhookDemoProps> = ({ webhookUrl }) => {
  const zapier = useZapier();
  const [isTriggering, setIsTriggering] = useState(false);
  const [testEvent, setTestEvent] = useState<TestEvent>({
    entityId: 'test-strategy-123',
    entityType: 'strategy',
    strategyName: 'Market Expansion',
    botName: 'AI Strategist',
    suggestedBy: 'AI CEO',
    riskLevel: 'Medium',
    timestamp: new Date().toISOString(),
  });

  const triggerTestEvent = async () => {
    setIsTriggering(true);
    try {
      const result = await zapier.triggerWorkflow(webhookUrl, { test: true });
      if (result.success) {
        toast.success(`Event triggered successfully`);
      } else {
        toast.error(`Failed to trigger event: ${result.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error("Error triggering test event:", error);
      toast.error(`Failed to trigger event: ${error.message || 'Unknown error'}`);
    } finally {
      setIsTriggering(false);
    }
  };

  const triggerStrategyApprovedEvent = async () => {
    setIsTriggering(true);
    try {
      const result = await zapier.triggerStrategyApproved(webhookUrl, {
        entityId: testEvent.entityId,
        entityType: testEvent.entityType,
        strategyName: testEvent.strategyName,
        botName: testEvent.botName,
        suggestedBy: testEvent.suggestedBy,
        riskLevel: testEvent.riskLevel,
        timestamp: testEvent.timestamp,
        companyId: 'test-company'
      });

      if (result.success) {
        toast.success(`Event triggered successfully`);
      } else {
        toast.error(`Failed to trigger event: ${result.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error("Error triggering strategy_approved event:", error);
      toast.error(`Failed to trigger event: ${error.message || 'Unknown error'}`);
    } finally {
      setIsTriggering(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestEvent(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <h4 className="text-sm font-medium">Zapier Event Demos</h4>
      <p className="text-xs text-muted-foreground">
        Trigger sample events to test your Zapier integration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="entityId">Entity ID</Label>
          <Input
            type="text"
            id="entityId"
            name="entityId"
            value={testEvent.entityId}
            onChange={handleInputChange}
            placeholder="e.g., strategy-123"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="strategyName">Strategy Name</Label>
          <Input
            type="text"
            id="strategyName"
            name="strategyName"
            value={testEvent.strategyName}
            onChange={handleInputChange}
            placeholder="e.g., Market Expansion"
          />
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={triggerTestEvent}
        disabled={isTriggering}
      >
        {isTriggering ? "Triggering..." : "Trigger Test Event"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={triggerStrategyApprovedEvent}
        disabled={isTriggering}
      >
        {isTriggering ? "Triggering..." : "Trigger Strategy Approved"}
      </Button>
    </div>
  );
};

export default ZapierWebhookDemo;
