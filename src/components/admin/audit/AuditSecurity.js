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
exports.AuditSecurity = AuditSecurity;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var checkbox_1 = require("@/components/ui/checkbox");
var sonner_1 = require("sonner");
function AuditSecurity(_a) {
  var _this = this;
  var status = _a.status,
    onStatusChange = _a.onStatusChange;
  var _b = (0, react_1.useState)(false),
    isRunning = _b[0],
    setIsRunning = _b[1];
  var _c = (0, react_1.useState)([
      {
        id: "sec-1",
        title: "JWT Authentication",
        description: "Token-based authentication is secure",
        status: "pending",
        required: true,
      },
      {
        id: "sec-2",
        title: "API Route Protection",
        description: "All API routes require authentication",
        status: "pending",
        required: true,
      },
      {
        id: "sec-3",
        title: "Rate Limiting",
        description: "API rate limiting is implemented",
        status: "pending",
        required: true,
      },
      {
        id: "sec-4",
        title: "SQL Injection Protection",
        description: "Database queries are properly parameterized",
        status: "pending",
        required: true,
      },
      {
        id: "sec-5",
        title: "Data Encryption",
        description: "Sensitive data is encrypted",
        status: "pending",
        required: true,
      },
      {
        id: "sec-6",
        title: "XSS Protection",
        description: "Protection against cross-site scripting",
        status: "pending",
        required: true,
      },
      {
        id: "sec-7",
        title: "GDPR Compliance",
        description: "User data handling meets GDPR requirements",
        status: "pending",
        required: true,
      },
      {
        id: "sec-8",
        title: "Query Performance",
        description: "Database queries execute within recommended time",
        status: "pending",
        required: true,
      },
    ]),
    items = _c[0],
    setItems = _c[1];
  var runTest = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _loop_1, i, allPassed, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsRunning(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            _loop_1 = function (i) {
              var passed;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    setItems(function (prev) {
                      return prev.map(function (item, idx) {
                        return idx === i
                          ? __assign(__assign({}, item), {
                              status: "in-progress",
                            })
                          : item;
                      });
                    });
                    return [
                      4 /*yield*/,
                      new Promise(function (resolve) {
                        return setTimeout(resolve, 700);
                      }),
                    ];
                  case 1:
                    _b.sent();
                    passed = true;
                    if (items[i].id === "sec-7") {
                      // GDPR compliance issue
                      passed = false;
                    }
                    if (items[i].id === "sec-8") {
                      // Query performance issue
                      passed = false;
                    }
                    setItems(function (prev) {
                      return prev.map(function (item, idx) {
                        return idx === i
                          ? __assign(__assign({}, item), {
                              status: passed ? "passed" : "failed",
                            })
                          : item;
                      });
                    });
                    return [2 /*return*/];
                }
              });
            };
            i = 0;
            _a.label = 2;
          case 2:
            if (!(i < items.length)) return [3 /*break*/, 5];
            return [5 /*yield**/, _loop_1(i)];
          case 3:
            _a.sent();
            _a.label = 4;
          case 4:
            i++;
            return [3 /*break*/, 2];
          case 5:
            allPassed = items.every(function (item) {
              return item.status === "passed";
            });
            onStatusChange(allPassed ? "passed" : "failed");
            if (allPassed) {
              sonner_1.toast.success("Security audit passed!");
            } else {
              sonner_1.toast.error(
                "Security issues found! Please review and fix.",
              );
            }
            return [3 /*break*/, 8];
          case 6:
            error_1 = _a.sent();
            console.error("Security audit error:", error_1);
            onStatusChange("failed");
            sonner_1.toast.error("Error running security audit");
            return [3 /*break*/, 8];
          case 7:
            setIsRunning(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  var getStatusIcon = function (status) {
    switch (status) {
      case "passed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
          className: "h-4 w-4 text-green-500",
        });
      case "failed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "h-4 w-4 text-red-500",
        });
      case "in-progress":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
          className: "h-4 w-4 animate-spin text-blue-500",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-4 w-4 text-muted-foreground",
        });
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                  className: "h-5 w-5 text-primary/80",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Security Audit",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: runTest,
              disabled: isRunning,
              size: "sm",
              children: isRunning
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "h-4 w-4 mr-2 animate-spin",
                      }),
                      "Scanning...",
                    ],
                  })
                : "Run Security Scan",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-4",
          children: items.map(function (item) {
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className: "flex items-start space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "mt-0.5",
                    children: getStatusIcon(item.status),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-sm font-medium",
                            children: item.title,
                          }),
                          !item.required &&
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded",
                              children: "Optional",
                            }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-xs text-muted-foreground",
                        children: item.description,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "ml-auto flex items-center",
                    children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                      id: item.id,
                      checked: item.status === "passed",
                      disabled: isRunning,
                      onCheckedChange: function (checked) {
                        setItems(function (prev) {
                          return prev.map(function (i) {
                            return i.id === item.id
                              ? __assign(__assign({}, i), {
                                  status: checked ? "passed" : "failed",
                                })
                              : i;
                          });
                        });
                      },
                    }),
                  }),
                ],
              },
              item.id,
            );
          }),
        }),
      }),
    ],
  });
}
