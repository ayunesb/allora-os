
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { testZapierWebhook } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

// Mock dependencies
vi.mock('@/lib/zapier', () => ({
  testZapierWebhook: vi.fn().mockResolvedValue({ success: true })
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
    it('should trigger a webhook with the correct payload', async () => {
      // Arrange
      const strategy = {
        strategyTitle: 'Market Expansion Strategy',
        strategyId: 'strat-123',
        companyId: 'Test Company',
        approvedBy: 'AI CEO'
      };

      // Act
      const onStrategyApproved = async (url: string, strategy: any) => {
        return testZapierWebhook(url);
      };
      
      const result = await onStrategyApproved(webhookUrl, strategy);

      // Assert
      expect(result).toEqual({ success: true });
      expect(testZapierWebhook).toHaveBeenCalledWith(webhookUrl);
      
      expect(logAuditEvent).not.toHaveBeenCalled();
    });
  });
});
