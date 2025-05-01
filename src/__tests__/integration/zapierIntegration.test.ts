
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onStrategyApproved, onNewLeadAdded, onCampaignLaunched, StrategyApprovalPayload, LeadPayload, CampaignPayload } from '@/utils/zapierEventTriggers';
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
      const strategy: StrategyApprovalPayload = {
        strategyName: 'Market Expansion Strategy',
        entityId: 'strat-123',
        companyId: 'Test Company',
        entityType: 'strategy',
        botName: 'AI CEO',
        suggestedBy: 'AI CEO',
        riskLevel: 'Medium',
        timestamp: new Date().toISOString()
      };

      // Act
      const result = await onStrategyApproved(strategy);

      // Assert
      expect(result).toEqual({ success: true });
      expect(triggerBusinessEvent).toHaveBeenCalledWith('strategy_approved', expect.objectContaining({
        entityId: strategy.entityId,
        entityType: strategy.entityType,
        strategyName: strategy.strategyName,
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
      
      const strategy: StrategyApprovalPayload = {
        strategyName: 'Market Expansion Strategy',
        entityId: 'strat-123',
        companyId: 'Test Company',
        entityType: 'strategy',
        botName: 'AI CEO',
        suggestedBy: 'AI CEO',
        riskLevel: 'Medium',
        timestamp: new Date().toISOString()
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
      const lead: LeadPayload = {
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
        leadId: lead.leadId,
        leadName: lead.leadName,
        company: lead.company
      }));
    });
  });

  describe('onCampaignLaunched', () => {
    it('should trigger a business event with the correct payload', async () => {
      // Arrange
      const campaign: CampaignPayload = {
        name: 'Summer Promotion',
        type: 'Facebook',
        campaignId: 'camp-123',
        startDate: new Date().toISOString(),
        budget: 5000
      };

      // Act
      const result = await onCampaignLaunched(campaign);

      // Assert
      expect(result).toEqual({ success: true });
      expect(triggerBusinessEvent).toHaveBeenCalledWith('campaign_launched', expect.objectContaining({
        campaignId: campaign.campaignId,
        name: campaign.name,
        type: campaign.type,
        startDate: campaign.startDate
      }));
    });
  });
});
