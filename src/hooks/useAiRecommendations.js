"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAiRecommendations = useAiRecommendations;
var react_1 = require("react");
var executiveBots_1 = require("@/backend/executiveBots");
function useAiRecommendations(
  companyDetails,
  analytics,
  profile,
  riskAppetite,
) {
  var _a = (0, react_1.useState)([]),
    aiRecommendations = _a[0],
    setAiRecommendations = _a[1];
  // Generate AI recommendations based on company profile and analytics
  var generateAiRecommendations = function () {
    var _a;
    var industry =
      (profile === null || profile === void 0 ? void 0 : profile.industry) ||
      "Technology";
    var companySize = companyDetails.companySize || "Small";
    // Get most active consultation topics if available
    var topTopics =
      ((_a =
        analytics === null || analytics === void 0
          ? void 0
          : analytics.consultationAnalytics) === null || _a === void 0
        ? void 0
        : _a.consultationsByTopic) || {};
    var topTopicNames = Object.entries(topTopics)
      .sort(function (a, b) {
        return b[1] - a[1];
      })
      .map(function (entry) {
        return entry[0];
      });
    // Helper function to get a random executive from a specific role
    var getRandomExecutive = function (role) {
      var executives = executiveBots_1.executiveBots[role] || [];
      var randomIndex = Math.floor(Math.random() * executives.length);
      return {
        name: executives[randomIndex] || "AI Assistant",
        role: role,
      };
    };
    // Create data-driven recommendations with executive attribution
    var recommendations = [
      // Elon Musk - Innovation recommendation
      {
        id: "rec-innovation-" + Date.now(), // Add unique ID
        title: "".concat(industry, " Disruptive Innovation"),
        description: "Based on your "
          .concat(
            riskAppetite,
            " risk profile, I recommend exploring cutting-edge ",
          )
          .concat(
            industry.toLowerCase(),
            " innovations with a focused R&D budget to stay ahead of competition.",
          ),
        type: "strategy",
        executiveBot: {
          name: "Elon Musk",
          role: "ceo",
        },
        expectedImpact:
          riskAppetite === "high" ? 85 : riskAppetite === "medium" ? 70 : 55,
        timeframe: "6-12 months",
      },
      // Warren Buffett - Financial recommendation
      {
        id: "rec-financial-" + Date.now(), // Add unique ID
        title:
          riskAppetite === "low"
            ? "Cost Optimization Strategy"
            : "Strategic Investment Plan",
        description:
          riskAppetite === "low"
            ? "I've identified key areas where we can optimize costs without sacrificing quality, potentially improving margins by 15-20%."
            : "I recommend allocating capital to these high-potential growth areas while maintaining sufficient operational reserves.",
        type: "strategy",
        executiveBot: {
          name: "Warren Buffett",
          role: "cfo",
        },
        expectedImpact:
          riskAppetite === "high" ? 75 : riskAppetite === "medium" ? 65 : 80,
        timeframe: "3-6 months",
      },
      // Marketing recommendation
      {
        id: "rec-marketing-" + Date.now(), // Add unique ID
        title: topTopicNames[0]
          ? "".concat(topTopicNames[0], " Campaign")
          : "Targeted LinkedIn Campaign",
        description: topTopicNames[0]
          ? "Your team has been focused on ".concat(
              topTopicNames[0],
              ". I've drafted a comprehensive campaign to maximize results in this area.",
            )
          : "I've drafted a ".concat(
              companySize.toLowerCase(),
              "-business optimized campaign targeting decision-makers in your industry.",
            ),
        type: "campaign",
        executiveBot: getRandomExecutive("marketing"),
        expectedImpact: 72,
        timeframe: "1-3 months",
      },
      // Sales recommendation
      {
        id: "rec-sales-" + Date.now(), // Add unique ID
        title: "Optimized Sales Script",
        description: "I've analyzed successful conversions in the ".concat(
          industry,
          " sector and created a sales script that addresses the top 3 objections prospects typically raise.",
        ),
        type: "call",
        executiveBot: getRandomExecutive("sales_business_development"),
        expectedImpact: 68,
        timeframe: "Immediate",
      },
      // Satya Nadella - Digital transformation recommendation
      {
        id: "rec-digital-" + Date.now(), // Add unique ID
        title: "Digital Workflow Optimization",
        description:
          "Implementing these digital workflow improvements could increase team productivity by up to 30% while reducing operational friction.",
        type: "strategy",
        executiveBot: {
          name: "Satya Nadella",
          role: "cio",
        },
        expectedImpact: 77,
        timeframe: "2-4 months",
      },
    ];
    // Filter recommendations based on risk appetite
    var filteredRecommendations = recommendations;
    if (riskAppetite === "low") {
      // Filter for more conservative recommendations
      filteredRecommendations = recommendations.filter(function (rec) {
        return rec.type !== "high-risk" && rec.expectedImpact < 80;
      });
    } else if (riskAppetite === "high") {
      // Prioritize high-impact recommendations
      filteredRecommendations.sort(function (a, b) {
        return b.expectedImpact - a.expectedImpact;
      });
    }
    // Take top 4 recommendations
    setAiRecommendations(filteredRecommendations.slice(0, 4));
    return filteredRecommendations.slice(0, 4);
  };
  // Remove a recommendation from the list
  var removeRecommendation = function (index) {
    setAiRecommendations(function (prev) {
      var updated = __spreadArray([], prev, true);
      updated.splice(index, 1);
      return updated;
    });
  };
  return {
    aiRecommendations: aiRecommendations,
    generateAiRecommendations: generateAiRecommendations,
    removeRecommendation: removeRecommendation,
  };
}
