import { useCallback } from "react";
import { Lead } from "@/models/lead";

// Lead score categories
export type LeadScoreCategory = "hot" | "warm" | "cold";

// Lead score breakdown - factors that contribute to the score
export type LeadScoreBreakdown = {
  baseScore: number;
  engagementScore: number;
  demographicScore: number;
  behavioralScore: number;
  timeFactorScore: number;
  totalScore: number;
};

export function useAdvancedLeadScoring() {
  /**
   * Calculate a comprehensive lead score based on multiple factors
   * This is a more sophisticated algorithm that considers various aspects
   */
  const calculateAdvancedScore = useCallback(
    (lead: Lead): LeadScoreBreakdown => {
      // Base score from lead status
      let baseScore = 0;
      if (lead.status === "qualified") baseScore = 30;
      else if (lead.status === "proposal") baseScore = 40;
      else if (lead.status === "negotiation") baseScore = 50;
      else if (lead.status === "client") baseScore = 60;
      else if (lead.status === "contacted") baseScore = 20;
      else if (lead.status === "new") baseScore = 10;
      else if (lead.status === "lost") baseScore = 5;

      // Engagement score - could be based on communication frequency
      let engagementScore = 0;
      // Ideally this would be calculated based on actual engagement data
      // For now we'll use a placeholder based on lead source
      if (lead.source === "linkedin") engagementScore = 15;
      else if (lead.source === "referral") engagementScore = 25;
      else if (lead.source === "website") engagementScore = 10;
      else engagementScore = 5;

      // Demographic score - based on lead information completeness
      let demographicScore = 0;
      if (lead.email) demographicScore += 10;
      if (lead.phone) demographicScore += 10;
      if (lead.name && lead.name.length > 0) demographicScore += 5;

      // Behavioral score - would normally be based on tracked behaviors
      // For now, use a placeholder value
      const behavioralScore = 10;

      // Time factor - recency effect
      let timeFactorScore = 0;
      const daysSinceCreation = Math.floor(
        (new Date().getTime() - new Date(lead.created_at).getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (daysSinceCreation < 3)
        timeFactorScore = 20; // Very recent
      else if (daysSinceCreation < 7)
        timeFactorScore = 15; // Within a week
      else if (daysSinceCreation < 14)
        timeFactorScore = 10; // Within two weeks
      else if (daysSinceCreation < 30) timeFactorScore = 5; // Within a month

      // Calculate total score
      const totalScore =
        baseScore +
        engagementScore +
        demographicScore +
        behavioralScore +
        timeFactorScore;

      return {
        baseScore,
        engagementScore,
        demographicScore,
        behavioralScore,
        timeFactorScore,
        totalScore,
      };
    },
    [],
  );

  /**
   * Get a categorical score (hot/warm/cold) based on the numerical score
   */
  const getLeadScoreCategory = useCallback(
    (lead: Lead): LeadScoreCategory => {
      const { totalScore } = calculateAdvancedScore(lead);

      if (totalScore >= 80) return "hot";
      if (totalScore >= 40) return "warm";
      return "cold";
    },
    [calculateAdvancedScore],
  );

  /**
   * Get the next best action recommendation based on lead score and status
   */
  const getNextBestAction = useCallback(
    (lead: Lead): string => {
      const scoreCategory = getLeadScoreCategory(lead);
      const { totalScore } = calculateAdvancedScore(lead);

      // Personalized recommendations based on score category and status
      if (scoreCategory === "hot") {
        if (lead.status === "negotiation")
          return "Schedule follow-up call within 24 hours";
        if (lead.status === "proposal")
          return "Send personalized case study and check in on proposal";
        if (lead.status === "qualified")
          return "Prepare tailored proposal with specific pricing options";
        return "Prioritize for immediate contact by senior sales rep";
      }

      if (scoreCategory === "warm") {
        if (lead.status === "contacted")
          return "Schedule detailed qualification call to understand needs";
        if (lead.status === "new")
          return "Send personalized introduction email with relevant content";
        return "Follow up within 3 days with industry-specific information";
      }

      // Cold leads
      if (lead.status === "new")
        return "Add to automated email nurture sequence";
      if (lead.status === "contacted")
        return "Include in relevant webinar invitation";
      return "Add to monthly newsletter and reassess in 30 days";
    },
    [calculateAdvancedScore, getLeadScoreCategory],
  );

  /**
   * Get a priority level for the lead (1-5, with 5 being highest)
   */
  const getLeadPriority = useCallback(
    (lead: Lead): number => {
      const { totalScore } = calculateAdvancedScore(lead);

      if (totalScore >= 90) return 5;
      if (totalScore >= 70) return 4;
      if (totalScore >= 50) return 3;
      if (totalScore >= 30) return 2;
      return 1;
    },
    [calculateAdvancedScore],
  );

  return {
    calculateAdvancedScore,
    getLeadScoreCategory,
    getNextBestAction,
    getLeadPriority,
  };
}
