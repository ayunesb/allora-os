
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onStrategyApproved, onNewLeadAdded, onCampaignLaunched } from '@/utils/zapierEventTriggers';
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
      const result = await onStrategyApproved(strategy);

      // Assert
      expect(result).toEqual({ success: true });
      expect(triggerBusinessEvent).toHaveBeenCalledWith('strategy_approved', expect.objectContaining({
        entityId: strategy.strategyId,
        entityType: 'strategy',
        strategyTitle: strategy.strategyTitle,
        companyId: strategy.companyId
      }));
      
      expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({
        action: 'SYSTEM_CHANGE',
        resource: 'zapier_event'
      }));
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(triggerBusinessEvent).mockRejectedValueOnce(new Error('Network error'));
      
      const strategy = {
        strategyTitle: 'Market Expansion Strategy',
        strategyId: 'strat-123',
        companyId: 'Test Company',
        approvedBy: 'AI CEO'
      };

      // Act
      const result = await onStrategyApproved(strategy);

      // Assert
      expect(result).toEqual({ success: false, error: expect.any(Error) });
      expect(triggerBusinessEvent).toHaveBeenCalled();
      expect(logAuditEvent).toHaveBeenCalled();
    });
  });

  describe('onNewLeadAdded', () => {
    it('should trigger a business event with the correct payload', async () => {
      // Arrange
      const lead = {
        company: 'Test Company',
        leadName: 'John Doe',
        source: 'Website Form',
        leadId: 'lead-123',
        email: 'john@example.com'
      };

      // Act
      const result = await onNewLeadAdded(lead);

      // Assert
      expect(result).toEqual({ success: true });
      expect(triggerBusinessEvent).toHaveBeenCalledWith('lead_added', expect.objectContaining({
        entityId: lead.leadId,
        entityType: 'lead',
        leadName: lead.leadName,
        company: lead.company
      }));
    });
  });

  describe('onCampaignLaunched', () => {
    it('should trigger a business event with the correct payload', async () => {
      // Arrange
      const campaign = {
        campaignTitle: 'Summer Promotion',
        platform: 'Facebook',
        owner: 'Marketing Team',
        campaignId: 'camp-123',
        companyId: 'company-123',
        budget: 5000
      };

      // Act
      const result = await onCampaignLaunched(campaign);

      // Assert
      expect(result).toEqual({ success: true });
      expect(triggerBusinessEvent).toHaveBeenCalledWith('campaign_launched', expect.objectContaining({
        entityId: campaign.campaignId,
        entityType: 'campaign',
        campaignTitle: campaign.campaignTitle,
        companyId: campaign.companyId
      }));
    });
  });
});
