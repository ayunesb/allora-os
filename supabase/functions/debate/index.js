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
      action,
      topic,
      participants,
      messages,
      userMessage,
      userId,
      preferences,
      context,
      _b,
      debateId,
      error,
      systemMessage,
      debateId,
      message,
      _c,
      data,
      error,
      nextSequence,
      debateId,
      _d,
      debateData,
      debateError,
      _e,
      messageData,
      messageError,
      formattedMessages,
      executives,
      responses,
      _i,
      executives_1,
      exec,
      lastSequence,
      execSystemMessage,
      execMessages,
      openAIResponse,
      data,
      responseContent,
      insertError,
      debateId,
      _f,
      messageData,
      messageError,
      debateText,
      openAIResponse,
      data,
      summaryContent,
      error_1;
    return __generator(this, function (_g) {
      switch (_g.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _g.label = 1;
        case 1:
          _g.trys.push([1, 26, , 27]);
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
          (_a = _g.sent()),
            (action = _a.action),
            (topic = _a.topic),
            (participants = _a.participants),
            (messages = _a.messages),
            (userMessage = _a.userMessage),
            (userId = _a.userId),
            (preferences = _a.preferences),
            (context = _a.context);
          _b = action;
          switch (_b) {
            case "initiate_debate":
              return [3 /*break*/, 3];
            case "add_user_message":
              return [3 /*break*/, 6];
            case "generate_executive_responses":
              return [3 /*break*/, 9];
            case "generate_debate_summary":
              return [3 /*break*/, 18];
          }
          return [3 /*break*/, 24];
        case 3:
          debateId = crypto.randomUUID();
          return [
            4 /*yield*/,
            supabase.from("debates").insert({
              id: debateId,
              user_id: userId,
              topic: topic,
              participants: participants.map(function (p) {
                return { name: p.name, role: p.role };
              }),
              context: context,
              status: "active",
            }),
          ];
        case 4:
          error = _g.sent().error;
          if (error) throw error;
          systemMessage =
            "\n          This is a multi-executive debate on the topic: "
              .concat(topic, ". \n          Business context: ")
              .concat(
                JSON.stringify(context),
                ".\n          \n          Each executive should provide their perspective based on their specific role and expertise.\n          The goal is to collaboratively reach the best strategic decision through respectful disagreement and synthesis.\n        ",
              );
          // Store the initial message
          return [
            4 /*yield*/,
            supabase.from("debate_messages").insert({
              debate_id: debateId,
              sender: "system",
              content: systemMessage,
              sequence: 0,
            }),
          ];
        case 5:
          // Store the initial message
          _g.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                debateId: debateId,
                status: "initiated",
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 6:
          (debateId = userMessage.debateId), (message = userMessage.message);
          return [
            4 /*yield*/,
            supabase
              .from("debate_messages")
              .select("sequence")
              .eq("debate_id", debateId)
              .order("sequence", { ascending: false })
              .limit(1),
          ];
        case 7:
          (_c = _g.sent()), (data = _c.data), (error = _c.error);
          if (error) throw error;
          nextSequence = data && data.length > 0 ? data[0].sequence + 1 : 0;
          // Store the user message
          return [
            4 /*yield*/,
            supabase.from("debate_messages").insert({
              debate_id: debateId,
              sender: "user",
              content: message,
              sequence: nextSequence,
            }),
          ];
        case 8:
          // Store the user message
          _g.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                status: "message_added",
                sequence: nextSequence,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 9:
          debateId = userMessage.debateId;
          return [
            4 /*yield*/,
            supabase.from("debates").select("*").eq("id", debateId).single(),
          ];
        case 10:
          (_d = _g.sent()), (debateData = _d.data), (debateError = _d.error);
          if (debateError) throw debateError;
          return [
            4 /*yield*/,
            supabase
              .from("debate_messages")
              .select("*")
              .eq("debate_id", debateId)
              .order("sequence", { ascending: true }),
          ];
        case 11:
          (_e = _g.sent()), (messageData = _e.data), (messageError = _e.error);
          if (messageError) throw messageError;
          formattedMessages = messageData.map(function (msg) {
            return {
              role:
                msg.sender === "system"
                  ? "system"
                  : msg.sender === "user"
                    ? "user"
                    : "assistant",
              content: msg.content,
              name:
                msg.sender !== "system" && msg.sender !== "user"
                  ? msg.sender.replace(/\s+/g, "_").toLowerCase()
                  : undefined,
            };
          });
          executives = debateData.participants;
          responses = [];
          (_i = 0), (executives_1 = executives);
          _g.label = 12;
        case 12:
          if (!(_i < executives_1.length)) return [3 /*break*/, 17];
          exec = executives_1[_i];
          lastSequence =
            messageData.length > 0
              ? messageData[messageData.length - 1].sequence
              : -1;
          execSystemMessage = {
            role: "system",
            content: "You are "
              .concat(exec.name, ", a ")
              .concat(
                exec.role,
                " executive in a multi-agent debate.\n            Topic: ",
              )
              .concat(
                debateData.topic,
                "\n            Your perspective should be based on your role as ",
              )
              .concat(
                exec.role,
                ".\n            Consider what other executives have said so far, and add your unique perspective.\n            Be concise but insightful. You may politely disagree with others if appropriate based on your role.",
              ),
          };
          execMessages = __spreadArray(
            [execSystemMessage],
            formattedMessages.filter(function (msg) {
              return msg.role !== "system";
            }),
            true,
          );
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
                messages: execMessages,
                temperature: 0.7,
                max_tokens: 300,
              }),
            }),
          ];
        case 13:
          openAIResponse = _g.sent();
          return [4 /*yield*/, openAIResponse.json()];
        case 14:
          data = _g.sent();
          if (data.error) {
            console.error(
              "Error generating response for ".concat(exec.name, ":"),
              data.error,
            );
            return [3 /*break*/, 16];
          }
          responseContent = data.choices[0].message.content;
          return [
            4 /*yield*/,
            supabase.from("debate_messages").insert({
              debate_id: debateId,
              sender: exec.name,
              sender_role: exec.role,
              content: responseContent,
              sequence: lastSequence + 1 + responses.length + 1,
            }),
          ];
        case 15:
          insertError = _g.sent().error;
          if (insertError) {
            console.error(
              "Error storing response for ".concat(exec.name, ":"),
              insertError,
            );
            return [3 /*break*/, 16];
          }
          responses.push({
            executive: exec,
            content: responseContent,
            sequence: lastSequence + 1 + responses.length,
          });
          _g.label = 16;
        case 16:
          _i++;
          return [3 /*break*/, 12];
        case 17:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                status: "responses_generated",
                responses: responses,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 18:
          debateId = userMessage.debateId;
          return [
            4 /*yield*/,
            supabase
              .from("debate_messages")
              .select("*")
              .eq("debate_id", debateId)
              .order("sequence", { ascending: true }),
          ];
        case 19:
          (_f = _g.sent()), (messageData = _f.data), (messageError = _f.error);
          if (messageError) throw messageError;
          debateText = messageData
            .map(function (msg) {
              return ""
                .concat(msg.sender)
                .concat(
                  msg.sender_role ? " (".concat(msg.sender_role, ")") : "",
                  ": ",
                )
                .concat(msg.content);
            })
            .join("\n\n");
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
                      "You are an expert business analyst. Summarize the following executive debate and extract:\n                1. Key points made by each executive\n                2. Areas of agreement and disagreement\n                3. Final recommendations\n                4. Next steps\n                \n                Format your response as a structured summary with these sections.",
                  },
                  {
                    role: "user",
                    content: debateText,
                  },
                ],
                temperature: 0.3,
                max_tokens: 1000,
              }),
            }),
          ];
        case 20:
          openAIResponse = _g.sent();
          return [4 /*yield*/, openAIResponse.json()];
        case 21:
          data = _g.sent();
          if (data.error) {
            throw new Error(
              "Error generating summary: ".concat(data.error.message),
            );
          }
          summaryContent = data.choices[0].message.content;
          // Store the summary
          return [
            4 /*yield*/,
            supabase.from("debate_summaries").insert({
              debate_id: debateId,
              content: summaryContent,
              created_at: new Date().toISOString(),
            }),
          ];
        case 22:
          // Store the summary
          _g.sent();
          // Update the debate status
          return [
            4 /*yield*/,
            supabase
              .from("debates")
              .update({ status: "completed" })
              .eq("id", debateId),
          ];
        case 23:
          // Update the debate status
          _g.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                status: "summary_generated",
                summary: summaryContent,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 24:
          throw new Error("Unknown action: ".concat(action));
        case 25:
          return [3 /*break*/, 27];
        case 26:
          error_1 = _g.sent();
          console.error("Error in debate function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 27:
          return [2 /*return*/];
      }
    });
  });
});
