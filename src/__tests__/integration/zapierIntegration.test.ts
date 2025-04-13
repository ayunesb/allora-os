
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
        company: 'Test Company',
        strategyTitle: 'Market Expansion Strategy',
        suggestedBy: 'AI CEO',
        strategyId: 'strat-123',
        userId: 'user-123'
      };

      // Act
      const result = await onStrategyApproved(strategy);

      // Assert
      expect(result).toBe(true);
      expect(triggerBusinessEvent).toHaveBeenCalledWith('strategy_approved', expect.objectContaining({
        companyId: strategy.company,
        entityId: strategy.strategyId,
        entityType: 'strategy',
        strategyName: strategy.strategyTitle
      }));
      
      expect(logAuditEvent).toHaveBeenCalledWith(expect.objectContaining({
        user: strategy.userId,
        action: 'SYSTEM_CHANGE',
        resource: 'zapier_event'
      }));
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      vi.mocked(triggerBusinessEvent).mockRejectedValueOnce(new Error('Network error'));
      
      const strategy = {
        company: 'Test Company',
        strategyTitle: 'Market Expansion Strategy',
        suggestedBy: 'AI CEO'
      };

      // Act
      const result = await onStrategyApproved(strategy);

      // Assert
      expect(result).toBe(false);
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
        email: 'john@example.com',
        userId: 'user-456'
      };

      // Act
      const result = await onNewLeadAdded(lead);

      // Assert
      expect(result).toBe(true);
      expect(triggerBusinessEvent).toHaveBeenCalledWith('lead_added', expect.objectContaining({
        companyId: lead.company,
        entityId: lead.leadId,
        entityType: 'lead',
        leadName: lead.leadName,
        contactInfo: expect.objectContaining({
          email: lead.email
        })
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
        budget: 5000,
        userId: 'user-789'
      };

      // Act
      const result = await onCampaignLaunched(campaign);

      // Assert
      expect(result).toBe(true);
      expect(triggerBusinessEvent).toHaveBeenCalledWith('campaign_launched', expect.objectContaining({
        companyId: campaign.companyId,
        entityId: campaign.campaignId,
        entityType: 'campaign',
        campaignTitle: campaign.campaignTitle,
        budget: campaign.budget
      }));
    });
  });
});
