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
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
var supabase_js_2_36_0_1 = require("https://esm.sh/@supabase/supabase-js@2.36.0");
require("https://deno.land/x/xhr@0.1.0/mod.ts");
// CORS headers for browser requests
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
// Get environment variables
var OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
// Model endpoints and configurations
var AI_MODELS = {
  "gpt-4o-mini": {
    provider: "openai",
    endpoint: "https://api.openai.com/v1/chat/completions",
    defaultTemp: 0.7,
    defaultMaxTokens: 800,
  },
  "gpt-4o": {
    provider: "openai",
    endpoint: "https://api.openai.com/v1/chat/completions",
    defaultTemp: 0.7,
    defaultMaxTokens: 1000,
  },
  "claude-3-sonnet-20240229": {
    provider: "anthropic",
    endpoint: "https://api.anthropic.com/v1/messages",
    defaultTemp: 0.7,
    defaultMaxTokens: 1000,
  },
  "claude-3-opus-20240229": {
    provider: "anthropic",
    endpoint: "https://api.anthropic.com/v1/messages",
    defaultTemp: 0.5,
    defaultMaxTokens: 1200,
  },
  "gemini-1.5-pro": {
    provider: "google",
    endpoint:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
    defaultTemp: 0.7,
    defaultMaxTokens: 1000,
  },
};
// Main function to handle requests
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabaseUrl,
      supabaseKey,
      supabase,
      _a,
      action,
      modelName,
      messages,
      botName,
      botRole,
      debateContext,
      preferences,
      model,
      modelConfig,
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
          _c.trys.push([1, 9, , 10]);
          supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
          supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
          supabase = (0, supabase_js_2_36_0_1.createClient)(
            supabaseUrl,
            supabaseKey,
          );
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _c.sent()),
            (action = _a.action),
            (modelName = _a.modelName),
            (messages = _a.messages),
            (botName = _a.botName),
            (botRole = _a.botRole),
            (debateContext = _a.debateContext),
            (preferences = _a.preferences);
          model = modelName || "gpt-4o-mini";
          // Make sure the model is supported
          if (!AI_MODELS[model]) {
            throw new Error("Unsupported model: ".concat(model));
          }
          modelConfig = AI_MODELS[model];
          // Track usage for monitoring
          return [4 /*yield*/, trackUsage(supabase, botName, botRole, model)];
        case 3:
          // Track usage for monitoring
          _c.sent();
          _b = action;
          switch (_b) {
            case "debate":
              return [3 /*break*/, 4];
            case "generate":
              return [3 /*break*/, 6];
          }
          return [3 /*break*/, 6];
        case 4:
          return [
            4 /*yield*/,
            handleDebate(
              req,
              supabase,
              modelConfig,
              botName,
              botRole,
              messages,
              debateContext,
              preferences,
            ),
          ];
        case 5:
          return [2 /*return*/, _c.sent()];
        case 6:
          return [
            4 /*yield*/,
            handleGenerate(
              req,
              supabase,
              modelConfig,
              botName,
              botRole,
              messages,
              debateContext,
              preferences,
            ),
          ];
        case 7:
          return [2 /*return*/, _c.sent()];
        case 8:
          return [3 /*break*/, 10];
        case 9:
          error_1 = _c.sent();
          console.error("Error in multi-model-ai function:", error_1);
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
        case 10:
          return [2 /*return*/];
      }
    });
  });
});
// Track model usage
function trackUsage(supabase, botName, botRole, model) {
  return __awaiter(this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase.from("model_usage").insert({
              bot_name: botName || "unspecified",
              bot_role: botRole || "unspecified",
              model: model,
              timestamp: new Date().toISOString(),
            }),
          ];
        case 1:
          _a.sent();
          return [3 /*break*/, 3];
        case 2:
          err_1 = _a.sent();
          // Just log the error but don't fail the request if tracking fails
          console.error("Error tracking model usage:", err_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Handle debate scenario with multiple agents
function handleDebate(
  req,
  supabase,
  modelConfig,
  botName,
  botRole,
  messages,
  debateContext,
  preferences,
) {
  return __awaiter(this, void 0, void 0, function () {
    var participants,
      topic,
      responses,
      _i,
      participants_1,
      participant,
      systemMessage,
      formattedMessages,
      response_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          participants =
            (debateContext === null || debateContext === void 0
              ? void 0
              : debateContext.participants) || [];
          topic =
            (debateContext === null || debateContext === void 0
              ? void 0
              : debateContext.topic) || "business strategy";
          responses = [];
          (_i = 0), (participants_1 = participants);
          _a.label = 1;
        case 1:
          if (!(_i < participants_1.length)) return [3 /*break*/, 4];
          participant = participants_1[_i];
          systemMessage = {
            role: "system",
            content: "You are "
              .concat(participant.name, ", a ")
              .concat(
                participant.role,
                " executive participating in a boardroom debate.\n      Topic: ",
              )
              .concat(
                topic,
                "\n      Provide your expert perspective on this topic, considering your background in ",
              )
              .concat(
                participant.specialty || participant.role,
                ".\n      Be concise but insightful. You may respectfully disagree with other executives when appropriate based on your expertise.",
              ),
          };
          formattedMessages = __spreadArray(
            [systemMessage],
            messages.map(function (m) {
              return {
                role: m.type, // 'user' or 'bot'
                content: m.content,
                name: m.sender
                  ? m.sender.replace(/\s+/g, "_").toLowerCase()
                  : undefined,
              };
            }),
            true,
          );
          return [
            4 /*yield*/,
            callModel(
              modelConfig,
              formattedMessages,
              (preferences === null || preferences === void 0
                ? void 0
                : preferences.temperature) || modelConfig.defaultTemp,
              (preferences === null || preferences === void 0
                ? void 0
                : preferences.maxTokens) || modelConfig.defaultMaxTokens,
            ),
          ];
        case 2:
          response_1 = _a.sent();
          responses.push({
            participant: participant,
            content: response_1,
          });
          _a.label = 3;
        case 3:
          _i++;
          return [3 /*break*/, 1];
        case 4:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                responses: responses,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
      }
    });
  });
}
// Handle standard generation request
function handleGenerate(
  req,
  supabase,
  modelConfig,
  botName,
  botRole,
  messages,
  debateContext,
  preferences,
) {
  return __awaiter(this, void 0, void 0, function () {
    var systemMessage, formattedMessages, response;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          systemMessage = {
            role: "system",
            content: "You are "
              .concat(botName || "an AI assistant", ", a ")
              .concat(botRole || "helpful assistant", ".\n    ")
              .concat(
                (
                  preferences === null || preferences === void 0
                    ? void 0
                    : preferences.detailedResponses
                )
                  ? "Provide detailed, thorough answers with examples and explanations."
                  : "Be concise and to the point in your responses.",
                "\n    ",
              )
              .concat(
                (preferences === null || preferences === void 0
                  ? void 0
                  : preferences.technicalLevel) === "advanced"
                  ? "Use technical terminology appropriate for experts."
                  : "Use simple language that is easy to understand.",
                "\n    ",
              )
              .concat(
                (
                  preferences === null || preferences === void 0
                    ? void 0
                    : preferences.showSources
                )
                  ? "Cite sources and explain your reasoning when possible."
                  : "",
              ),
          };
          formattedMessages = __spreadArray(
            [systemMessage],
            messages.map(function (m) {
              return {
                role: m.type, // 'user' or 'bot'
                content: m.content,
              };
            }),
            true,
          );
          return [
            4 /*yield*/,
            callModel(
              modelConfig,
              formattedMessages,
              (preferences === null || preferences === void 0
                ? void 0
                : preferences.temperature) || modelConfig.defaultTemp,
              (preferences === null || preferences === void 0
                ? void 0
                : preferences.maxTokens) || modelConfig.defaultMaxTokens,
            ),
          ];
        case 1:
          response = _a.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                content: response,
                model: modelConfig,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
      }
    });
  });
}
// Call the AI model based on provider
function callModel(modelConfig, messages, temperature, maxTokens) {
  return __awaiter(this, void 0, void 0, function () {
    var provider, endpoint, _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (provider = modelConfig.provider), (endpoint = modelConfig.endpoint);
          _a = provider;
          switch (_a) {
            case "openai":
              return [3 /*break*/, 1];
            case "anthropic":
              return [3 /*break*/, 3];
            case "google":
              return [3 /*break*/, 5];
          }
          return [3 /*break*/, 7];
        case 1:
          return [
            4 /*yield*/,
            callOpenAI(endpoint, messages, temperature, maxTokens),
          ];
        case 2:
          return [2 /*return*/, _b.sent()];
        case 3:
          return [
            4 /*yield*/,
            callAnthropic(endpoint, messages, temperature, maxTokens),
          ];
        case 4:
          return [2 /*return*/, _b.sent()];
        case 5:
          return [
            4 /*yield*/,
            callGoogle(endpoint, messages, temperature, maxTokens),
          ];
        case 6:
          return [2 /*return*/, _b.sent()];
        case 7:
          throw new Error("Unsupported AI provider: ".concat(provider));
      }
    });
  });
}
// Call OpenAI API
function callOpenAI(endpoint, messages, temperature, maxTokens) {
  return __awaiter(this, void 0, void 0, function () {
    var response_2, data, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          return [
            4 /*yield*/,
            fetch(endpoint, {
              method: "POST",
              headers: {
                Authorization: "Bearer ".concat(OPENAI_API_KEY),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: messages[0].model || "gpt-4o-mini",
                messages: messages,
                temperature: temperature,
                max_tokens: maxTokens,
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
          error_2 = _a.sent();
          console.error("Error calling OpenAI:", error_2);
          throw error_2;
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Call Anthropic API (Claude)
function callAnthropic(endpoint, messages, temperature, maxTokens) {
  return __awaiter(this, void 0, void 0, function () {
    var systemMessage, filteredMessages, response_3, data, error_3;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          systemMessage =
            ((_a = messages.find(function (m) {
              return m.role === "system";
            })) === null || _a === void 0
              ? void 0
              : _a.content) || "";
          filteredMessages = messages.filter(function (m) {
            return m.role !== "system";
          });
          return [
            4 /*yield*/,
            fetch(endpoint, {
              method: "POST",
              headers: {
                "x-api-key": Deno.env.get("ANTHROPIC_API_KEY"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "claude-3-sonnet-20240229",
                system: systemMessage,
                messages: filteredMessages.map(function (m) {
                  return {
                    role: m.role === "bot" ? "assistant" : m.role,
                    content: m.content,
                  };
                }),
                temperature: temperature,
                max_tokens: maxTokens,
              }),
            }),
          ];
        case 1:
          response_3 = _b.sent();
          return [4 /*yield*/, response_3.json()];
        case 2:
          data = _b.sent();
          if (data.error) {
            console.error("Anthropic API error:", data.error);
            throw new Error("Anthropic API error: ".concat(data.error.message));
          }
          return [2 /*return*/, data.content[0].text];
        case 3:
          error_3 = _b.sent();
          console.error("Error calling Anthropic:", error_3);
          throw error_3;
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Call Google API (Gemini)
function callGoogle(endpoint, messages, temperature, maxTokens) {
  return __awaiter(this, void 0, void 0, function () {
    var systemMessage, userMessages, response_4, data, error_4;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          systemMessage =
            ((_a = messages.find(function (m) {
              return m.role === "system";
            })) === null || _a === void 0
              ? void 0
              : _a.content) || "";
          userMessages = messages.filter(function (m) {
            return m.role !== "system";
          });
          return [
            4 /*yield*/,
            fetch(
              ""
                .concat(endpoint, "?key=")
                .concat(Deno.env.get("GOOGLE_AI_KEY")),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [
                        {
                          text:
                            systemMessage +
                            "\n\n" +
                            userMessages
                              .map(function (m) {
                                return ""
                                  .concat(
                                    m.role === "user" ? "User" : "Assistant",
                                    ": ",
                                  )
                                  .concat(m.content);
                              })
                              .join("\n\n"),
                        },
                      ],
                    },
                  ],
                  generationConfig: {
                    temperature: temperature,
                    maxOutputTokens: maxTokens,
                  },
                }),
              },
            ),
          ];
        case 1:
          response_4 = _b.sent();
          return [4 /*yield*/, response_4.json()];
        case 2:
          data = _b.sent();
          if (data.error) {
            console.error("Google AI API error:", data.error);
            throw new Error("Google AI API error: ".concat(data.error.message));
          }
          return [2 /*return*/, data.candidates[0].content.parts[0].text];
        case 3:
          error_4 = _b.sent();
          console.error("Error calling Google AI:", error_4);
          throw error_4;
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
