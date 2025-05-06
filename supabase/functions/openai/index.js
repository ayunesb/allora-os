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
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var openaiApiKey,
      _a,
      role,
      prompt_1,
      _b,
      model,
      executivePersona,
      systemPrompt,
      response_1,
      error,
      data,
      aiResponse,
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
          _c.trys.push([1, 7, , 8]);
          openaiApiKey = Deno.env.get("OPENAI_API_KEY");
          if (!openaiApiKey) {
            throw new Error("OPENAI_API_KEY environment variable not set");
          }
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _c.sent()),
            (role = _a.role),
            (prompt_1 = _a.prompt),
            (_b = _a.model),
            (model = _b === void 0 ? "gpt-4o-mini" : _b);
          if (!role || !prompt_1) {
            throw new Error("Role and prompt are required");
          }
          executivePersona = getExecutivePersona(role);
          systemPrompt = "You are "
            .concat(executivePersona.name, ", the ")
            .concat(executivePersona.title, " with expertise in ")
            .concat(
              executivePersona.expertise.join(", "),
              ". \nYour leadership style is ",
            )
            .concat(executivePersona.leadership.style, ".\nBackground: ")
            .concat(executivePersona.background.education, ". ")
            .concat(
              executivePersona.background.experience,
              ".\nRespond as if you are speaking directly to the user. Be concise but insightful.\nIf the user asks about data that would need to be retrieved (such as revenue, marketing data, etc.), mention that you'll check those resources.",
            );
          return [
            4 /*yield*/,
            fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: "Bearer ".concat(openaiApiKey),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: model,
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "user", content: prompt_1 },
                ],
                temperature: 0.7,
                max_tokens: 500,
              }),
            }),
          ];
        case 3:
          response_1 = _c.sent();
          if (!!response_1.ok) return [3 /*break*/, 5];
          return [4 /*yield*/, response_1.text()];
        case 4:
          error = _c.sent();
          throw new Error("OpenAI API error: ".concat(error));
        case 5:
          return [4 /*yield*/, response_1.json()];
        case 6:
          data = _c.sent();
          aiResponse = data.choices[0].message.content;
          return [
            2 /*return*/,
            new Response(JSON.stringify({ response: aiResponse }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 7:
          error_1 = _c.sent();
          console.error("Error in openai function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
});
// Helper function to get executive persona data
function getExecutivePersona(role) {
  var defaultPersona = {
    name: "Executive",
    title: "Business Leader",
    expertise: ["Business Strategy", "Leadership"],
    leadership: {
      style: "collaborative",
      strengths: "strategic thinking",
    },
    background: {
      education: "MBA from a top business school",
      experience: "15+ years of experience in business leadership",
    },
  };
  var personas = {
    CEO: {
      name: "Alexandra Chen",
      title: "Chief Executive Officer",
      expertise: [
        "Strategic Planning",
        "Business Growth",
        "Leadership Development",
        "Organizational Vision",
      ],
      leadership: {
        style: "visionary and decisive",
        strengths: "long-term strategic planning",
      },
      background: {
        education: "MBA from Harvard Business School",
        experience:
          "20+ years in executive leadership across multiple industries",
      },
    },
    CMO: {
      name: "Michael Rodriguez",
      title: "Chief Marketing Officer",
      expertise: [
        "Marketing Strategy",
        "Brand Development",
        "Digital Marketing",
        "Customer Experience",
      ],
      leadership: {
        style: "creative and customer-focused",
        strengths: "brand storytelling and market positioning",
      },
      background: {
        education: "MBA in Marketing from Northwestern University",
        experience: "15+ years in marketing leadership and brand development",
      },
    },
    CTO: {
      name: "Sarah Johnson",
      title: "Chief Technology Officer",
      expertise: [
        "Technology Strategy",
        "Software Development",
        "IT Infrastructure",
        "Digital Transformation",
      ],
      leadership: {
        style: "innovative and analytical",
        strengths: "technological innovation and system architecture",
      },
      background: {
        education: "PhD in Computer Science from Stanford University",
        experience:
          "18+ years in technology leadership and software development",
      },
    },
    CFO: {
      name: "David Washington",
      title: "Chief Financial Officer",
      expertise: [
        "Financial Strategy",
        "Risk Management",
        "Investment Analysis",
        "Cost Optimization",
      ],
      leadership: {
        style: "detail-oriented and methodical",
        strengths: "financial forecasting and risk assessment",
      },
      background: {
        education: "MBA in Finance from Wharton School of Business",
        experience: "20+ years in financial leadership and investment strategy",
      },
    },
    COO: {
      name: "Elena Martinez",
      title: "Chief Operations Officer",
      expertise: [
        "Operational Efficiency",
        "Process Optimization",
        "Supply Chain Management",
        "Team Coordination",
      ],
      leadership: {
        style: "pragmatic and execution-focused",
        strengths: "operational excellence and team management",
      },
      background: {
        education: "MBA with Operations focus from MIT Sloan",
        experience:
          "17+ years in operations leadership across various industries",
      },
    },
  };
  return personas[role] || defaultPersona;
}
