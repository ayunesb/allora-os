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
var supabase_js_2_36_0_1 = require("https://esm.sh/@supabase/supabase-js@2.36.0");
require("https://deno.land/x/xhr@0.1.0/mod.ts");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
var OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabaseUrl,
      supabaseKey,
      supabase,
      _a,
      topic,
      companyContext,
      executives,
      response_1,
      data,
      debateContent,
      insertError,
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
          _b.trys.push([1, 6, , 7]);
          if (!OPENAI_API_KEY) {
            throw new Error(
              "OPENAI_API_KEY is not configured in Supabase secrets",
            );
          }
          supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
          supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
          supabase = (0, supabase_js_2_36_0_1.createClient)(
            supabaseUrl,
            supabaseKey,
          );
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _b.sent()),
            (topic = _a.topic),
            (companyContext = _a.companyContext),
            (executives = _a.executives);
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
                    content:
                      'You are simulating a debate between business executives on the topic: "'
                        .concat(
                          topic,
                          '". Each executive has their own perspective based on their expertise.\n            \n            The executives participating are:\n            ',
                        )
                        .concat(
                          executives
                            .map(function (exec) {
                              return "- "
                                .concat(exec.name, " (")
                                .concat(exec.role, ")");
                            })
                            .join("\n"),
                          "\n            \n            Company context: ",
                        )
                        .concat(
                          companyContext,
                          "\n            \n            Format your response as a structured debate with:\n            1. Introduction of the topic\n            2. Each executive's key arguments\n            3. Points of disagreement and consensus\n            4. A summary of practical recommendations\n            \n            Make the debate realistic, reflecting each executive's known expertise and speaking style.",
                        ),
                  },
                  {
                    role: "user",
                    content:
                      'Generate a strategic debate between the executives on: "'.concat(
                        topic,
                        '"',
                      ),
                  },
                ],
                temperature: 0.7,
                max_tokens: 1500,
              }),
            }),
          ];
        case 3:
          response_1 = _b.sent();
          return [4 /*yield*/, response_1.json()];
        case 4:
          data = _b.sent();
          if (data.error) {
            throw new Error("OpenAI API error: ".concat(data.error.message));
          }
          debateContent = data.choices[0].message.content;
          return [
            4 /*yield*/,
            supabase.from("ai_executive_debates").insert({
              topic: topic,
              company_context: companyContext,
              executives: executives,
              content: debateContent,
              created_at: new Date().toISOString(),
            }),
          ];
        case 5:
          insertError = _b.sent().error;
          if (insertError) {
            console.error("Error storing debate:", insertError);
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                debate: {
                  topic: topic,
                  content: debateContent,
                  executives: executives,
                },
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 6:
          error_1 = _b.sent();
          console.error("Error in AI executive debate function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 7:
          return [2 /*return*/];
      }
    });
  });
});
