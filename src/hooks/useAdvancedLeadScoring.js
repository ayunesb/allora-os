"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdvancedLeadScoring = useAdvancedLeadScoring;
var react_1 = require("react");
function useAdvancedLeadScoring() {
  /**
   * Calculate a comprehensive lead score based on multiple factors
   * This is a more sophisticated algorithm that considers various aspects
   */
  var calculateAdvancedScore = (0, react_1.useCallback)(function (lead) {
    // Base score from lead status
    var baseScore = 0;
    if (lead.status === "qualified") baseScore = 30;
    else if (lead.status === "proposal") baseScore = 40;
    else if (lead.status === "negotiation") baseScore = 50;
    else if (lead.status === "client") baseScore = 60;
    else if (lead.status === "contacted") baseScore = 20;
    else if (lead.status === "new") baseScore = 10;
    else if (lead.status === "lost") baseScore = 5;
    // Engagement score - could be based on communication frequency
    var engagementScore = 0;
    // Ideally this would be calculated based on actual engagement data
    // For now we'll use a placeholder based on lead source
    if (lead.source === "linkedin") engagementScore = 15;
    else if (lead.source === "referral") engagementScore = 25;
    else if (lead.source === "website") engagementScore = 10;
    else engagementScore = 5;
    // Demographic score - based on lead information completeness
    var demographicScore = 0;
    if (lead.email) demographicScore += 10;
    if (lead.phone) demographicScore += 10;
    if (lead.name && lead.name.length > 0) demographicScore += 5;
    // Behavioral score - would normally be based on tracked behaviors
    // For now, use a placeholder value
    var behavioralScore = 10;
    // Time factor - recency effect
    var timeFactorScore = 0;
    var daysSinceCreation = Math.floor(
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
    var totalScore =
      baseScore +
      engagementScore +
      demographicScore +
      behavioralScore +
      timeFactorScore;
    return {
      baseScore: baseScore,
      engagementScore: engagementScore,
      demographicScore: demographicScore,
      behavioralScore: behavioralScore,
      timeFactorScore: timeFactorScore,
      totalScore: totalScore,
    };
  }, []);
  /**
   * Get a categorical score (hot/warm/cold) based on the numerical score
   */
  var getLeadScoreCategory = (0, react_1.useCallback)(
    function (lead) {
      var totalScore = calculateAdvancedScore(lead).totalScore;
      if (totalScore >= 80) return "hot";
      if (totalScore >= 40) return "warm";
      return "cold";
    },
    [calculateAdvancedScore],
  );
  /**
   * Get the next best action recommendation based on lead score and status
   */
  var getNextBestAction = (0, react_1.useCallback)(
    function (lead) {
      var scoreCategory = getLeadScoreCategory(lead);
      var totalScore = calculateAdvancedScore(lead).totalScore;
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
  var getLeadPriority = (0, react_1.useCallback)(
    function (lead) {
      var totalScore = calculateAdvancedScore(lead).totalScore;
      if (totalScore >= 90) return 5;
      if (totalScore >= 70) return 4;
      if (totalScore >= 50) return 3;
      if (totalScore >= 30) return 2;
      return 1;
    },
    [calculateAdvancedScore],
  );
  return {
    calculateAdvancedScore: calculateAdvancedScore,
    getLeadScoreCategory: getLeadScoreCategory,
    getNextBestAction: getNextBestAction,
    getLeadPriority: getLeadPriority,
  };
}
