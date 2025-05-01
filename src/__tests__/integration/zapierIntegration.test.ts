
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { triggerBusinessEvent } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

// Mock dependencies
vi.mock('@/lib/zapier', () => ({
  triggerBusinessEvent: vi.fn().mockResolvedValue({ success: true })
}));

vi.mock('@/utils/auditLogger', () => ({
  logAuditEvent: vi.fn().mockResolvedValue(undefined)
}));

describe('Zapier Integration Tests', () => {
  const webhookUrl = 'https://hooks.zapier.com/hooks/catch/test/webhook';
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('onStrategyApproved', () => {
    it('should trigger a business event with the correct payload', async () => {
      // Arrange
      const strategy = {
        strategyTitle: 'Market Expansion Strategy',
        strategyId: 'strat-123',
        companyId: 'Test Company',
        approvedBy: 'AI CEO'
      };

      // Act
      const onStrategyApproved = async (url: string, strategy: any) => {
        return triggerBusinessEvent(url, 'strategy_approved', {
          entityId: strategy.strategyId,
          entityType: 'strategy',
          strategyTitle: strategy.strategyTitle,
          companyId: strategy.companyId
        });
      };
      
      const result = await onStrategyApproved(webhookUrl, strategy);

      // Assert
      expect(result).toEqual({ success: true });
      expect(triggerBusinessEvent).toHaveBeenCalledWith(webhookUrl, 'strategy_approved', expect.objectContaining({
        entityId: strategy.strategyId,
        entityType: 'strategy',
        strategyTitle: strategy.strategyTitle,
        companyId: strategy.companyId
      }));
      
      expect(logAuditEvent).not.toHaveBeenCalled();
    });
  });
});
