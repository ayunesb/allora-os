"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLeadScoring = useLeadScoring;
function useLeadScoring() {
  /**
   * Calculate a lead score based on various factors
   */
  var calculateLeadScore = function (lead) {
    var score = 0;
    // Factor 1: Lead status
    if (lead.status === "qualified") score += 30;
    else if (lead.status === "proposal") score += 40;
    else if (lead.status === "negotiation") score += 50;
    else if (lead.status === "client") score += 60;
    else if (lead.status === "contacted") score += 20;
    else if (lead.status === "new") score += 10;
    // Lost leads get no score boost
    // Factor 2: Communication recency (would normally check comms)
    var daysSinceCreation = Math.floor(
      (new Date().getTime() - new Date(lead.created_at).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    if (daysSinceCreation < 3)
      score += 20; // Very recent
    else if (daysSinceCreation < 7)
      score += 15; // Within a week
    else if (daysSinceCreation < 14)
      score += 10; // Within two weeks
    else if (daysSinceCreation < 30) score += 5; // Within a month
    // Factor 3: Has contact info
    if (lead.email) score += 10;
    if (lead.phone) score += 10;
    // Factor 4: Source (would normally check lead source)
    if (lead.source === "referral") score += 15;
    else if (lead.source === "website") score += 10;
    else if (lead.source === "linkedin") score += 12;
    return score;
  };
  /**
   * Get a categorical score (hot/warm/cold) for a lead
   */
  var getLeadScore = function (lead) {
    // Get or calculate the score
    var score = lead.score || calculateLeadScore(lead);
    // Categorize the lead
    if (score >= 60) return "hot";
    if (score >= 30) return "warm";
    return "cold";
  };
  /**
   * Determine the next best action for a lead based on their score and status
   */
  var getNextBestAction = function (lead) {
    var score = getLeadScore(lead);
    if (score === "hot") {
      if (lead.status === "negotiation") return "Schedule follow-up call";
      if (lead.status === "proposal") return "Check in on proposal";
      if (lead.status === "qualified") return "Send proposal";
      return "Prioritize for immediate contact";
    }
    if (score === "warm") {
      if (lead.status === "contacted") return "Schedule qualification call";
      if (lead.status === "new") return "Make initial contact";
      return "Follow up within 3 days";
    }
    // Cold leads
    if (lead.status === "new") return "Send introduction email";
    if (lead.status === "contacted") return "Add to nurture campaign";
    return "Add to newsletter list";
  };
  return {
    calculateLeadScore: calculateLeadScore,
    getLeadScore: getLeadScore,
    getNextBestAction: getNextBestAction,
  };
}
