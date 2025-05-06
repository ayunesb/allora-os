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
var cors_ts_1 = require("../_shared/cors.ts");
var incoming_handler_ts_1 = require("./incoming-handler.ts");
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var method,
      url,
      urlObj,
      path,
      formData,
      from,
      body,
      messageSid,
      numMedia,
      mediaContentType,
      mediaUrl,
      responseMessage,
      twimlResponse,
      _a,
      recipient,
      message,
      accountSid,
      authToken,
      fromNumber,
      toNumber,
      twilioEndpoint,
      formData,
      response_1,
      result,
      formData,
      messageSid,
      messageStatus,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          // Handle CORS
          if (req.method === "OPTIONS") {
            return [
              2 /*return*/,
              new Response("ok", { headers: cors_ts_1.corsHeaders }),
            ];
          }
          _b.label = 1;
        case 1:
          _b.trys.push([1, 11, , 12]);
          (method = req.method), (url = req.url);
          urlObj = new URL(url);
          path = urlObj.pathname.split("/").pop();
          if (!(path === "incoming" && method === "POST"))
            return [3 /*break*/, 4];
          return [4 /*yield*/, req.formData()];
        case 2:
          formData = _b.sent();
          from = formData.get("From");
          body = formData.get("Body");
          messageSid = formData.get("MessageSid");
          numMedia = formData.get("NumMedia");
          mediaContentType = formData.get("MediaContentType0");
          mediaUrl = formData.get("MediaUrl0");
          return [
            4 /*yield*/,
            (0, incoming_handler_ts_1.handleIncomingWhatsApp)(
              from,
              body,
              messageSid,
              numMedia,
              mediaContentType,
              mediaUrl,
            ),
          ];
        case 3:
          responseMessage = _b.sent();
          twimlResponse =
            '\n        <?xml version="1.0" encoding="UTF-8"?>\n        <Response>\n          <Message>'.concat(
              responseMessage,
              "</Message>\n        </Response>\n      ",
            );
          return [
            2 /*return*/,
            new Response(twimlResponse, {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/xml",
              }),
            }),
          ];
        case 4:
          if (!(path === "send" && method === "POST")) return [3 /*break*/, 8];
          return [4 /*yield*/, req.json()];
        case 5:
          (_a = _b.sent()), (recipient = _a.recipient), (message = _a.message);
          if (!recipient || !message) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Recipient and message are required" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
          authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
          fromNumber =
            Deno.env.get("TWILIO_WHATSAPP_NUMBER") || "whatsapp:+14155238886";
          if (!accountSid || !authToken) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Twilio credentials not configured" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          toNumber = recipient.startsWith("whatsapp:")
            ? recipient
            : "whatsapp:".concat(recipient);
          twilioEndpoint = "https://api.twilio.com/2010-04-01/Accounts/".concat(
            accountSid,
            "/Messages.json",
          );
          formData = new FormData();
          formData.append("To", toNumber);
          formData.append("From", fromNumber);
          formData.append("Body", message);
          return [
            4 /*yield*/,
            fetch(twilioEndpoint, {
              method: "POST",
              headers: {
                Authorization: "Basic ".concat(
                  btoa("".concat(accountSid, ":").concat(authToken)),
                ),
              },
              body: formData,
            }),
          ];
        case 6:
          response_1 = _b.sent();
          return [4 /*yield*/, response_1.json()];
        case 7:
          result = _b.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(result), {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
              status: response_1.ok ? 200 : 400,
            }),
          ];
        case 8:
          if (!(path === "status" && method === "POST"))
            return [3 /*break*/, 10];
          return [4 /*yield*/, req.formData()];
        case 9:
          formData = _b.sent();
          messageSid = formData.get("MessageSid");
          messageStatus = formData.get("MessageStatus");
          console.log(
            "Message "
              .concat(messageSid, " status updated to: ")
              .concat(messageStatus),
          );
          // Here you would typically update the message status in your database
          // This is a placeholder for that logic
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 10:
          // If no route matches
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Not found" }), {
              status: 404,
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 11:
          error_1 = _b.sent();
          console.error("Error processing request:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: error_1.message || "Internal server error",
              }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 12:
          return [2 /*return*/];
      }
    });
  });
});
