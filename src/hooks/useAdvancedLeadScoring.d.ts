import { Lead } from "@/models/lead";
export type LeadScoreCategory = "hot" | "warm" | "cold";
export type LeadScoreBreakdown = {
  baseScore: number;
  engagementScore: number;
  demographicScore: number;
  behavioralScore: number;
  timeFactorScore: number;
  totalScore: number;
};
export declare function useAdvancedLeadScoring(): {
  calculateAdvancedScore: (lead: Lead) => LeadScoreBreakdown;
  getLeadScoreCategory: (lead: Lead) => LeadScoreCategory;
  getNextBestAction: (lead: Lead) => string;
  getLeadPriority: (lead: Lead) => number;
};
