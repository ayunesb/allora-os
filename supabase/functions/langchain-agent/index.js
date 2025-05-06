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
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
// Tool detection utility
var detectToolTrigger = function (text) {
  var toolPatterns = {
    stripe: /(revenue|payment|subscription|invoice|charge|refund|mrr|arr)/i,
    plaid: /(bank|account|balance|transaction|financial|cashflow)/i,
    calendly: /(meeting|schedule|appointment|calendar|availability)/i,
    clearbit: /(lead|company info|prospect|enrich|domain lookup)/i,
    notion: /(note|document|write|log|save to notion|store in notion)/i,
  };
  for (var _i = 0, _a = Object.entries(toolPatterns); _i < _a.length; _i++) {
    var _b = _a[_i],
      tool = _b[0],
      pattern = _b[1];
    if (pattern.test(text)) {
      return tool;
    }
  }
  return null;
};
// Execute the appropriate tool based on detection
var executeToolAction = function (tool, input, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          console.log("Executing ".concat(tool, " with input:"), input);
          _a = tool;
          switch (_a) {
            case "stripe":
              return [3 /*break*/, 1];
            case "plaid":
              return [3 /*break*/, 3];
            case "calendly":
              return [3 /*break*/, 5];
            case "clearbit":
              return [3 /*break*/, 7];
            case "notion":
              return [3 /*break*/, 9];
          }
          return [3 /*break*/, 11];
        case 1:
          return [4 /*yield*/, handleStripeAction(input, context)];
        case 2:
          return [2 /*return*/, _b.sent()];
        case 3:
          return [4 /*yield*/, handlePlaidAction(input, context)];
        case 4:
          return [2 /*return*/, _b.sent()];
        case 5:
          return [4 /*yield*/, handleCalendlyAction(input, context)];
        case 6:
          return [2 /*return*/, _b.sent()];
        case 7:
          return [4 /*yield*/, handleClearbitAction(input, context)];
        case 8:
          return [2 /*return*/, _b.sent()];
        case 9:
          return [4 /*yield*/, handleNotionAction(input, context)];
        case 10:
          return [2 /*return*/, _b.sent()];
        case 11:
          return [2 /*return*/, { result: "No specific tool action detected" }];
      }
    });
  });
};
// Tool action handlers
var handleStripeAction = function (input, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would normally call Stripe API
      return [
        2 /*return*/,
        {
          result: "Retrieved financial data from Stripe",
          data: {
            mrr: "$12,500",
            activeSubscriptions: 125,
            recentTransactions: [
              { amount: 199, customer: "Acme Inc.", date: "2025-04-10" },
            ],
          },
        },
      ];
    });
  });
};
var handlePlaidAction = function (input, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would normally call Plaid API
      return [
        2 /*return*/,
        {
          result: "Retrieved banking data from Plaid",
          data: {
            balance: "$45,230.15",
            accounts: [
              { name: "Business Checking", balance: "$32,450.25" },
              { name: "Business Savings", balance: "$12,779.90" },
            ],
          },
        },
      ];
    });
  });
};
var handleCalendlyAction = function (input, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would normally call Calendly API
      return [
        2 /*return*/,
        {
          result: "Retrieved schedule from Calendly",
          data: {
            availableSlots: [
              { date: "2025-04-16", time: "10:00 AM" },
              { date: "2025-04-16", time: "2:00 PM" },
              { date: "2025-04-17", time: "11:00 AM" },
            ],
          },
        },
      ];
    });
  });
};
var handleClearbitAction = function (input, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      // This would normally call Clearbit API
      return [
        2 /*return*/,
        {
          result: "Enriched lead data with Clearbit",
          data: {
            company: "TechCorp Solutions",
            size: "51-200 employees",
            industry: "Software",
            location: "San Francisco, CA",
          },
        },
      ];
    });
  });
};
var handleNotionAction = function (input, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    var title, content;
    return __generator(this, function (_a) {
      try {
        title = "Executive Decision: ".concat(
          context.executive || "AI Executive",
        );
        content = input.query || "No content provided";
        console.log("Logging to Notion: ".concat(title));
        // This would normally call the Notion API
        return [
          2 /*return*/,
          {
            result: "Successfully logged to Notion",
            data: {
              pageId: "notion-page-id-12345",
              title: title,
              timestamp: new Date().toISOString(),
            },
          },
        ];
      } catch (error) {
        console.error("Notion logging error:", error);
        return [
          2 /*return*/,
          { result: "Failed to log to Notion: ".concat(error.message) },
        ];
      }
      return [2 /*return*/];
    });
  });
};
// Execute LangChain agent (simulated)
var runLangChainAgent = function (query, context) {
  return __awaiter(void 0, void 0, void 0, function () {
    var detectedTool, toolResult;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log("Running agent with query: ".concat(query));
          detectedTool = detectToolTrigger(query);
          if (!detectedTool) {
            return [
              2 /*return*/,
              {
                result:
                  "I've analyzed your request, but I don't see any specific data that needs to be retrieved. Please provide more details about what business information you need.",
                toolCalls: [],
              },
            ];
          }
          return [
            4 /*yield*/,
            executeToolAction(detectedTool, { query: query }, context),
          ];
        case 1:
          toolResult = _a.sent();
          // Log the execution
          console.log(
            "Tool ".concat(detectedTool, " execution result:"),
            toolResult,
          );
          return [
            2 /*return*/,
            {
              result: toolResult.result,
              toolCalls: [
                {
                  tool: detectedTool,
                  input: { query: query },
                  output: toolResult.data || {},
                },
              ],
            },
          ];
      }
    });
  });
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, query, _b, context, result, error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _c.label = 1;
        case 1:
          _c.trys.push([1, 4, , 5]);
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _c.sent()),
            (query = _a.query),
            (_b = _a.context),
            (context = _b === void 0 ? {} : _b);
          if (!query) {
            throw new Error("Query is required");
          }
          return [4 /*yield*/, runLangChainAgent(query, context)];
        case 3:
          result = _c.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(result), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 4:
          error_1 = _c.sent();
          console.error("Error in langchain-agent function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 5:
          return [2 /*return*/];
      }
    });
  });
});
