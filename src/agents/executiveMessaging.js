"use strict";
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
exports.fetchExecutiveInbox = fetchExecutiveInbox;
exports.formatInboxForPrompt = formatInboxForPrompt;
exports.markMessagesAsRead = markMessagesAsRead;
exports.notifyOtherExecutives = notifyOtherExecutives;
exports.sendExecutiveMessage = sendExecutiveMessage;
exports.generateExecutiveMessage = generateExecutiveMessage;
var client_1 = require("@/integrations/supabase/client");
var promptTemplates_1 = require("@/agents/promptTemplates");
/**
 * Fetches unread messages for a specific executive
 */
function fetchExecutiveInbox(executiveName) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executive_messages")
              .select("*")
              .eq("to_executive", executiveName)
              .eq("status", "unread")
              .order("created_at", { ascending: true }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Failed to fetch messages:", error);
            return [2 /*return*/, []];
          }
          return [2 /*return*/, data || []];
      }
    });
  });
}
/**
 * Format inbox messages for use in AI prompts
 */
function formatInboxForPrompt(messages) {
  if (!messages || messages.length === 0) {
    return "No unread messages in your inbox.";
  }
  return messages
    .map(function (msg) {
      return "From: "
        .concat(msg.from_executive, "\nMessage: ")
        .concat(msg.message_content);
    })
    .join("\n\n");
}
/**
 * Marks messages as read for a specific executive
 */
function markMessagesAsRead(executiveName) {
  return __awaiter(this, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("executive_messages")
              .update({ status: "read" })
              .eq("to_executive", executiveName)
              .eq("status", "unread"),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            console.error("Failed to mark messages as read:", error);
          }
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Sends a message to other executives notifying them of recent messages
 */
function notifyOtherExecutives(executiveName, executiveRole, messages) {
  return __awaiter(this, void 0, void 0, function () {
    var _i, messages_1, msg, notification;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          (_i = 0), (messages_1 = messages);
          _a.label = 1;
        case 1:
          if (!(_i < messages_1.length)) return [3 /*break*/, 4];
          msg = messages_1[_i];
          notification = promptTemplates_1.messageNotificationTemplate
            .replace("{senderName}", executiveName)
            .replace("{senderRole}", executiveRole)
            .replace("{messageContent}", msg.message_content);
          // Send the notification to the executive who sent the message
          return [
            4 /*yield*/,
            sendExecutiveMessage(
              executiveName,
              msg.from_executive,
              notification,
            ),
          ];
        case 2:
          // Send the notification to the executive who sent the message
          _a.sent();
          _a.label = 3;
        case 3:
          _i++;
          return [3 /*break*/, 1];
        case 4:
          // Mark messages as read
          return [4 /*yield*/, markMessagesAsRead(executiveName)];
        case 5:
          // Mark messages as read
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Sends a message from one executive to another
 */
function sendExecutiveMessage(fromExecutive, toExecutive, messageContent) {
  return __awaiter(this, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client_1.supabase.from("executive_messages").insert({
              from_executive: fromExecutive,
              to_executive: toExecutive,
              message_content: messageContent,
              status: "unread",
            }),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            console.error("Failed to send executive message:", error);
            throw new Error(
              "Failed to send executive message: ".concat(error.message),
            );
          }
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Generates a message from one executive to another
 */
function generateExecutiveMessage(
  executiveName,
  role,
  recipientName,
  recipientRole,
  topic,
) {
  return __awaiter(this, void 0, void 0, function () {
    var prompt, _a, data, error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          prompt = promptTemplates_1.generateMessageTemplate
            .replace("{executiveName}", executiveName)
            .replace("{role}", role)
            .replace("{recipientName}", recipientName)
            .replace("{recipientRole}", recipientRole)
            .replace("{topic}", topic);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("generate-text", {
              body: {
                prompt: prompt,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Failed to generate executive message:", error);
            throw new Error(
              "Failed to generate executive message: ".concat(error.message),
            );
          }
          return [2 /*return*/, data.content];
      }
    });
  });
}
