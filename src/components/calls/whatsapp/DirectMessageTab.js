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
exports.default = DirectMessageTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var sonner_1 = require("sonner");
var twilioHelpers_1 = require("@/utils/twilioHelpers");
function DirectMessageTab(_a) {
  var _this = this;
  var phoneNumber = _a.phoneNumber,
    selectedLeadId = _a.selectedLeadId,
    onMessageSent = _a.onMessageSent,
    isLoadingMutation = _a.isLoadingMutation;
  var _b = (0, react_1.useState)(""),
    message = _b[0],
    setMessage = _b[1];
  var _c = (0, react_1.useState)(false),
    isSending = _c[0],
    setIsSending = _c[1];
  var handleSendMessage = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var formattedNumber, sentViaApi, communicationData, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!phoneNumber.trim()) {
              sonner_1.toast.error("Please enter a valid phone number");
              return [2 /*return*/];
            }
            if (!message.trim()) {
              sonner_1.toast.error("Please enter a message");
              return [2 /*return*/];
            }
            formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
            setIsSending(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 5, 6, 7]);
            return [
              4 /*yield*/,
              (0, twilioHelpers_1.sendWhatsApp)(
                formattedNumber,
                message,
                selectedLeadId,
              ),
            ];
          case 2:
            sentViaApi = _a.sent();
            if (!!sentViaApi) return [3 /*break*/, 4];
            window.open(
              "https://wa.me/"
                .concat(formattedNumber, "?text=")
                .concat(encodeURIComponent(message)),
              "_blank",
            );
            if (!selectedLeadId) return [3 /*break*/, 4];
            communicationData = {
              type: "whatsapp",
              status: "completed",
              notes: message,
              metadata: { initial_message: message, sent_via: "web_link" },
            };
            return [4 /*yield*/, onMessageSent(communicationData)];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            setMessage("");
            sonner_1.toast.success("WhatsApp message processed");
            return [3 /*break*/, 7];
          case 5:
            error_1 = _a.sent();
            console.error("Error with WhatsApp message:", error_1);
            sonner_1.toast.error("Failed to send WhatsApp message");
            return [3 /*break*/, 7];
          case 6:
            setIsSending(false);
            return [7 /*endfinally*/];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleOpenWhatsAppWeb = function () {
    var formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
    window.open(
      "https://wa.me/"
        .concat(formattedNumber, "?text=")
        .concat(encodeURIComponent(message)),
      "_blank",
    );
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "whatsapp-message",
            children: "Message",
          }),
          (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
            id: "whatsapp-message",
            placeholder: "Type your message here...",
            value: message,
            onChange: function (e) {
              return setMessage(e.target.value);
            },
            rows: 4,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex space-x-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSendMessage,
            disabled:
              isSending || isLoadingMutation || !phoneNumber || !message,
            className: "flex-1",
            children: isSending
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Sending...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Send, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Send via Twilio",
                  ],
                }),
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            onClick: handleOpenWhatsAppWeb,
            disabled: !phoneNumber || !message,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                className: "mr-2 h-4 w-4",
              }),
              "Open WhatsApp",
            ],
          }),
        ],
      }),
    ],
  });
}
