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
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
require("https://deno.land/x/xhr@0.1.0/mod.ts");
// CORS headers for the response
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
// Strategy generation prompt
var SYSTEM_PROMPT =
  "You are an expert business strategy advisor with expertise across multiple industries.\nYour task is to analyze business information and generate THREE distinct strategic options.\nEach strategy should be tailored to the company's industry, size, goals, and risk tolerance.\n\nFor each strategy, provide:\n1. A clear and concise title\n2. A detailed description (1-2 paragraphs)\n3. 3-5 pros\n4. 3-5 cons\n5. Estimated ROI (percentage range or value description)\n6. Risk level (Low, Medium, or High)\n7. Timeline in months\n8. 5-7 implementation steps\n\nAdjust strategies based on:\n- Risk tolerance: Higher values should include more innovative but risky strategies\n- Time horizon: Short (3-6 months), Medium (6-12 months), Long (1-3 years)\n- Company size: Tailor to available resources\n- Revenue: Scale appropriately with financial capacity\n\nReturn structured JSON with the three strategies.";
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var openaiApiKey,
      _a,
      industry,
      companySize,
      revenue,
      goals,
      riskTolerance,
      timeHorizon,
      challenges,
      userId,
      companyId,
      companyName,
      userPrompt,
      response_1,
      errorText,
      data,
      strategiesContent,
      strategies,
      createClient,
      supabaseUrl,
      supabaseServiceKey,
      supabase,
      dbError_1,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _b.label = 1;
        case 1:
          _b.trys.push([1, 12, , 13]);
          openaiApiKey = Deno.env.get("OPENAI_API_KEY");
          if (!openaiApiKey) {
            throw new Error("OPENAI_API_KEY environment variable not set");
          }
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _b.sent()),
            (industry = _a.industry),
            (companySize = _a.companySize),
            (revenue = _a.revenue),
            (goals = _a.goals),
            (riskTolerance = _a.riskTolerance),
            (timeHorizon = _a.timeHorizon),
            (challenges = _a.challenges),
            (userId = _a.userId),
            (companyId = _a.companyId),
            (companyName = _a.companyName);
          // Validate required fields
          if (!industry || !goals || !timeHorizon) {
            throw new Error("Missing required parameters");
          }
          userPrompt =
            "\n    Please generate three strategic options for my business with these details:\n\n    Company: "
              .concat(companyName || "My company", "\n    Industry: ")
              .concat(industry, "\n    Company Size: ")
              .concat(companySize, " employees\n    Annual Revenue: ")
              .concat(revenue, "\n    Business Goals: ")
              .concat(goals, "\n    Risk Tolerance: ")
              .concat(
                riskTolerance,
                "/10 (higher = more aggressive)\n    Time Horizon: ",
              )
              .concat(timeHorizon, "\n    ")
              .concat(
                challenges ? "Current Challenges: ".concat(challenges) : "",
                '\n\n    Please provide three distinct strategies that vary in their approach and risk level. Structure your response as valid JSON with this format:\n    {\n      "strategies": [\n        {\n          "title": "Strategy 1 Title",\n          "description": "Detailed description...",\n          "pros": ["Pro 1", "Pro 2", "Pro 3"],\n          "cons": ["Con 1", "Con 2", "Con 3"],\n          "estimatedROI": "Expected ROI range or description",\n          "riskLevel": "Low/Medium/High",\n          "timeline": "X months",\n          "implementationSteps": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]\n        },\n        // Strategy 2 and 3 with the same structure\n      ]\n    }',
              );
          console.log("Calling OpenAI API for strategy generation");
          return [
            4 /*yield*/,
            fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: "Bearer ".concat(openaiApiKey),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  { role: "user", content: userPrompt },
                ],
                temperature: 0.7,
                response_format: { type: "json_object" },
              }),
            }),
          ];
        case 3:
          response_1 = _b.sent();
          if (!!response_1.ok) return [3 /*break*/, 5];
          return [4 /*yield*/, response_1.text()];
        case 4:
          errorText = _b.sent();
          console.error("OpenAI API error:", errorText);
          throw new Error(
            "OpenAI API error: "
              .concat(response_1.status, " ")
              .concat(errorText),
          );
        case 5:
          return [4 /*yield*/, response_1.json()];
        case 6:
          data = _b.sent();
          strategiesContent = data.choices[0].message.content;
          strategies = void 0;
          try {
            strategies = JSON.parse(strategiesContent);
          } catch (error) {
            console.error(
              "Failed to parse OpenAI response:",
              strategiesContent,
            );
            throw new Error(
              "Failed to parse AI response. Invalid JSON format.",
            );
          }
          if (!(userId && companyId)) return [3 /*break*/, 11];
          _b.label = 7;
        case 7:
          _b.trys.push([7, 10, , 11]);
          return [
            4 /*yield*/,
            Promise.resolve().then(function () {
              return require("https://esm.sh/@supabase/supabase-js@2.39.6");
            }),
          ];
        case 8:
          createClient = _b.sent().createClient;
          supabaseUrl = Deno.env.get("SUPABASE_URL");
          supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
          supabase = createClient(supabaseUrl, supabaseServiceKey);
          // Save the strategy generation to the database
          return [
            4 /*yield*/,
            supabase.from("ai_strategy_logs").insert({
              user_id: userId,
              company_id: companyId,
              industry: industry,
              risk_tolerance: riskTolerance,
              time_horizon: timeHorizon,
              parameters: {
                industry: industry,
                companySize: companySize,
                revenue: revenue,
                goals: goals,
                riskTolerance: riskTolerance,
                timeHorizon: timeHorizon,
                challenges: challenges,
              },
              strategies: strategies.strategies,
            }),
          ];
        case 9:
          // Save the strategy generation to the database
          _b.sent();
          return [3 /*break*/, 11];
        case 10:
          dbError_1 = _b.sent();
          // Log but don't fail if database logging fails
          console.error("Error logging strategy generation:", dbError_1);
          return [3 /*break*/, 11];
        case 11:
          // Return the strategies
          return [
            2 /*return*/,
            new Response(JSON.stringify(strategies.strategies || []), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 12:
          error_1 = _b.sent();
          console.error("Error in generate-strategies function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 13:
          return [2 /*return*/];
      }
    });
  });
});
