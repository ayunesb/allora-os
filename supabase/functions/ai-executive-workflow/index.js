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
// deno-lint-ignore-file no-explicit-any
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
var supabase_js_2_36_0_1 = require("https://esm.sh/@supabase/supabase-js@2.36.0");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
// Main function to handle requests
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabaseUrl,
      supabaseKey,
      supabase,
      OPENAI_API_KEY,
      _a,
      action,
      companyProfile,
      strategies,
      _b,
      error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _c.label = 1;
        case 1:
          _c.trys.push([1, 17, , 18]);
          supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
          supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
          supabase = (0, supabase_js_2_36_0_1.createClient)(
            supabaseUrl,
            supabaseKey,
          );
          OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
          if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not set");
          }
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _c.sent()),
            (action = _a.action),
            (companyProfile = _a.companyProfile),
            (strategies = _a.strategies);
          _b = action;
          switch (_b) {
            case "generate_strategies":
              return [3 /*break*/, 3];
            case "generate_campaigns":
              return [3 /*break*/, 5];
            case "generate_scripts":
              return [3 /*break*/, 7];
            case "simulate_debate":
              return [3 /*break*/, 9];
            case "generate_all":
              return [3 /*break*/, 11];
            case "refresh_strategies":
              return [3 /*break*/, 13];
          }
          return [3 /*break*/, 15];
        case 3:
          return [
            4 /*yield*/,
            generateStrategies(companyProfile, OPENAI_API_KEY),
          ];
        case 4:
          return [2 /*return*/, _c.sent()];
        case 5:
          return [
            4 /*yield*/,
            generateCampaigns(companyProfile, OPENAI_API_KEY),
          ];
        case 6:
          return [2 /*return*/, _c.sent()];
        case 7:
          return [4 /*yield*/, generateScripts(companyProfile, OPENAI_API_KEY)];
        case 8:
          return [2 /*return*/, _c.sent()];
        case 9:
          return [
            4 /*yield*/,
            simulateDebate(companyProfile, strategies || [], OPENAI_API_KEY),
          ];
        case 10:
          return [2 /*return*/, _c.sent()];
        case 11:
          return [
            4 /*yield*/,
            generateAllContent(companyProfile, OPENAI_API_KEY),
          ];
        case 12:
          return [2 /*return*/, _c.sent()];
        case 13:
          return [
            4 /*yield*/,
            refreshStrategies(companyProfile, OPENAI_API_KEY),
          ];
        case 14:
          return [2 /*return*/, _c.sent()];
        case 15:
          throw new Error("Unknown action: ".concat(action));
        case 16:
          return [3 /*break*/, 18];
        case 17:
          error_1 = _c.sent();
          console.error("Error in ai-executive-workflow function:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: error_1.message,
                success: false,
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 18:
          return [2 /*return*/];
      }
    });
  });
});
// Generate business strategies based on company profile
function generateStrategies(companyProfile, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    var prompt, response, strategies;
    var _a, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          prompt =
            "\n    You are a team of executive-level business advisors tasked with generating strategic business recommendations.\n    \n    Company Details:\n    - Name: "
              .concat(
                companyProfile.companyName || "Unknown",
                "\n    - Industry: ",
              )
              .concat(companyProfile.industry || "Unknown", "\n    - Size: ")
              .concat(
                companyProfile.companySize || "Unknown",
                "\n    - Target Markets: ",
              )
              .concat(
                ((_a = companyProfile.targetMarkets) === null || _a === void 0
                  ? void 0
                  : _a.join(", ")) || "Unknown",
                "\n    - Risk Appetite: ",
              )
              .concat(
                companyProfile.riskAppetite || "medium",
                "\n    - Goals: ",
              )
              .concat(
                ((_b = companyProfile.topGoals) === null || _b === void 0
                  ? void 0
                  : _b.join(", ")) || "Growth and profitability",
                '\n    \n    Based on this information, generate 3 strategic business recommendations.\n    For each strategy, provide:\n    1. A concise title\n    2. A summary of the strategy\n    3. The expected outcome\n    4. Which executive proposed it (CEO, CFO, CMO, COO, or CTO)\n    5. Why it matters to the company\n    6. A risk level assessment (Low Risk, Medium Risk, or High Risk)\n    \n    Format your response as a JSON array with the following structure:\n    [\n      {\n        "title": "Strategy Title",\n        "summary": "Strategy summary",\n        "expectedOutcome": "Expected outcome",\n        "proposedBy": "Executive title",\n        "why": "Why this strategy matters",\n        "riskLevel": "Risk level"\n      }\n    ]\n  ',
              );
          return [4 /*yield*/, callOpenAI(prompt, apiKey)];
        case 1:
          response = _c.sent();
          try {
            strategies = JSON.parse(response);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  strategies: strategies,
                  success: true,
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          } catch (error) {
            console.error("Error parsing strategy response:", error);
            throw new Error("Failed to parse strategy data from AI response");
          }
          return [2 /*return*/];
      }
    });
  });
}
// Generate marketing campaigns based on company profile
function generateCampaigns(companyProfile, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    var prompt, response, campaigns;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          prompt =
            "\n    You are a marketing expert team tasked with generating marketing campaign ideas.\n    \n    Company Details:\n    - Name: "
              .concat(
                companyProfile.companyName || "Unknown",
                "\n    - Industry: ",
              )
              .concat(
                companyProfile.industry || "Unknown",
                "\n    - Target Markets: ",
              )
              .concat(
                ((_a = companyProfile.targetMarkets) === null || _a === void 0
                  ? void 0
                  : _a.join(", ")) || "Unknown",
                "\n    - Marketing Budget: ",
              )
              .concat(
                companyProfile.marketingBudget || "Unknown",
                '\n    \n    Based on this information, generate 3 marketing campaign ideas.\n    For each campaign, provide:\n    1. The marketing platform (Facebook, LinkedIn, Google, Email, etc.)\n    2. The campaign objective\n    3. The target audience\n    4. A sample script/copy for the campaign\n    5. Who recommended this campaign (CMO, Marketing Director, Social Media Expert)\n    \n    Format your response as a JSON array with the following structure:\n    [\n      {\n        "platform": "Platform name",\n        "objective": "Campaign objective",\n        "targetAudience": "Target audience description",\n        "script": "Sample script/copy",\n        "recommendedBy": "Executive/expert title"\n      }\n    ]\n  ',
              );
          return [4 /*yield*/, callOpenAI(prompt, apiKey)];
        case 1:
          response = _b.sent();
          try {
            campaigns = JSON.parse(response);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  campaigns: campaigns,
                  success: true,
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          } catch (error) {
            console.error("Error parsing campaign response:", error);
            throw new Error("Failed to parse campaign data from AI response");
          }
          return [2 /*return*/];
      }
    });
  });
}
// Generate communication scripts based on company profile
function generateScripts(companyProfile, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    var prompt, response, scripts;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          prompt =
            "\n    You are a communication expert team tasked with generating effective communication scripts.\n    \n    Company Details:\n    - Name: "
              .concat(
                companyProfile.companyName || "Unknown",
                "\n    - Industry: ",
              )
              .concat(
                companyProfile.industry || "Unknown",
                "\n    - Communication Methods: ",
              )
              .concat(
                ((_a = companyProfile.communicationMethods) === null ||
                _a === void 0
                  ? void 0
                  : _a.join(", ")) || "Email, Phone, Meeting",
                '\n    \n    Based on this information, generate 3 communication scripts for different scenarios.\n    For each script, provide:\n    1. The type of script (Sales call, Customer follow-up, Meeting agenda, etc.)\n    2. The actual script content\n    3. Who created this script (Sales Director, Customer Success Manager, Communication Expert)\n    \n    Format your response as a JSON array with the following structure:\n    [\n      {\n        "type": "Script type",\n        "script": "Actual script content",\n        "attributedTo": "Creator title"\n      }\n    ]\n  ',
              );
          return [4 /*yield*/, callOpenAI(prompt, apiKey)];
        case 1:
          response = _b.sent();
          try {
            scripts = JSON.parse(response);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  scripts: scripts,
                  success: true,
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          } catch (error) {
            console.error("Error parsing script response:", error);
            throw new Error("Failed to parse script data from AI response");
          }
          return [2 /*return*/];
      }
    });
  });
}
// Simulate a debate among executives based on company profile
function simulateDebate(companyProfile, strategies, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    var prompt, response, debateData;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          prompt =
            "\n    You are a virtual boardroom with different executives debating business strategies.\n    \n    Company Details:\n    - Name: "
              .concat(
                companyProfile.companyName || "Unknown",
                "\n    - Industry: ",
              )
              .concat(
                companyProfile.industry || "Unknown",
                "\n    - Risk Appetite: ",
              )
              .concat(companyProfile.riskAppetite || "medium", "\n    \n    ")
              .concat(
                strategies.length > 0
                  ? "\n    Strategies being discussed:\n    ".concat(
                      strategies
                        .map(function (s, i) {
                          return "\n    Strategy "
                            .concat(i + 1, ": ")
                            .concat(s.title, "\n    Summary: ")
                            .concat(s.summary, "\n    Proposed by: ")
                            .concat(s.proposedBy, "\n    Risk level: ")
                            .concat(s.riskLevel, "\n    ");
                        })
                        .join("\n"),
                      "\n    ",
                    )
                  : "The executives are discussing general business strategies.",
                '\n    \n    Simulate a debate among the following executives:\n    - CEO (focused on overall vision and growth)\n    - CFO (focused on financial implications and ROI)\n    - CMO (focused on market positioning and customer acquisition)\n    - COO (focused on operational feasibility and implementation)\n    - CTO (focused on technological aspects and innovation)\n    \n    Each executive should make at least one statement, expressing their perspective.\n    Also provide a brief summary of the conclusion reached after the debate.\n    \n    Format your response as a JSON object with the following structure:\n    {\n      "debate": [\n        {\n          "executive": "Executive title",\n          "statement": "Statement made during the debate",\n          "position": "supportive/cautious/critical"\n        }\n      ],\n      "summary": "Brief summary of the conclusion"\n    }\n  ',
              );
          return [4 /*yield*/, callOpenAI(prompt, apiKey)];
        case 1:
          response = _a.sent();
          try {
            debateData = JSON.parse(response);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  debate: debateData.debate,
                  summary: debateData.summary,
                  success: true,
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          } catch (error) {
            console.error("Error parsing debate response:", error);
            throw new Error("Failed to parse debate data from AI response");
          }
          return [2 /*return*/];
      }
    });
  });
}
// Generate all content in one request
function generateAllContent(companyProfile, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    var prompt_1, response_1, content, error_2;
    var _a, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 2, , 3]);
          prompt_1 =
            "\n      You are an AI executive advisor team tasked with generating a comprehensive business plan.\n      \n      Company Details:\n      - Name: "
              .concat(
                companyProfile.companyName || "Unknown",
                "\n      - Industry: ",
              )
              .concat(companyProfile.industry || "Unknown", "\n      - Size: ")
              .concat(
                companyProfile.companySize || "Unknown",
                "\n      - Target Markets: ",
              )
              .concat(
                ((_a = companyProfile.targetMarkets) === null || _a === void 0
                  ? void 0
                  : _a.join(", ")) || "Unknown",
                "\n      - Risk Appetite: ",
              )
              .concat(
                companyProfile.riskAppetite || "medium",
                "\n      - Goals: ",
              )
              .concat(
                ((_b = companyProfile.topGoals) === null || _b === void 0
                  ? void 0
                  : _b.join(", ")) || "Growth and profitability",
                "\n      - Marketing Budget: ",
              )
              .concat(
                companyProfile.marketingBudget || "Unknown",
                '\n      \n      Please generate the following content:\n      \n      1. THREE strategic business recommendations\n      2. THREE marketing campaign ideas\n      3. THREE communication scripts for different scenarios\n      4. A simulated debate among executives (CEO, CFO, CMO, COO, CTO) about these strategies\n      \n      Format your response as a JSON object with the following structure:\n      {\n        "strategies": [\n          {\n            "title": "Strategy Title",\n            "summary": "Strategy summary",\n            "expectedOutcome": "Expected outcome",\n            "proposedBy": "Executive title",\n            "why": "Why this strategy matters",\n            "riskLevel": "Risk level"\n          }\n        ],\n        "campaigns": [\n          {\n            "platform": "Platform name",\n            "objective": "Campaign objective",\n            "targetAudience": "Target audience description",\n            "script": "Sample script/copy",\n            "recommendedBy": "Executive/expert title"\n          }\n        ],\n        "scripts": [\n          {\n            "type": "Script type",\n            "script": "Actual script content",\n            "attributedTo": "Creator title"\n          }\n        ],\n        "debate": [\n          {\n            "executive": "Executive title",\n            "statement": "Statement made during the debate",\n            "position": "supportive/cautious/critical"\n          }\n        ],\n        "debateSummary": "Brief summary of the conclusion"\n      }\n    ',
              );
          return [4 /*yield*/, callOpenAI(prompt_1, apiKey)];
        case 1:
          response_1 = _c.sent();
          content = JSON.parse(response_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify(
                __assign(__assign({}, content), { success: true }),
              ),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 2:
          error_2 = _c.sent();
          console.error("Error generating all content:", error_2);
          throw error_2;
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Refresh strategies based on company profile
function refreshStrategies(companyProfile, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, generateStrategies(companyProfile, apiKey)];
        case 1:
          // Use the existing function with a specific prompt
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}
// Helper function to call OpenAI API
function callOpenAI(prompt, apiKey) {
  return __awaiter(this, void 0, void 0, function () {
    var response_2, data, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [
            4 /*yield*/,
            fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: "Bearer ".concat(apiKey),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are an AI executive advisor that generates business strategies, marketing campaigns, and communication scripts.",
                  },
                  {
                    role: "user",
                    content: prompt,
                  },
                ],
                temperature: 0.7,
                max_tokens: 2000,
              }),
            }),
          ];
        case 1:
          response_2 = _a.sent();
          return [4 /*yield*/, response_2.json()];
        case 2:
          data = _a.sent();
          if (data.error) {
            console.error("OpenAI API error:", data.error);
            throw new Error("OpenAI API error: ".concat(data.error.message));
          }
          return [2 /*return*/, data.choices[0].message.content];
        case 3:
          error_3 = _a.sent();
          console.error("Error calling OpenAI:", error_3);
          throw error_3;
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
