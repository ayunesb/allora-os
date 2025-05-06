"use strict";
/**
 * Analyze user behavior to update preferences
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeUserBehavior = void 0;
// Analyze user behavior to determine preferences
var analyzeUserBehavior = function (actions, currentPreferences) {
  if (!actions.length) return null;
  // Initialize preferences with current values or defaults
  var preferences = {
    risk_appetite:
      (currentPreferences === null || currentPreferences === void 0
        ? void 0
        : currentPreferences.riskAppetite) || "medium",
    preferred_executives:
      (currentPreferences === null || currentPreferences === void 0
        ? void 0
        : currentPreferences.favoriteExecutives) || [],
    favorite_topics:
      (currentPreferences === null || currentPreferences === void 0
        ? void 0
        : currentPreferences.topCategories) || [],
    communication_style: "balanced",
    activity_peak_times: [],
    dashboard_preferences: {},
    last_updated: new Date(),
  };
  // Count strategy risk levels chosen
  var riskLevelCounts = { low: 0, medium: 0, high: 0 };
  // Count executive consultations
  var executiveCounts = {};
  // Count topic interactions
  var topicCounts = {};
  // Track activity times
  var activityHours = new Array(24).fill(0);
  // Track view vs. create/edit behavior to determine communication style
  var viewCount = 0;
  var editCount = 0;
  // Analyze each action
  actions.forEach(function (action) {
    var _a, _b, _c, _d;
    // Track activity time
    var timestamp = new Date(action.timestamp);
    var hour = timestamp.getHours();
    activityHours[hour]++;
    // Track actions by type
    switch (action.category) {
      case "strategy_create":
      case "strategy_update":
        editCount++;
        if (
          (_a = action.metadata) === null || _a === void 0
            ? void 0
            : _a.risk_level
        ) {
          var risk = String(action.metadata.risk_level).toLowerCase();
          if (riskLevelCounts[risk] !== undefined) {
            riskLevelCounts[risk]++;
          }
        }
        break;
      case "strategy_view":
        viewCount++;
        if (
          (_b = action.metadata) === null || _b === void 0 ? void 0 : _b.topic
        ) {
          var topic = String(action.metadata.topic);
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
        break;
      case "bot_consultation":
        if (
          (_c = action.metadata) === null || _c === void 0
            ? void 0
            : _c.executive_id
        ) {
          var executiveId = String(action.metadata.executive_id);
          executiveCounts[executiveId] =
            (executiveCounts[executiveId] || 0) + 1;
        }
        break;
      case "debate_participation":
        if (
          (_d = action.metadata) === null || _d === void 0 ? void 0 : _d.topic
        ) {
          var topic = String(action.metadata.topic);
          topicCounts[topic] = (topicCounts[topic] || 0) + 2; // Weight debates higher
        }
        break;
    }
  });
  // Determine preferred risk appetite
  var totalRiskActions =
    riskLevelCounts.low + riskLevelCounts.medium + riskLevelCounts.high;
  if (totalRiskActions > 0) {
    if (
      riskLevelCounts.high > riskLevelCounts.medium &&
      riskLevelCounts.high > riskLevelCounts.low
    ) {
      preferences.risk_appetite = "high";
    } else if (
      riskLevelCounts.low > riskLevelCounts.medium &&
      riskLevelCounts.low > riskLevelCounts.high
    ) {
      preferences.risk_appetite = "low";
    } else {
      preferences.risk_appetite = "medium";
    }
  }
  // Determine preferred executives
  var preferredExecutives = Object.entries(executiveCounts)
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .slice(0, 3)
    .map(function (entry) {
      return entry[0];
    });
  if (preferredExecutives.length > 0) {
    preferences.preferred_executives = preferredExecutives;
  }
  // Determine favorite topics
  var favoriteTopics = Object.entries(topicCounts)
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .slice(0, 5)
    .map(function (entry) {
      return entry[0];
    });
  if (favoriteTopics.length > 0) {
    preferences.favorite_topics = favoriteTopics;
  }
  // Determine peak activity times
  var activityPeaks = activityHours
    .map(function (count, hour) {
      return { hour: hour, count: count };
    })
    .filter(function (item) {
      return item.count > 0;
    })
    .sort(function (a, b) {
      return b.count - a.count;
    })
    .slice(0, 3)
    .map(function (item) {
      return item.hour;
    });
  if (activityPeaks.length > 0) {
    preferences.activity_peak_times = activityPeaks;
  }
  // Determine communication style preference
  if (viewCount + editCount > 10) {
    // Ensure sufficient data
    var viewRatio = viewCount / (viewCount + editCount);
    if (viewRatio > 0.7) {
      preferences.communication_style = "concise"; // Mostly viewing, less interaction
    } else if (viewRatio < 0.3) {
      preferences.communication_style = "detailed"; // Mostly editing, more hands-on
    } else {
      preferences.communication_style = "balanced";
    }
  }
  return preferences;
};
exports.analyzeUserBehavior = analyzeUserBehavior;
