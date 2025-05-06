interface StrategyApprovalData {
  strategyId: string;
  strategyTitle: string;
  companyId?: string;
  approvedBy?: string;
}
interface CampaignCreationData {
  campaignId: string;
  campaignTitle: string;
  platform?: string;
  budget?: number;
}
interface LeadConversionData {
  leadId: string;
  leadName?: string;
  email?: string;
  company?: string;
  value?: number;
}
/**
 * Trigger webhook for strategy approval
 */
export declare function onStrategyApproved(
  data: StrategyApprovalData,
): Promise<boolean>;
/**
 * Trigger webhook for campaign creation
 */
export declare function onCampaignCreated(
  data: CampaignCreationData,
): Promise<boolean>;
/**
 * Trigger webhook for lead conversion
 */
export declare function onLeadConverted(
  data: LeadConversionData,
): Promise<boolean>;
export {};
