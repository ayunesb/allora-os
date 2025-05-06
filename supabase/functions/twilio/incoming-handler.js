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
exports.handleIncomingWhatsApp = handleIncomingWhatsApp;
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
// Initialize Supabase client
var supabaseUrl = "https://ofwxyctfzskeeniaaazw.supabase.co";
var supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
/**
 * Handles incoming WhatsApp messages
 * @param from Sender's phone number
 * @param body Message content
 * @param messageSid Twilio message ID
 * @param numMedia Number of media attachments
 * @param mediaContentType Media content type
 * @param mediaUrl Media URL
 * @returns AI-generated human-like response
 */
function handleIncomingWhatsApp(
  from,
  body,
  messageSid,
  numMedia,
  mediaContentType,
  mediaUrl,
) {
  return __awaiter(this, void 0, void 0, function () {
    var supabase, _a, leads, leadsError, responseMessage, lead, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          console.log(
            "Received WhatsApp from ".concat(from, ": ").concat(body),
          );
          _b.label = 1;
        case 1:
          _b.trys.push([1, 8, , 9]);
          supabase = (0, supabase_js_2_38_0_1.createClient)(
            supabaseUrl,
            supabaseServiceKey,
          );
          // Log the incoming message
          return [
            4 /*yield*/,
            supabase.from("inbound_messages").insert({
              platform: "whatsapp",
              from_number: from,
              message_content: body,
              message_sid: messageSid,
              has_media: numMedia !== "0",
              media_type: mediaContentType || null,
              media_url: mediaUrl || null,
              received_at: new Date().toISOString(),
            }),
          ];
        case 2:
          // Log the incoming message
          _b.sent();
          return [
            4 /*yield*/,
            supabase
              .from("leads")
              .select("id, name, status, campaigns(id, name, company_id)")
              .eq("phone", from.replace("whatsapp:", ""))
              .order("created_at", { ascending: false })
              .limit(1),
          ];
        case 3:
          (_a = _b.sent()), (leads = _a.data), (leadsError = _a.error);
          if (leadsError) {
            console.error("Error finding lead:", leadsError);
          }
          responseMessage =
            "Thank you for your message. Our team will get back to you shortly.";
          if (!(leads && leads.length > 0)) return [3 /*break*/, 5];
          lead = leads[0];
          // Log the communication for this lead
          return [
            4 /*yield*/,
            supabase.from("lead_communications").insert({
              lead_id: lead.id,
              type: "whatsapp",
              content: body,
              direction: "inbound",
              received_at: new Date().toISOString(),
            }),
          ];
        case 4:
          // Log the communication for this lead
          _b.sent();
          // Personalize response based on lead status
          if (lead.name) {
            switch (lead.status) {
              case "new":
                responseMessage = "Hi ".concat(
                  lead.name,
                  ", thanks for reaching out! Our team will contact you soon to discuss how we can help your business grow.",
                );
                break;
              case "contacted":
                responseMessage = "Hello ".concat(
                  lead.name,
                  ", we've received your message. Our representative will follow up with you shortly.",
                );
                break;
              case "qualified":
                responseMessage = "Thank you for your message, ".concat(
                  lead.name,
                  ". Your dedicated account manager will respond to you as soon as possible.",
                );
                break;
              default:
                responseMessage = "Thank you for your message, ".concat(
                  lead.name,
                  ". We'll get back to you shortly.",
                );
            }
          }
          return [3 /*break*/, 7];
        case 5:
          // No matching lead found, log as an unknown contact
          return [
            4 /*yield*/,
            supabase.from("unknown_contacts").insert({
              phone_number: from,
              last_message: body,
              last_contact: new Date().toISOString(),
            }),
          ];
        case 6:
          // No matching lead found, log as an unknown contact
          _b.sent();
          _b.label = 7;
        case 7:
          return [2 /*return*/, responseMessage];
        case 8:
          error_1 = _b.sent();
          console.error("Error handling incoming WhatsApp:", error_1);
          return [
            2 /*return*/,
            "Thanks for your message. We'll get back to you as soon as possible.",
          ];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
