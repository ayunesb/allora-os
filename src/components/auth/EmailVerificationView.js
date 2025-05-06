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
exports.default = EmailVerificationView;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var authHelpers_1 = require("@/utils/authHelpers");
var sonner_1 = require("sonner");
var react_router_dom_1 = require("react-router-dom");
function EmailVerificationView(_a) {
  var _this = this;
  var email = _a.email,
    onTryAgain = _a.onTryAgain,
    _b = _a.isNewSignup,
    isNewSignup = _b === void 0 ? false : _b,
    userId = _a.userId;
  var _c = (0, react_1.useState)(false),
    isResending = _c[0],
    setIsResending = _c[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  (0, react_1.useEffect)(
    function () {
      // If this is a new signup, we'll set a flag to redirect to onboarding
      if (isNewSignup && userId) {
        console.log(
          "New signup detected in EmailVerificationView, will redirect to onboarding",
        );
        sessionStorage.setItem("newUserSignup", "true");
        sessionStorage.setItem("pendingOnboardingUserId", userId);
      }
    },
    [isNewSignup, userId],
  );
  var handleResendEmail = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!email) {
              sonner_1.toast.error("No email address available");
              return [2 /*return*/];
            }
            setIsResending(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, authHelpers_1.resendVerificationEmail)(email),
            ];
          case 2:
            result = _a.sent();
            if (result.success) {
              sonner_1.toast.success(
                "Verification email resent. Please check your inbox.",
              );
            } else {
              sonner_1.toast.error(
                result.error || "Failed to resend verification email",
              );
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Resend verification error:", error_1);
            sonner_1.toast.error("An unexpected error occurred");
            return [3 /*break*/, 5];
          case 4:
            setIsResending(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleSignIn = function () {
    navigate("/login");
  };
  var handleGoToOnboarding = function () {
    console.log("Redirecting to onboarding from EmailVerificationView");
    navigate("/onboarding");
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full max-w-lg border-primary/10 shadow-lg",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "text-center space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className:
              "mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, {
              className: "h-8 w-8 text-primary",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-2xl font-bold",
            children: "Verify Your Email",
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            children: [
              "We've sent a verification email to ",
              (0, jsx_runtime_1.jsx)("span", {
                className: "font-medium",
                children: email,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "space-y-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "bg-muted p-4 rounded-md space-y-3",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                  className: "h-5 w-5 text-primary mr-2 mt-0.5",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "font-medium",
                      children: "Check your inbox",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Click the verification link in the email we just sent you",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                  className: "h-5 w-5 text-primary mr-2 mt-0.5",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "font-medium",
                      children: "After verification",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Return here and sign in to continue to your account",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex flex-col space-y-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "w-full flex space-x-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                className: "flex-1",
                onClick: handleResendEmail,
                disabled: isResending,
                children: isResending ? "Sending..." : "Resend Email",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                className: "flex-1",
                onClick: handleSignIn,
                children: "Sign In",
              }),
            ],
          }),
          isNewSignup &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "w-full",
              children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "link",
                className: "w-full text-muted-foreground",
                onClick: handleGoToOnboarding,
                children: "Skip verification for now",
              }),
            }),
          onTryAgain &&
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "ghost",
              className: "w-full mt-4 text-sm",
              onClick: onTryAgain,
              children: "Use a different email",
            }),
        ],
      }),
    ],
  });
}
