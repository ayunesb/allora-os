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
exports.EnhancedVerificationChecklist = EnhancedVerificationChecklist;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var ChecklistProgress_1 = require("./ChecklistProgress");
var ChecklistCategory_1 = require("./ChecklistCategory");
var sonner_1 = require("sonner");
function EnhancedVerificationChecklist() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)([]),
    categories = _b[0],
    setCategories = _b[1];
  var _c = (0, react_1.useState)(0),
    completedItems = _c[0],
    setCompletedItems = _c[1];
  var _d = (0, react_1.useState)(0),
    totalItems = _d[0],
    setTotalItems = _d[1];
  // Initialize with default verification categories and items
  (0, react_1.useEffect)(function () {
    var defaultCategories = [
      {
        id: "system",
        name: "System Components",
        description: "Core system components and services",
        items: [
          {
            id: "system-1",
            name: "Database Connection",
            status: "completed",
            isRequired: true,
          },
          {
            id: "system-2",
            name: "Authentication Service",
            status: "completed",
            isRequired: true,
          },
          {
            id: "system-3",
            name: "Storage Service",
            status: "completed",
            isRequired: true,
          },
          {
            id: "system-4",
            name: "Edge Functions",
            status: "completed",
            isRequired: true,
          },
        ],
      },
      {
        id: "apis",
        name: "External APIs",
        description: "Third-party service connections",
        items: [
          {
            id: "api-1",
            name: "Stripe Integration",
            status: "completed",
            isRequired: true,
          },
          {
            id: "api-2",
            name: "Twilio Integration",
            status: "completed",
            isRequired: true,
          },
          {
            id: "api-3",
            name: "Postmark Integration",
            status: "completed",
            isRequired: true,
          },
          {
            id: "api-4",
            name: "OpenAI Integration",
            status: "completed",
            isRequired: true,
          },
          {
            id: "api-5",
            name: "Heygen Integration",
            status: "completed",
            isRequired: false,
          },
        ],
      },
      {
        id: "features",
        name: "Core Features",
        description: "Business-critical application features",
        items: [
          {
            id: "feature-1",
            name: "User Onboarding",
            status: "completed",
            isRequired: true,
          },
          {
            id: "feature-2",
            name: "AI Executive Team",
            status: "completed",
            isRequired: true,
          },
          {
            id: "feature-3",
            name: "Strategy Generation",
            status: "completed",
            isRequired: true,
          },
          {
            id: "feature-4",
            name: "Campaign Management",
            status: "completed",
            isRequired: true,
          },
          {
            id: "feature-5",
            name: "Lead Tracking",
            status: "completed",
            isRequired: true,
          },
          {
            id: "feature-6",
            name: "Communication Tools",
            status: "completed",
            isRequired: true,
          },
        ],
      },
      {
        id: "integrations",
        name: "External Integrations",
        description: "Connectivity with third-party platforms",
        items: [
          {
            id: "integration-1",
            name: "Zapier Webhooks",
            status: "completed",
            isRequired: false,
          },
          {
            id: "integration-2",
            name: "WhatsApp Business",
            status: "completed",
            isRequired: false,
          },
          {
            id: "integration-3",
            name: "Zoom Meetings",
            status: "completed",
            isRequired: false,
          },
          {
            id: "integration-4",
            name: "CRM Connectors",
            status: "completed",
            isRequired: false,
          },
        ],
      },
    ];
    setCategories(defaultCategories);
    // Calculate totals
    var total = defaultCategories.reduce(function (sum, category) {
      return sum + category.items.length;
    }, 0);
    var completed = defaultCategories.reduce(function (sum, category) {
      return (
        sum +
        category.items.filter(function (item) {
          return item.status === "completed";
        }).length
      );
    }, 0);
    setTotalItems(total);
    setCompletedItems(completed);
  }, []);
  var handleVerify = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var completed, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // This would be replaced with actual verification logic in a real implementation
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 2000);
              }),
            ];
          case 2:
            // This would be replaced with actual verification logic in a real implementation
            _a.sent();
            sonner_1.toast.success("Verification completed successfully!");
            // Update verification statuses (mock implementation)
            setCategories(function (prevCategories) {
              var newCategories = __spreadArray([], prevCategories, true);
              // Randomly set a few items to warning or in-progress for demonstration
              var randomIndex = Math.floor(Math.random() * totalItems);
              var count = 0;
              for (var i = 0; i < newCategories.length; i++) {
                for (var j = 0; j < newCategories[i].items.length; j++) {
                  if (count === randomIndex) {
                    newCategories[i].items[j].status = "warning";
                    newCategories[i].items[j].statusMessage =
                      "Needs attention before launch";
                  } else if (count === randomIndex + 1) {
                    newCategories[i].items[j].status = "in-progress";
                    newCategories[i].items[j].statusMessage =
                      "Still being configured";
                  }
                  count++;
                }
              }
              return newCategories;
            });
            completed = categories.reduce(function (sum, category) {
              return (
                sum +
                category.items.filter(function (item) {
                  return item.status === "completed";
                }).length
              );
            }, 0);
            setCompletedItems(completed);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Verification error:", error_1);
            sonner_1.toast.error("Failed to complete verification");
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-3",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Launch Verification Checklist",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "System verification for production readiness",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: handleVerify,
              disabled: isLoading,
              className: "gap-2",
              children: isLoading
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "h-4 w-4 animate-spin",
                      }),
                      "Verifying...",
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                        className: "h-4 w-4",
                      }),
                      "Verify",
                    ],
                  }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)(ChecklistProgress_1.ChecklistProgress, {
            completed: completedItems,
            total: totalItems,
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-6 space-y-6",
            children: categories.map(function (category) {
              return (0, jsx_runtime_1.jsx)(
                ChecklistCategory_1.ChecklistCategory,
                { category: category },
                category.id,
              );
            }),
          }),
        ],
      }),
    ],
  });
}
