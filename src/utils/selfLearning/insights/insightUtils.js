/**
 * Helper functions for generating user insights
 */
/**
 * Calculate learning progress based on available preference data
 */
export function calculateLearningProgress(preferences) {
    // Count non-empty preference data points
    let dataPoints = 0;
    if (preferences.favoriteExecutives.length > 0)
        dataPoints += 2;
    if (preferences.topCategories.length > 0)
        dataPoints += 2;
    if (Object.keys(preferences.categories).length > 3)
        dataPoints += 3;
    if (Object.keys(preferences.executives).length > 3)
        dataPoints += 3;
    // Cap at 10
    return Math.min(10, dataPoints);
}
/**
 * Map category to user-friendly focus area
 */
export function getFocusArea(preferences) {
    const topCategory = preferences.topCategories[0];
    if (!topCategory)
        return "No data yet";
    // Map category to user-friendly focus area
    const focusMap = {
        strategy_feedback: "Strategic Planning",
        campaign_feedback: "Marketing",
        script_feedback: "Sales Outreach",
        message_send: "Communications",
        call_initiate: "Direct Calling",
        page_view: "Research & Analysis",
    };
    return focusMap[topCategory] || "General Business";
}
