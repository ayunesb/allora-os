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
var server_ts_1 = require("https://deno.land/std@0.177.0/http/server.ts");
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
var cors_ts_1 = require("../_shared/cors.ts");
var SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
var SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
var OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
// Helper logging function
var logStep = function (step, details) {
  var detailsStr = details ? " - ".concat(JSON.stringify(details)) : "";
  console.log("[GENERATE-AI-CONTENT] ".concat(step).concat(detailsStr));
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      userId,
      companyId,
      industry,
      riskAppetite,
      companyName,
      companyDetails,
      supabaseAdmin,
      authHeader,
      supabaseClient,
      strategies,
      _i,
      strategies_1,
      strategy,
      strategyError,
      campaigns,
      _b,
      campaigns_1,
      campaign,
      campaignError,
      debate,
      debateError,
      scripts,
      _c,
      scripts_1,
      script,
      scriptError,
      error_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          // Handle CORS preflight request
          if (req.method === "OPTIONS") {
            return [
              2 /*return*/,
              new Response(null, { headers: cors_ts_1.corsHeaders }),
            ];
          }
          _d.label = 1;
        case 1:
          _d.trys.push([1, 22, , 23]);
          logStep("Function started");
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _d.sent()),
            (userId = _a.userId),
            (companyId = _a.companyId),
            (industry = _a.industry),
            (riskAppetite = _a.riskAppetite),
            (companyName = _a.companyName),
            (companyDetails = _a.companyDetails);
          if (!userId || !companyId) {
            throw new Error("User ID and Company ID are required");
          }
          logStep("Request parameters", {
            userId: userId,
            companyId: companyId,
            industry: industry,
            riskAppetite: riskAppetite,
          });
          supabaseAdmin = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY,
            {
              auth: { persistSession: false },
            },
          );
          authHeader = req.headers.get("Authorization");
          supabaseClient = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_ANON_KEY,
            {
              auth: { persistSession: false },
              global: { headers: { Authorization: authHeader || "" } },
            },
          );
          return [
            4 /*yield*/,
            generateStrategies(
              industry,
              riskAppetite,
              companyName,
              companyDetails,
            ),
          ];
        case 3:
          strategies = _d.sent();
          logStep("Strategies generated", { count: strategies.length });
          (_i = 0), (strategies_1 = strategies);
          _d.label = 4;
        case 4:
          if (!(_i < strategies_1.length)) return [3 /*break*/, 7];
          strategy = strategies_1[_i];
          return [
            4 /*yield*/,
            supabaseAdmin.from("strategies").insert({
              title: strategy.title,
              description: strategy.description,
              company_id: companyId,
              created_by: userId,
              executive_bot: strategy.executive,
              risk_level: strategy.riskLevel,
              implementation_steps: strategy.implementationSteps,
              estimated_cost: strategy.estimatedCost,
              estimated_time: strategy.estimatedTime,
              required_resources: strategy.requiredResources,
              expected_outcome: strategy.expectedOutcome,
              potential_risks: strategy.potentialRisks,
              status: "pending",
            }),
          ];
        case 5:
          strategyError = _d.sent().error;
          if (strategyError) {
            logStep("Error inserting strategy", strategyError);
          }
          _d.label = 6;
        case 6:
          _i++;
          return [3 /*break*/, 4];
        case 7:
          return [
            4 /*yield*/,
            generateCampaigns(industry, companyName, companyDetails),
          ];
        case 8:
          campaigns = _d.sent();
          logStep("Campaigns generated", { count: campaigns.length });
          (_b = 0), (campaigns_1 = campaigns);
          _d.label = 9;
        case 9:
          if (!(_b < campaigns_1.length)) return [3 /*break*/, 12];
          campaign = campaigns_1[_b];
          return [
            4 /*yield*/,
            supabaseAdmin.from("campaigns").insert({
              name: campaign.name,
              description: campaign.description,
              company_id: companyId,
              created_by: userId,
              executive_bot: campaign.executive,
              platform: campaign.platform,
              target_audience: campaign.targetAudience,
              budget: campaign.budget,
              duration: campaign.duration,
              expected_outcome: campaign.expectedOutcome,
              status: "pending",
            }),
          ];
        case 10:
          campaignError = _d.sent().error;
          if (campaignError) {
            logStep("Error inserting campaign", campaignError);
          }
          _d.label = 11;
        case 11:
          _b++;
          return [3 /*break*/, 9];
        case 12:
          return [
            4 /*yield*/,
            generateAIDebate(
              industry,
              riskAppetite,
              companyName,
              companyDetails,
            ),
          ];
        case 13:
          debate = _d.sent();
          logStep("AI debate generated");
          return [
            4 /*yield*/,
            supabaseAdmin.from("ai_debates").insert({
              title: debate.title,
              context: debate.context,
              company_id: companyId,
              created_by: userId,
              participants: debate.participants,
              transcript: debate.transcript,
              conclusion: debate.conclusion,
              recommendation: debate.recommendation,
            }),
          ];
        case 14:
          debateError = _d.sent().error;
          if (debateError) {
            logStep("Error inserting AI debate", debateError);
          }
          return [
            4 /*yield*/,
            generateCallScripts(industry, companyName, companyDetails),
          ];
        case 15:
          scripts = _d.sent();
          logStep("Call scripts generated", { count: scripts.length });
          (_c = 0), (scripts_1 = scripts);
          _d.label = 16;
        case 16:
          if (!(_c < scripts_1.length)) return [3 /*break*/, 19];
          script = scripts_1[_c];
          return [
            4 /*yield*/,
            supabaseAdmin.from("call_scripts").insert({
              title: script.title,
              script_text: script.scriptText,
              company_id: companyId,
              created_by: userId,
              executive_bot: script.executive,
              target_audience: script.targetAudience,
              purpose: script.purpose,
              estimated_duration: script.estimatedDuration,
              key_points: script.keyPoints,
              objection_handling: script.objectionHandling,
            }),
          ];
        case 17:
          scriptError = _d.sent().error;
          if (scriptError) {
            logStep("Error inserting call script", scriptError);
          }
          _d.label = 18;
        case 18:
          _c++;
          return [3 /*break*/, 16];
        case 19:
          // Update user profile to indicate onboarding is complete
          return [
            4 /*yield*/,
            supabaseAdmin
              .from("profiles")
              .update({
                onboarding_completed: true,
                onboarded_at: new Date().toISOString(),
              })
              .eq("id", userId),
          ];
        case 20:
          // Update user profile to indicate onboarding is complete
          _d.sent();
          // Record API usage
          return [
            4 /*yield*/,
            recordApiUsage(supabaseAdmin, companyId, {
              strategyGenerations: strategies.length,
              campaignGenerations: campaigns.length,
              scriptGenerations: scripts.length,
              aiDebateRuns: 1,
              openAiTokensUsed: 2000, // Estimated token usage
            }),
          ];
        case 21:
          // Record API usage
          _d.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                data: {
                  strategies: strategies.length,
                  campaigns: campaigns.length,
                  scripts: scripts.length,
                  debate: debate.title,
                },
              }),
              {
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 22:
          error_1 = _d.sent();
          logStep("Error in function", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ success: false, error: error_1.message }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 23:
          return [2 /*return*/];
      }
    });
  });
});
// Record API usage
function recordApiUsage(supabase, companyId, usage) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, usageData, fetchError, newUsage, upsertError, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [
            4 /*yield*/,
            supabase
              .from("api_usage")
              .select("*")
              .eq("company_id", companyId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (usageData = _a.data), (fetchError = _a.error);
          if (fetchError && fetchError.code !== "PGRST116") {
            logStep("Error fetching API usage", fetchError);
            return [2 /*return*/];
          }
          newUsage = usageData || {
            company_id: companyId,
            total_api_calls: 0,
            openai_tokens_used: 0,
            strategy_generations: 0,
            campaign_generations: 0,
            script_generations: 0,
            ai_debate_runs: 0,
          };
          // Update usage
          newUsage.total_api_calls = (newUsage.total_api_calls || 0) + 1;
          newUsage.openai_tokens_used =
            (newUsage.openai_tokens_used || 0) + (usage.openAiTokensUsed || 0);
          newUsage.strategy_generations =
            (newUsage.strategy_generations || 0) +
            (usage.strategyGenerations || 0);
          newUsage.campaign_generations =
            (newUsage.campaign_generations || 0) +
            (usage.campaignGenerations || 0);
          newUsage.script_generations =
            (newUsage.script_generations || 0) + (usage.scriptGenerations || 0);
          newUsage.ai_debate_runs =
            (newUsage.ai_debate_runs || 0) + (usage.aiDebateRuns || 0);
          return [4 /*yield*/, supabase.from("api_usage").upsert(newUsage)];
        case 2:
          upsertError = _b.sent().error;
          if (upsertError) {
            logStep("Error updating API usage", upsertError);
          }
          return [3 /*break*/, 4];
        case 3:
          error_2 = _b.sent();
          logStep("Error recording API usage", error_2);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// AI content generation functions
function generateStrategies(
  industry,
  riskAppetite,
  companyName,
  companyDetails,
) {
  return __awaiter(this, void 0, void 0, function () {
    var strategies;
    return __generator(this, function (_a) {
      strategies = [
        {
          title: "".concat(industry, " Growth Strategy: Market Expansion"),
          description: "A comprehensive strategy to expand "
            .concat(companyName, "'s market share in the ")
            .concat(
              industry,
              " sector, focusing on geographic expansion and customer acquisition.",
            ),
          executive: "Elon Musk",
          riskLevel: riskAppetite === "high" ? "high" : "medium",
          implementationSteps: [
            "Market research",
            "Identify target regions",
            "Develop expansion plan",
            "Execute marketing campaign",
            "Measure results",
          ],
          estimatedCost: "$5,000 - $15,000",
          estimatedTime: "3-6 months",
          requiredResources: [
            "Marketing team",
            "Market research tools",
            "Budget for campaign",
            "Sales representatives",
          ],
          expectedOutcome:
            "20-30% increase in customer base within target regions",
          potentialRisks: [
            "Market saturation",
            "Competitive response",
            "Higher than expected costs",
          ],
        },
        {
          title: "Operational Efficiency Improvement for ".concat(companyName),
          description:
            "A strategy to optimize internal processes and reduce operational costs while maintaining or improving service quality.",
          executive: "Warren Buffett",
          riskLevel: "low",
          implementationSteps: [
            "Process audit",
            "Identify inefficiencies",
            "Develop improvement plan",
            "Implement changes",
            "Measure results",
          ],
          estimatedCost: "$2,000 - $5,000",
          estimatedTime: "2-4 months",
          requiredResources: [
            "Operations team",
            "Process documentation",
            "Potential software tools",
            "Training resources",
          ],
          expectedOutcome: "15-25% reduction in operational costs",
          potentialRisks: [
            "Employee resistance",
            "Initial productivity dip",
            "Process disruption",
          ],
        },
        {
          title:
            riskAppetite === "high"
              ? "Disruptive Innovation Initiative"
              : "Incremental Product Improvement",
          description:
            riskAppetite === "high"
              ? "A bold strategy to create disruptive innovation in the "
                  .concat(industry, " sector, positioning ")
                  .concat(companyName, " as a thought leader.")
              : "A measured approach to improving existing products/services based on customer feedback and market trends.",
          executive: riskAppetite === "high" ? "Elon Musk" : "Warren Buffett",
          riskLevel: riskAppetite,
          implementationSteps:
            riskAppetite === "high"
              ? [
                  "Innovation workshop",
                  "Identify disruption opportunities",
                  "Prototype development",
                  "Market testing",
                  "Full launch",
                ]
              : [
                  "Customer feedback analysis",
                  "Identify improvement areas",
                  "Develop enhancements",
                  "Test improvements",
                  "Roll out changes",
                ],
          estimatedCost:
            riskAppetite === "high" ? "$15,000 - $50,000" : "$5,000 - $10,000",
          estimatedTime: riskAppetite === "high" ? "6-12 months" : "2-4 months",
          requiredResources: [
            "R&D team",
            "Development resources",
            "Market testing group",
            "Marketing materials",
          ],
          expectedOutcome:
            riskAppetite === "high"
              ? "Potential for 50-100% growth in new market segments"
              : "10-20% improvement in customer satisfaction and retention",
          potentialRisks:
            riskAppetite === "high"
              ? [
                  "High failure rate",
                  "Significant investment risk",
                  "Market rejection",
                ]
              : [
                  "Limited impact",
                  "Competitor matching",
                  "Implementation challenges",
                ],
        },
      ];
      return [2 /*return*/, strategies];
    });
  });
}
function generateCampaigns(industry, companyName, companyDetails) {
  return __awaiter(this, void 0, void 0, function () {
    var campaigns;
    return __generator(this, function (_a) {
      campaigns = [
        {
          name: "".concat(industry, " Awareness Campaign"),
          description:
            "A targeted social media campaign to increase brand awareness for "
              .concat(companyName, " in the ")
              .concat(industry, " sector."),
          executive: "Antonio Lucio",
          platform: "Social Media",
          targetAudience: "Industry professionals and decision-makers",
          budget: 2500,
          duration: "30 days",
          expectedOutcome:
            "25-30% increase in brand recognition, 15% increase in website traffic",
        },
        {
          name: "Lead Generation Webinar Series",
          description: "A series of educational webinars positioning "
            .concat(companyName, " as an authority in ")
            .concat(industry, " while generating qualified leads."),
          executive: "Antonio Lucio",
          platform: "Webinar",
          targetAudience: "Potential customers and industry stakeholders",
          budget: 1500,
          duration: "3 months (one webinar per month)",
          expectedOutcome:
            "100-150 new leads, 10-15 direct sales opportunities",
        },
        {
          name: "Customer Success Story Campaign",
          description: "Highlighting real success stories from ".concat(
            companyName,
            "'s customers to build credibility and showcase results.",
          ),
          executive: "Antonio Lucio",
          platform: "Multi-channel",
          targetAudience:
            "Prospective customers similar to featured case studies",
          budget: 2000,
          duration: "45 days",
          expectedOutcome:
            "20% increase in conversion rate for similar prospects",
        },
      ];
      return [2 /*return*/, campaigns];
    });
  });
}
function generateCallScripts(industry, companyName, companyDetails) {
  return __awaiter(this, void 0, void 0, function () {
    var scripts;
    return __generator(this, function (_a) {
      scripts = [
        {
          title: "Initial Prospect Outreach Script",
          scriptText: "Hello [Prospect Name], this is [Your Name] from "
            .concat(companyName, ". We help companies in the ")
            .concat(
              industry,
              " sector [brief value proposition]. Many of our clients have been facing challenges with [common industry pain point]. Is that something your team has experienced as well?\n\n[Wait for response]\n\nI'd love to share how we've helped similar organizations overcome these challenges. Would you be open to a brief 15-minute call next week to discuss how we might be able to help?\n\n[Schedule call or handle objection]",
            ),
          executive: "Mike Weinberg",
          targetAudience: "Cold prospects in target market",
          purpose: "Initial outreach to schedule discovery call",
          estimatedDuration: "2-3 minutes",
          keyPoints: [
            "Establish connection to industry",
            "Reference common pain point",
            "Request brief follow-up call",
            "Be respectful of time",
          ],
          objectionHandling: {
            "No time":
              "I completely understand. When would be a better time for us to connect? I promise to be brief and focused on value.",
            "Not interested":
              "I appreciate your candor. May I ask what solutions you're currently using for [pain point]?",
            "Already have a solution":
              "That's great to hear. Many of our current clients came to us when looking to optimize their existing solution. What aspects of your current setup work well for you?",
          },
        },
        {
          title: "Follow-up Call After Website Visit",
          scriptText: "Hello [Prospect Name], this is [Your Name] from "
            .concat(
              companyName,
              ". I noticed you recently visited our website and checked out our [specific solution] page. I thought I'd reach out to see if you had any questions I could answer about how we help companies in the ",
            )
            .concat(
              industry,
              " space.\n\n[Wait for response]\n\nCould you share a bit about what challenges you're looking to solve? This would help me understand if and how we might be able to assist.\n\n[Based on response, share relevant case study or specific benefits]",
            ),
          executive: "Trish Bertuzzi",
          targetAudience: "Warm leads who visited website",
          purpose: "Convert website visitor to sales conversation",
          estimatedDuration: "5-7 minutes",
          keyPoints: [
            "Reference website visit",
            "Ask open-ended questions",
            "Listen more than talk",
            "Provide relevant proof points",
          ],
          objectionHandling: {
            "Just researching":
              "Research is an important step. Which specific aspects of [solution] are you most interested in learning about?",
            "Too expensive":
              "I understand budget is a consideration. Many of our clients found that while the initial investment seemed significant, the ROI was achieved within [timeframe]. Would it be valuable to walk through a typical ROI calculation for a company like yours?",
          },
        },
      ];
      return [2 /*return*/, scripts];
    });
  });
}
function generateAIDebate(industry, riskAppetite, companyName, companyDetails) {
  return __awaiter(this, void 0, void 0, function () {
    var debate;
    return __generator(this, function (_a) {
      debate = {
        title: "Strategic Direction Debate: Growth Strategies for ".concat(
          companyName,
        ),
        context: "This debate explores the best strategic approaches for "
          .concat(companyName, ", a ")
          .concat(companyDetails.size, " company in the ")
          .concat(industry, " industry with a ")
          .concat(riskAppetite, " risk appetite."),
        participants: [
          {
            name: "Elon Musk",
            role: "Innovation Advocate",
            perspective: "Disruptive innovation and bold moves",
          },
          {
            name: "Warren Buffett",
            role: "Financial Strategist",
            perspective: "Sustainable growth and capital preservation",
          },
          {
            name: "Antonio Lucio",
            role: "Marketing Expert",
            perspective: "Brand-building and market perception",
          },
        ],
        transcript: [
          {
            speaker: "Elon Musk",
            text: ""
              .concat(companyName, " has an opportunity to disrupt the ")
              .concat(
                industry,
                " market completely. I recommend investing heavily in cutting-edge technology and taking bold risks to establish a dominant position. The companies that make big bets will own the future.",
              ),
          },
          {
            speaker: "Warren Buffett",
            text: "I disagree with that approach. ".concat(
              companyName,
              " should focus on sustainable growth through capital efficiency and excellent execution. Build a moat around your core business first. Risk management is essential, especially considering the company's current size and resources.",
            ),
          },
          {
            speaker: "Antonio Lucio",
            text: "Both perspectives have merit, but we also need to consider brand positioning. "
              .concat(
                companyName,
                " should identify where it can authentically stand out in the ",
              )
              .concat(
                industry,
                " and build a compelling brand narrative around that. Marketing isn't just promotion; it's about finding the unique value proposition.",
              ),
          },
          {
            speaker: "Warren Buffett",
            text: "I agree that differentiation is important, but it should be built on a foundation of financial discipline. Too many companies chase growth at the expense of profitability and end up in trouble. ".concat(
              companyName,
              " should invest in opportunities with clear return metrics.",
            ),
          },
          {
            speaker: "Elon Musk",
            text: "The problem with overly cautious approaches is that they leave you vulnerable to disruption. In today's "
              .concat(
                industry,
                " landscape, if you're not moving forward aggressively, you're moving backward. ",
              )
              .concat(
                companyName,
                " needs to be willing to cannibalize its own business before someone else does.",
              ),
          },
          {
            speaker: "Antonio Lucio",
            text: "What if we strike a balance? ".concat(
              companyName,
              ' could allocate 70% of resources to strengthening and growing the core business with Warren\'s disciplined approach, 20% to adjacent opportunities with moderate risk, and 10% to the truly disruptive "moonshots" that Elon advocates.',
            ),
          },
        ],
        conclusion: "After a spirited debate, the executives agreed that "
          .concat(
            companyName,
            " should adopt a portfolio approach to growth strategies, with the specific allocation of resources dependent on the company's risk appetite. For a company with ",
          )
          .concat(
            riskAppetite,
            " risk appetite, the recommendation leans toward ",
          )
          .concat(
            riskAppetite === "high"
              ? "more aggressive innovation and market disruption"
              : riskAppetite === "medium"
                ? "a balanced approach with calculated risks"
                : "a more conservative strategy with emphasis on sustainable growth",
            ".",
          ),
        recommendation:
          riskAppetite === "high"
            ? "Invest heavily in innovation and market disruption while maintaining financial discipline; pursue opportunities to redefine the ".concat(
                industry,
                " space.",
              )
            : riskAppetite === "medium"
              ? "Balance growth initiatives with risk management; allocate resources across a portfolio of opportunities with varying risk-reward profiles."
              : "Focus on optimizing core operations and making incremental improvements; prioritize capital efficiency and sustainable growth over rapid expansion.",
      };
      return [2 /*return*/, debate];
    });
  });
}
