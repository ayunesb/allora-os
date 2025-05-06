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
exports.default = SignUpNew;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var SignupForm_1 = require("@/components/auth/SignupForm");
var EmailVerificationView_1 = require("@/components/auth/EmailVerificationView");
var SignupLayout_1 = require("@/components/auth/SignupLayout");
var LegalAcceptanceModal_1 = require("@/components/auth/LegalAcceptanceModal");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
function SignUpNew() {
  var _this = this;
  var _a;
  var _b = (0, react_1.useState)(false),
    isSubmitted = _b[0],
    setIsSubmitted = _b[1];
  var _c = (0, react_1.useState)(""),
    userEmail = _c[0],
    setUserEmail = _c[1];
  var _d = (0, react_1.useState)(null),
    newUser = _d[0],
    setNewUser = _d[1]; // Using any here to bypass the incompatible types
  var _e = (0, react_1.useState)(false),
    showLegalModal = _e[0],
    setShowLegalModal = _e[1];
  var _f = (0, react_1.useState)(null),
    signupError = _f[0],
    setSignupError = _f[1];
  var _g = (0, react_1.useState)(null),
    legalError = _g[0],
    setLegalError = _g[1];
  var _h = (0, react_1.useState)(0),
    retryCount = _h[0],
    setRetryCount = _h[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  (0, react_1.useEffect)(
    function () {
      // Retrieve email from sessionStorage when component mounts or isSubmitted changes
      if (isSubmitted) {
        var email = sessionStorage.getItem("signupEmail") || "";
        setUserEmail(email);
      }
      // Check if user was redirected from email verification
      var emailVerified = new URLSearchParams(window.location.search).get(
        "emailVerified",
      );
      if (emailVerified === "true") {
        sonner_1.toast.success("Email verified successfully! Please log in.");
        navigate("/login");
      }
    },
    [isSubmitted, navigate],
  );
  var handleUser = function (user) {
    if (!user.id) {
      setSignupError("Failed to retrieve user information after signup.");
      return;
    }
    console.log("Signup success, user:", user.id);
    setNewUser(user);
    setShowLegalModal(true);
    setSignupError(null);
  };
  var handleSubmitSuccess = function (user) {
    handleUser(user);
  };
  var handleTryAgain = function () {
    setIsSubmitted(false);
    setSignupError(null);
    setLegalError(null);
  };
  var handleLegalAcceptance = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setLegalError(null);
        setRetryCount(0);
        // Store a flag that this is a new user that needs onboarding
        sessionStorage.setItem("newUserSignup", "true");
        // After legal acceptance, show verification screen but also prepare for onboarding
        console.log(
          "Legal acceptance completed. User will be redirected to onboarding after verification.",
        );
        setShowLegalModal(false);
        setIsSubmitted(true);
        return [2 /*return*/];
      });
    });
  };
  var handleModalClose = function () {
    // If the modal is closed without acceptance, sign the user out
    // as they need to accept the terms to use the platform
    client_1.supabase.auth.signOut().then(function () {
      sonner_1.toast.info(
        "Sign up cancelled. You must accept the terms to create an account.",
      );
      setShowLegalModal(false);
      setIsSubmitted(false);
      setNewUser(null);
    });
  };
  var handleRetryLegalAcceptance = function () {
    if (retryCount < 3) {
      setRetryCount(function (prev) {
        return prev + 1;
      });
      setLegalError(null);
      setShowLegalModal(true);
    } else {
      // Too many retries, sign out and start over
      client_1.supabase.auth.signOut().then(function () {
        sonner_1.toast.error(
          "There seems to be an issue with legal acceptance. Please try signing up again.",
        );
        navigate("/signup");
      });
    }
  };
  if (isSubmitted) {
    var userId =
      (_a = newUser === null || newUser === void 0 ? void 0 : newUser.id) !==
        null && _a !== void 0
        ? _a
        : null; // Ensure `id` is properly typed
    return (0, jsx_runtime_1.jsxs)(SignupLayout_1.default, {
      children: [
        (0, jsx_runtime_1.jsx)(EmailVerificationView_1.default, {
          email: userEmail,
          onTryAgain: handleTryAgain,
          isNewSignup: true,
          userId: userId,
        }),
        legalError &&
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            className: "mt-4 border-destructive bg-destructive/10",
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-start gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                    className: "h-5 w-5 text-destructive mt-0.5",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium text-destructive",
                        children: "Legal Acceptance Error",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children: legalError,
                      }),
                      (0, jsx_runtime_1.jsx)("button", {
                        onClick: handleRetryLegalAcceptance,
                        className: "text-sm text-primary mt-2 hover:underline",
                        children: "Retry Legal Acceptance",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(SignupLayout_1.default, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "w-full max-w-lg border-primary/10 shadow-lg",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "text-center space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center",
                children: (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
                  className: "h-8 w-8 text-primary",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-2xl font-bold",
                children: "Join Allora AI",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Create your account to access AI-powered business strategies",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              signupError &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "bg-destructive/10 border border-destructive rounded-md p-3 mb-4 text-sm text-destructive",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", { children: signupError }),
                    (0, jsx_runtime_1.jsx)("button", {
                      onClick: handleTryAgain,
                      className: "text-primary hover:underline mt-1 text-sm",
                      children: "Try again",
                    }),
                  ],
                }),
              (0, jsx_runtime_1.jsx)(SignupForm_1.default, {
                onSubmitSuccess: handleSubmitSuccess,
              }),
            ],
          }),
        ],
      }),
      showLegalModal &&
        newUser &&
        (0, jsx_runtime_1.jsx)(LegalAcceptanceModal_1.LegalAcceptanceModal, {
          isOpen: showLegalModal,
          userId: newUser.id,
          onClose: handleModalClose,
          onAccept: handleLegalAcceptance,
        }),
    ],
  });
}
