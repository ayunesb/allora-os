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
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var OPENAI_API_KEY,
      _a,
      prompt_1,
      executiveName,
      executiveRole,
      userPreferences,
      _b,
      memories,
      _c,
      inboxMessages,
      systemContent_1,
      response_1,
      data,
      content,
      error_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _d.label = 1;
        case 1:
          _d.trys.push([1, 5, , 6]);
          OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
          if (!OPENAI_API_KEY) {
            throw new Error(
              "OPENAI_API_KEY is not configured in Supabase secrets",
            );
          }
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _d.sent()),
            (prompt_1 = _a.prompt),
            (executiveName = _a.executiveName),
            (executiveRole = _a.executiveRole),
            (userPreferences = _a.userPreferences),
            (_b = _a.memories),
            (memories = _b === void 0 ? [] : _b),
            (_c = _a.inboxMessages),
            (inboxMessages = _c === void 0 ? [] : _c);
          systemContent_1 =
            "You are an AI executive agent that thinks through business problems and provides structured decision recommendations. Answer in JSON format following the specified schema.";
          if (userPreferences) {
            systemContent_1 +=
              "\n\nUser has these preferences:\n- Communication Style: "
                .concat(
                  userPreferences.responseStyle || "balanced",
                  "\n- Technical Level: ",
                )
                .concat(
                  userPreferences.technicalLevel || "intermediate",
                  " \n- Risk Appetite: ",
                )
                .concat(
                  userPreferences.riskAppetite || "medium",
                  "\n- Focus Area: ",
                )
                .concat(
                  userPreferences.focusArea || "general",
                  "\n\nAdapt your decision making and communication style to match these preferences.",
                );
          }
          if (memories && memories.length > 0) {
            systemContent_1 += "\n\nRecent memory context:\n";
            memories.forEach(function (memory) {
              systemContent_1 += "- Task: "
                .concat(memory.task, " \u2192 Decision: ")
                .concat(memory.decision, "\n");
            });
            systemContent_1 +=
              "\nUse these past decisions to inform your current thinking when relevant.";
          }
          if (inboxMessages && inboxMessages.length > 0) {
            systemContent_1 += "\n\nUnread messages from other executives:\n";
            inboxMessages.forEach(function (message) {
              systemContent_1 += "- From "
                .concat(message.from_executive, ': "')
                .concat(message.message_content, '"\n');
            });
            systemContent_1 +=
              "\nConsider these messages in your decision-making process.";
          }
          return [
            4 /*yield*/,
            fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                Authorization: "Bearer ".concat(OPENAI_API_KEY),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  {
                    role: "system",
                    content: systemContent_1,
                  },
                  {
                    role: "user",
                    content: prompt_1,
                  },
                ],
                temperature: 0.2,
                max_tokens: 800,
              }),
            }),
          ];
        case 3:
          response_1 = _d.sent();
          return [4 /*yield*/, response_1.json()];
        case 4:
          data = _d.sent();
          if (data.error) {
            throw new Error("OpenAI API error: ".concat(data.error.message));
          }
          content = data.choices[0].message.content;
          // Log the decision to the console
          console.log(
            "Executive "
              .concat(executiveName, " (")
              .concat(executiveRole, ") made a decision"),
          );
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                content: content,
                executiveName: executiveName,
                executiveRole: executiveRole,
                timestamp: new Date().toISOString(),
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 5:
          error_1 = _d.sent();
          console.error("Error in executive-think function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 6:
          return [2 /*return*/];
      }
    });
  });
});
