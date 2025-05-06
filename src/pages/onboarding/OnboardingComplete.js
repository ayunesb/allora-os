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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
var onboarding_1 = require("@/utils/onboarding");
var sonner_1 = require("sonner");
var OnboardingComplete = function () {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, AuthContext_1.useAuth)(),
    profile = _a.profile,
    refreshProfile = _a.refreshProfile;
  (0, react_1.useEffect)(
    function () {
      var finalizeOnboarding = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 3, , 4]);
                if (
                  !(
                    (profile === null || profile === void 0
                      ? void 0
                      : profile.id) && profile.company_id
                  )
                )
                  return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  (0, onboarding_1.completeOnboarding)(
                    profile.id,
                    profile.company_id,
                    profile.industry || "",
                  ),
                ];
              case 1:
                _a.sent();
                refreshProfile();
                _a.label = 2;
              case 2:
                return [3 /*break*/, 4];
              case 3:
                error_1 = _a.sent();
                console.error("Error completing onboarding:", error_1);
                return [3 /*break*/, 4];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      finalizeOnboarding();
    },
    [profile, refreshProfile],
  );
  var handleComplete = function () {
    sonner_1.toast.success("Onboarding completed successfully!");
    navigate("/dashboard");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container max-w-5xl mx-auto px-4 py-12",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center mb-8",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-4",
            children: "Setup Complete!",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-lg text-muted-foreground max-w-2xl mx-auto",
            children: "You're all set to start using Allora AI.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8 border-primary/20",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "text-center pb-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                className: "h-16 w-16 text-primary mx-auto mb-4",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-2xl",
                children: "Your AI Executive Team is Ready",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "text-center space-y-4 pb-8",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-lg",
                children:
                  "We've set up your AI executives based on your company profile. They're ready to help you make strategic decisions and grow your business.",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col items-center space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "font-medium",
                    children: "What's next?",
                  }),
                  (0, jsx_runtime_1.jsxs)("ul", {
                    className: "text-left space-y-2 max-w-md",
                    children: [
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-4 w-4 text-green-500",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Explore your AI Executive Boardroom",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-4 w-4 text-green-500",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Review suggested strategies",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-4 w-4 text-green-500",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Set up your first campaign",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("li", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-4 w-4 text-green-500",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Track leads and manage communications",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            className: "justify-center",
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              size: "lg",
              onClick: handleComplete,
              children: "Go to Dashboard",
            }),
          }),
        ],
      }),
    ],
  });
};
exports.default = OnboardingComplete;
