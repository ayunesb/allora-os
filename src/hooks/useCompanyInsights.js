"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompanyInsights = useCompanyInsights;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var executiveBots_1 = require("@/backend/executiveBots");
function useCompanyInsights() {
  var _this = this;
  var _a = (0, AuthContext_1.useAuth)(),
    profile = _a.profile,
    user = _a.user;
  var _b = (0, react_1.useState)([]),
    insights = _b[0],
    setInsights = _b[1];
  var _c = (0, react_1.useState)({}),
    detailedInsights = _c[0],
    setDetailedInsights = _c[1];
  var _d = (0, react_1.useState)(true),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var _e = (0, react_1.useState)(null),
    error = _e[0],
    setError = _e[1];
  (0, react_1.useEffect)(
    function () {
      // Only generate insights when we have a profile with company info
      if (!profile || !(user === null || user === void 0 ? void 0 : user.id)) {
        setIsLoading(false);
        return;
      }
      var generateInsights = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var hasCompanyInfo,
            companyName,
            industry,
            companyGoals,
            riskAppetite,
            newInsights,
            detailedInsightsMap,
            err_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, 3, 4]);
                setIsLoading(true);
                setError(null);
                hasCompanyInfo = Boolean(profile.company);
                if (!hasCompanyInfo) {
                  setInsights([]);
                  setIsLoading(false);
                  return [2 /*return*/];
                }
                companyName = profile.company || "Your Company";
                industry = profile.industry || "Technology";
                companyGoals = profile.goals || [];
                riskAppetite = profile.risk_appetite || "Medium";
                newInsights = generateCompanySpecificInsights(
                  companyName,
                  industry,
                  companyGoals,
                  riskAppetite,
                );
                detailedInsightsMap = generateDetailedInsightData(
                  newInsights,
                  companyName,
                  industry,
                  companyGoals,
                  riskAppetite,
                );
                // Wait for a brief moment to simulate API call
                return [
                  4 /*yield*/,
                  new Promise(function (resolve) {
                    return setTimeout(resolve, 600);
                  }),
                ];
              case 1:
                // Wait for a brief moment to simulate API call
                _a.sent();
                setInsights(newInsights);
                setDetailedInsights(detailedInsightsMap);
                return [3 /*break*/, 4];
              case 2:
                err_1 = _a.sent();
                console.error("Error generating insights:", err_1);
                setError(
                  err_1.message || "Failed to generate company insights",
                );
                sonner_1.toast.error("Failed to generate insights");
                return [3 /*break*/, 4];
              case 3:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      generateInsights();
    },
    [profile, user === null || user === void 0 ? void 0 : user.id],
  );
  var getDetailedInsight = function (insightId) {
    return detailedInsights[insightId] || null;
  };
  return {
    insights: insights,
    isLoading: isLoading,
    error: error,
    getDetailedInsight: getDetailedInsight,
  };
}
// Helper function to generate insights based on company data
function generateCompanySpecificInsights(
  companyName,
  industry,
  goals,
  riskAppetite,
) {
  if (goals === void 0) {
    goals = [];
  }
  if (riskAppetite === void 0) {
    riskAppetite = "Medium";
  }
  // Generate a unique ID based on company name to ensure consistency
  var generateId = function (prefix) {
    return ""
      .concat(prefix, "-")
      .concat(companyName.toLowerCase().replace(/\s+/g, "-"));
  };
  // Get the current date
  var now = new Date();
  // Select appropriate bots for each insight type
  var strategyBots = getBotsForRole("strategy", "ceo", "cmo");
  var campaignBots = getBotsForRole(
    "marketing",
    "sales_business_development",
    "cmo",
  );
  var callScriptBots = getBotsForRole(
    "lead_qualification",
    "sales_business_development",
    "cold_calling",
  );
  // Generate strategy title based on industry and goals
  var strategyTitle = goals.includes("growth")
    ? "".concat(industry, " Market Expansion Strategy for ").concat(companyName)
    : goals.includes("innovation")
      ? "Disruptive Innovation Blueprint for "
          .concat(companyName, " in ")
          .concat(industry)
      : "Strategic Growth Plan for "
          .concat(companyName, " in ")
          .concat(industry);
  // Generate campaign title based on industry
  var campaignTitle = goals.includes("revenue")
    ? "High-ROI ".concat(industry, " Targeted LinkedIn Campaign")
    : goals.includes("acquisition")
      ? "Customer Acquisition Campaign for ".concat(companyName)
      : "Q3 ".concat(industry, " Market Penetration Campaign");
  // Generate call script title based on goals
  var callScriptTitle = goals.includes("enterprise")
    ? "Enterprise Solution Pitch for ".concat(industry, " Clients")
    : "Value Proposition Script for "
        .concat(companyName, " in ")
        .concat(industry);
  return [
    // Strategy insight
    {
      id: generateId("strategy"),
      title: strategyTitle,
      description: "A comprehensive growth strategy tailored for "
        .concat(companyName, " in the ")
        .concat(industry, " sector, focusing on ")
        .concat(
          goals.includes("growth")
            ? "market penetration"
            : goals.includes("innovation")
              ? "disruptive innovation"
              : "competitive positioning",
          ". Risk profile: ",
        )
        .concat(riskAppetite, "."),
      type: "strategy",
      primaryBot: strategyBots.primary,
      collaborators: strategyBots.collaborators,
      createdAt: new Date(
        now.setDate(now.getDate() - Math.floor(Math.random() * 5)),
      ),
    },
    // Campaign insight
    {
      id: generateId("campaign"),
      title: campaignTitle,
      description: "Proposal for a high-ROI "
        .concat(
          goals.includes("revenue")
            ? "revenue-focused"
            : goals.includes("acquisition")
              ? "customer acquisition"
              : "brand awareness",
          " campaign targeting decision-makers in the ",
        )
        .concat(
          industry,
          " space with personalized messaging and content strategy.",
        ),
      type: "campaign",
      primaryBot: campaignBots.primary,
      collaborators: campaignBots.collaborators,
      createdAt: new Date(
        now.setDate(now.getDate() - Math.floor(Math.random() * 3)),
      ),
    },
    // Call script insight
    {
      id: generateId("call_script"),
      title: callScriptTitle,
      description: "High-conversion call script designed to communicate "
        .concat(companyName, "'s value proposition to ")
        .concat(
          goals.includes("enterprise")
            ? "enterprise-level"
            : goals.includes("startup")
              ? "startup"
              : "mid-market",
          " prospects in the ",
        )
        .concat(industry, " industry."),
      type: "call_script",
      primaryBot: callScriptBots.primary,
      collaborators: callScriptBots.collaborators,
      createdAt: new Date(),
    },
  ];
}
// Generate detailed insight data for each insight
function generateDetailedInsightData(
  insights,
  companyName,
  industry,
  goals,
  riskAppetite,
) {
  if (goals === void 0) {
    goals = [];
  }
  if (riskAppetite === void 0) {
    riskAppetite = "Medium";
  }
  var detailedInsights = {};
  insights.forEach(function (insight) {
    var keyPoints = [];
    var reasoning = "";
    var executiveSummary = "";
    var contributors = [];
    // Generate content based on insight type
    if (insight.type === "strategy") {
      keyPoints = [
        ""
          .concat(
            riskAppetite === "High"
              ? "Aggressive"
              : riskAppetite === "Low"
                ? "Conservative"
                : "Balanced",
            " expansion into new ",
          )
          .concat(industry, " market segments"),
        "Focus on ".concat(
          goals.includes("innovation")
            ? "product innovation"
            : goals.includes("revenue")
              ? "revenue optimization"
              : "customer retention",
        ),
        "".concat(
          riskAppetite === "High"
            ? "Fast-tracked"
            : riskAppetite === "Low"
              ? "Phased"
              : "Strategic",
          " implementation timeline",
        ),
        "".concat(
          goals.includes("partnerships")
            ? "Strategic partnerships"
            : "Organic growth",
          " as primary growth driver",
        ),
      ];
      reasoning = "This strategy was developed with a primary focus on "
        .concat(companyName, "'s stated goal of ")
        .concat(goals.length > 0 ? goals[0] : "growth", " within the ")
        .concat(industry, " sector. Given the ")
        .concat(
          riskAppetite.toLowerCase(),
          " risk appetite, we've prioritized ",
        )
        .concat(
          riskAppetite === "High"
            ? "bold, high-reward initiatives that could disrupt the market"
            : riskAppetite === "Low"
              ? "stable, proven approaches that minimize downside risk"
              : "a balanced approach that combines innovation with measured execution",
          ".",
        );
      executiveSummary = "A "
        .concat(riskAppetite.toLowerCase(), "-risk strategy focused on ")
        .concat(
          goals.length > 0 ? goals.join(" and ") : "growth and innovation",
          " within the ",
        )
        .concat(industry, " space, designed to position ")
        .concat(companyName, " for sustainable competitive advantage.");
      // Add strategy-specific contributors
      contributors = [
        {
          name: insight.primaryBot.name,
          role: insight.primaryBot.role,
          contribution:
            "Led the overall strategy development and framework design",
          opinion: "positive",
        },
        {
          name: "Warren Buffett",
          role: "cfo",
          contribution: "Provided financial viability analysis and ".concat(
            riskAppetite.toLowerCase(),
            "-risk investment approach",
          ),
          opinion: "neutral",
        },
        {
          name: "Reed Hastings",
          role: "strategy",
          contribution:
            "Contributed disruptive market entry tactics for the ".concat(
              industry,
              " sector",
            ),
          opinion: riskAppetite === "High" ? "positive" : "neutral",
        },
        {
          name: "Satya Nadella",
          role: "ceo",
          contribution:
            "Advised on technology integration and digital transformation elements",
          opinion: "positive",
        },
      ];
    } else if (insight.type === "campaign") {
      keyPoints = [
        "Target audience: "
          .concat(
            goals.includes("enterprise")
              ? "Enterprise decision-makers"
              : "Mid-market business leaders",
            " in ",
          )
          .concat(industry),
        "Primary platform: ".concat(
          goals.includes("revenue")
            ? "LinkedIn & Email"
            : "Social media & Content marketing",
        ),
        "Budget efficiency: High ROI focus with performance-based scaling",
        "Duration: 90-day initial campaign with built-in optimization cycles",
      ];
      reasoning = "This campaign was designed to align with "
        .concat(companyName, "'s ")
        .concat(
          goals.length > 0 ? goals.join(" and ") : "growth",
          " objectives. The channel selection prioritizes ",
        )
        .concat(
          goals.includes("revenue")
            ? "direct response and lead generation"
            : goals.includes("brand")
              ? "brand awareness and thought leadership"
              : "engagement and conversion optimization",
          " based on industry benchmarks for ",
        )
        .concat(industry, " companies.");
      executiveSummary =
        "A targeted multi-channel campaign designed to generate qualified leads and accelerate "
          .concat(companyName, "'s penetration in the ")
          .concat(industry, " market.");
      // Add campaign-specific contributors
      contributors = [
        {
          name: insight.primaryBot.name,
          role: insight.primaryBot.role,
          contribution: "Developed the campaign concept and messaging strategy",
          opinion: "positive",
        },
        {
          name: "Antonio Lucio",
          role: "cmo",
          contribution: "Refined the brand positioning and narrative approach",
          opinion: "positive",
        },
        {
          name: "Gary Vaynerchuk",
          role: "marketing",
          contribution: "Added creative content distribution tactics",
          opinion: "positive",
        },
        {
          name: "Howard Schultz",
          role: "sales_business_development",
          contribution: "Provided input on customer experience touchpoints",
          opinion: "neutral",
        },
      ];
    } else if (insight.type === "call_script") {
      keyPoints = [
        "Opening: Problem-centered approach that resonates with ".concat(
          industry,
          " challenges",
        ),
        "Value proposition: Focus on ".concat(
          goals.includes("revenue")
            ? "ROI and revenue impact"
            : "operational efficiency",
        ),
        "Objection handling: Prepared responses for common ".concat(
          industry,
          " hesitations",
        ),
        "Call-to-action: Low-friction next steps with clear value offer",
      ];
      reasoning =
        "This call script was crafted using proven sales methodologies from top sales experts, with specific adaptations for the "
          .concat(industry, " sector. The script emphasizes ")
          .concat(
            goals.includes("enterprise")
              ? "enterprise value drivers"
              : goals.includes("startup")
                ? "agility and growth potential"
                : "competitive differentiation",
            " while addressing common objections in this market segment.",
          );
      executiveSummary = "A conversion-focused call script that positions "
        .concat(companyName, "'s solutions as the ideal answer to key ")
        .concat(industry, " pain points.");
      // Add call script-specific contributors
      contributors = [
        {
          name: insight.primaryBot.name,
          role: insight.primaryBot.role,
          contribution: "Architected the call flow and questioning methodology",
          opinion: "positive",
        },
        {
          name: "Trish Bertuzzi",
          role: "lead_qualification",
          contribution:
            "Provided expertise on prospect qualification techniques",
          opinion: "positive",
        },
        {
          name: "Mike Weinberg",
          role: "sales_business_development",
          contribution: "Added powerful value proposition framing",
          opinion: "positive",
        },
        {
          name: "Jill Konrath",
          role: "cold_calling",
          contribution: "Refined the opening to increase engagement rate",
          opinion: "neutral",
        },
      ];
    }
    // Store the detailed insight
    detailedInsights[insight.id] = __assign(__assign({}, insight), {
      keyPoints: keyPoints,
      reasoning: reasoning,
      executiveSummary: executiveSummary,
      contributors: contributors,
    });
  });
  return detailedInsights;
}
// Helper to get primary bot and collaborators for a specific insight type
function getBotsForRole() {
  var _a;
  var roles = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    roles[_i] = arguments[_i];
  }
  // Select primary bot from first role
  var primaryRole = roles[0];
  var primaryBotName =
    ((_a = executiveBots_1.executiveBots[primaryRole]) === null || _a === void 0
      ? void 0
      : _a[0]) || "AI Assistant";
  var primary = {
    name: primaryBotName,
    role: primaryRole,
    avatar: "/avatars/".concat(
      primaryBotName.toLowerCase().replace(/\s+/g, "-"),
      ".png",
    ),
  };
  // Create collaborators from other roles
  var collaborators = roles.slice(1).map(function (role) {
    var botNames = executiveBots_1.executiveBots[role] || [];
    var botName = botNames[0] || "AI Assistant";
    var contributions = {
      strategy: "Strategic analysis",
      ceo: "Executive oversight",
      coo: "Operational planning",
      cfo: "Financial analysis",
      cmo: "Marketing strategy",
      marketing: "Marketing optimization",
      sales_business_development: "Sales approach",
      lead_qualification: "Lead qualification",
      cold_calling: "Cold calling techniques",
    };
    return {
      name: botName,
      role: role,
      contribution: contributions[role] || "Advisory support",
    };
  });
  return { primary: primary, collaborators: collaborators };
}
