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
exports.default = ExecutiveTeamIntro;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var ExecutiveTeamCarousel_1 = require("./ExecutiveTeamCarousel");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ExecutiveTeamIntro(_a) {
  var _this = this;
  var executiveTeamEnabled = _a.executiveTeamEnabled,
    setExecutiveTeamEnabled = _a.setExecutiveTeamEnabled,
    riskAppetite = _a.riskAppetite,
    companyName = _a.companyName,
    onComplete = _a.onComplete,
    isLoading = _a.isLoading;
  var _b = react_1.default.useState(true),
    whatsAppConsent = _b[0],
    setWhatsAppConsent = _b[1];
  var _c = react_1.default.useState(true),
    emailConsent = _c[0],
    setEmailConsent = _c[1];
  var _d = react_1.default.useState(null),
    errorMessage = _d[0],
    setErrorMessage = _d[1];
  var _e = react_1.default.useState(false),
    isSubmitting = _e[0],
    setIsSubmitting = _e[1];
  var handleCompleteSetup = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            // Clear any previous error messages
            setErrorMessage(null);
            if (isSubmitting) return [2 /*return*/]; // Prevent multiple submissions
            setIsSubmitting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            console.log("Completing setup with preferences:", {
              whatsAppConsent: whatsAppConsent,
              emailConsent: emailConsent,
              executiveTeamEnabled: executiveTeamEnabled,
            });
            // Save communication preferences to company details
            return [4 /*yield*/, onComplete()];
          case 2:
            // Save communication preferences to company details
            _a.sent(); // Call the onComplete function which returns a Promise
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error completing setup:", error_1);
            setErrorMessage(
              error_1.message || "Failed to complete setup. Please try again.",
            );
            return [3 /*break*/, 5];
          case 4:
            setIsSubmitting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-2xl font-semibold text-center",
        children: "Meet Your Executive AI Team",
      }),
      (0, jsx_runtime_1.jsxs)("p", {
        className: "text-center text-muted-foreground",
        children: [
          "Based on your risk profile (",
          riskAppetite,
          "), we've assembled the perfect executive team for ",
          companyName,
          ".",
        ],
      }),
      (0, jsx_runtime_1.jsx)(ExecutiveTeamCarousel_1.ExecutiveTeamCarousel, {
        executives: [
          {
            id: "1",
            name: "Alex Morgan",
            role: "ceo",
            title: "CEO",
            specialty: "Strategic Planning & Leadership",
            avatar: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png",
          },
          {
            id: "2",
            name: "Jordan Chen",
            role: "cfo",
            title: "CFO",
            specialty: "Financial Planning & Risk Management",
            avatar: "/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png",
          },
          {
            id: "3",
            name: "Taylor Reynolds",
            role: "cmo",
            title: "CMO",
            specialty: "Marketing Strategy & Growth",
            avatar: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png",
          },
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "mt-8",
        children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          className: "pt-6",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Communication Preferences",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)("input", {
                        type: "checkbox",
                        id: "whatsapp-consent",
                        className: "mt-1",
                        checked: whatsAppConsent,
                        onChange: function (e) {
                          return setWhatsAppConsent(e.target.checked);
                        },
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("label", {
                            htmlFor: "whatsapp-consent",
                            className: "font-medium block",
                            children: "WhatsApp Business Messages",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children:
                              "I agree to receive business messages via WhatsApp from Allora AI. I understand I can text STOP at any time to opt out.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-start gap-3",
                    children: [
                      (0, jsx_runtime_1.jsx)("input", {
                        type: "checkbox",
                        id: "email-consent",
                        className: "mt-1",
                        checked: emailConsent,
                        onChange: function (e) {
                          return setEmailConsent(e.target.checked);
                        },
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("label", {
                            htmlFor: "email-consent",
                            className: "font-medium block",
                            children: "Email Communications",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children:
                              "I agree to receive email communications from Allora AI. Each email will include an unsubscribe option.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex justify-center mt-8",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          onClick: handleCompleteSetup,
          disabled: isLoading || isSubmitting,
          size: "lg",
          className: "w-full max-w-md",
          children:
            isLoading || isSubmitting
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Processing...",
                  ],
                })
              : "Complete Setup & Launch Dashboard",
        }),
      }),
      errorMessage &&
        (0, jsx_runtime_1.jsx)("div", {
          className: "text-center text-red-500 mt-4",
          children: errorMessage,
        }),
    ],
  });
}
