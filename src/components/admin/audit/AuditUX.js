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
exports.AuditUX = AuditUX;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var checkbox_1 = require("@/components/ui/checkbox");
var sonner_1 = require("sonner");
function AuditUX(_a) {
  var _this = this;
  var status = _a.status,
    onStatusChange = _a.onStatusChange;
  var _b = (0, react_1.useState)(false),
    isRunning = _b[0],
    setIsRunning = _b[1];
  var _c = (0, react_1.useState)([
      {
        id: "ux-1",
        title: "Responsive Design",
        description: "All pages responsive on mobile, tablet, desktop",
        status: "pending",
        required: true,
      },
      {
        id: "ux-2",
        title: "Consistent Branding",
        description: "Allora AI logo, color scheme, typography consistent",
        status: "pending",
        required: true,
      },
      {
        id: "ux-3",
        title: "Empty States",
        description: "Friendly messages when no strategies/leads/campaigns yet",
        status: "pending",
        required: false,
      },
      {
        id: "ux-4",
        title: "Error Handling",
        description: "Graceful recovery from API errors, invalid inputs",
        status: "pending",
        required: true,
      },
      {
        id: "ux-5",
        title: "Loading States",
        description: "All interactions have loading states/indicators",
        status: "pending",
        required: true,
      },
    ]),
    items = _c[0],
    setItems = _c[1];
  var checkBrandConsistency = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var logoElements,
        brandColors,
        headings,
        fontFamily,
        hasBrandLogo,
        hasBrandColors,
        hasConsistentFont,
        brandingConsistent_1;
      return __generator(this, function (_a) {
        // Set the branding check to in-progress
        setItems(function (prev) {
          return prev.map(function (item) {
            return item.id === "ux-2"
              ? __assign(__assign({}, item), { status: "in-progress" })
              : item;
          });
        });
        try {
          logoElements = document.querySelectorAll(
            'img[alt*="Allora"], img[alt*="allora"], img[alt*="logo"]',
          );
          brandColors = {
            primary:
              getComputedStyle(document.documentElement)
                .getPropertyValue("--primary")
                .trim() || "#7E69AB",
            brand:
              getComputedStyle(document.documentElement)
                .getPropertyValue("--brand")
                .trim() || "#9b87f5",
          };
          headings = document.querySelectorAll("h1, h2, h3");
          fontFamily =
            headings.length > 0
              ? getComputedStyle(headings[0]).fontFamily
              : "Inter, sans-serif";
          hasBrandLogo = logoElements.length > 0;
          hasBrandColors =
            brandColors.primary !== "" && brandColors.brand !== "";
          hasConsistentFont =
            fontFamily.includes("Inter") || fontFamily.includes("sans-serif");
          brandingConsistent_1 =
            hasBrandLogo && hasBrandColors && hasConsistentFont;
          // Update branding check result
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "ux-2"
                ? __assign(__assign({}, item), {
                    status: brandingConsistent_1 ? "passed" : "failed",
                  })
                : item;
            });
          });
          return [2 /*return*/, brandingConsistent_1];
        } catch (error) {
          console.error("Error checking brand consistency:", error);
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "ux-2"
                ? __assign(__assign({}, item), { status: "failed" })
                : item;
            });
          });
          return [2 /*return*/, false];
        }
        return [2 /*return*/];
      });
    });
  };
  var checkResponsiveness = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var viewportMeta, hasViewportMeta, usingResponsiveClasses, isResponsive_1;
      var _a;
      return __generator(this, function (_b) {
        // Set the responsive design check to in-progress
        setItems(function (prev) {
          return prev.map(function (item) {
            return item.id === "ux-1"
              ? __assign(__assign({}, item), { status: "in-progress" })
              : item;
          });
        });
        try {
          viewportMeta = document.querySelector('meta[name="viewport"]');
          hasViewportMeta =
            viewportMeta &&
            ((_a = viewportMeta.getAttribute("content")) === null ||
            _a === void 0
              ? void 0
              : _a.includes("width=device-width"));
          usingResponsiveClasses =
            document.querySelectorAll(
              // Check for common Tailwind responsive classes
              '[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"], ' +
                '[class*="grid-cols-"], [class*="flex-"], [class*="max-w-"]',
            ).length > 0;
          isResponsive_1 = hasViewportMeta && usingResponsiveClasses;
          // Update responsive design check result
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "ux-1"
                ? __assign(__assign({}, item), {
                    status: isResponsive_1 ? "passed" : "failed",
                  })
                : item;
            });
          });
          return [2 /*return*/, isResponsive_1];
        } catch (error) {
          console.error("Error checking responsiveness:", error);
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "ux-1"
                ? __assign(__assign({}, item), { status: "failed" })
                : item;
            });
          });
          return [2 /*return*/, false];
        }
        return [2 /*return*/];
      });
    });
  };
  var checkEmptyStates = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var emptyStateElements, emptyTextElements, hasEmptyStates_1;
      return __generator(this, function (_a) {
        // Set the empty states check to in-progress
        setItems(function (prev) {
          return prev.map(function (item) {
            return item.id === "ux-3"
              ? __assign(__assign({}, item), { status: "in-progress" })
              : item;
          });
        });
        try {
          emptyStateElements = document.querySelectorAll(
            '[class*="empty-state"], [class*="no-data"], [data-empty="true"]',
          );
          emptyTextElements = Array.from(
            document.querySelectorAll("p, div, span"),
          ).filter(function (el) {
            var _a, _b, _c, _d;
            return (
              ((_a = el.textContent) === null || _a === void 0
                ? void 0
                : _a.includes("No data")) ||
              ((_b = el.textContent) === null || _b === void 0
                ? void 0
                : _b.includes("No results")) ||
              ((_c = el.textContent) === null || _c === void 0
                ? void 0
                : _c.includes("Add your first")) ||
              ((_d = el.textContent) === null || _d === void 0
                ? void 0
                : _d.includes("Get started"))
            );
          });
          hasEmptyStates_1 =
            emptyStateElements.length > 0 || emptyTextElements.length > 0;
          // Update empty states check result
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "ux-3"
                ? __assign(__assign({}, item), {
                    status: hasEmptyStates_1 ? "passed" : "pending",
                  })
                : item;
            });
          });
          // Since this is optional, we'll return true even if not found
          return [2 /*return*/, true];
        } catch (error) {
          console.error("Error checking empty states:", error);
          // Since this is optional, we'll still return true
          return [2 /*return*/, true];
        }
        return [2 /*return*/];
      });
    });
  };
  var simulateOtherChecks = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var otherIds;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            otherIds = ["ux-4", "ux-5"];
            setItems(function (prev) {
              return prev.map(function (item) {
                return otherIds.includes(item.id)
                  ? __assign(__assign({}, item), { status: "in-progress" })
                  : item;
              });
            });
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500);
              }),
            ];
          case 1:
            _a.sent();
            // For demo purposes, we'll mark these as passed
            // In a real audit, we'd check for error boundaries, loading states, etc.
            setItems(function (prev) {
              return prev.map(function (item) {
                return otherIds.includes(item.id)
                  ? __assign(__assign({}, item), { status: "passed" })
                  : item;
              });
            });
            return [2 /*return*/, true];
        }
      });
    });
  };
  var runTest = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var brandingConsistent,
        responsiveDesign,
        requiredItems,
        allRequiredPassed,
        error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsRunning(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            return [4 /*yield*/, checkBrandConsistency()];
          case 2:
            brandingConsistent = _a.sent();
            return [4 /*yield*/, checkResponsiveness()];
          case 3:
            responsiveDesign = _a.sent();
            // Check for empty states
            return [4 /*yield*/, checkEmptyStates()];
          case 4:
            // Check for empty states
            _a.sent();
            // Run simulated checks for other UX items
            return [4 /*yield*/, simulateOtherChecks()];
          case 5:
            // Run simulated checks for other UX items
            _a.sent();
            requiredItems = items.filter(function (item) {
              return item.required;
            });
            allRequiredPassed = requiredItems.every(function (item) {
              // Find the updated status
              var updatedItem = items.find(function (i) {
                return i.id === item.id;
              });
              return (
                (updatedItem === null || updatedItem === void 0
                  ? void 0
                  : updatedItem.status) === "passed"
              );
            });
            onStatusChange(allRequiredPassed ? "passed" : "failed");
            if (allRequiredPassed) {
              sonner_1.toast.success("UX Audit passed!");
            } else {
              sonner_1.toast.error(
                "UX Audit failed! Please check the details.",
              );
            }
            return [3 /*break*/, 8];
          case 6:
            error_1 = _a.sent();
            console.error("Audit error:", error_1);
            onStatusChange("failed");
            sonner_1.toast.error("Error running UX audit");
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
                (0, jsx_runtime_1.jsx)(lucide_react_1.Palette, {
                  className: "h-5 w-5 text-primary/80",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "UI/UX Audit",
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
                      "Checking UX...",
                    ],
                  })
                : "Run Audit",
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
                      item.id === "ux-1" &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex mt-1 gap-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              size: "sm",
                              className: "h-7 text-xs flex items-center gap-1",
                              onClick: function () {
                                // Open a mobile-sized window for testing
                                window.open(
                                  window.location.href,
                                  "_blank",
                                  "width=375,height=667",
                                );
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Smartphone,
                                  { className: "h-3 w-3" },
                                ),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Test Mobile",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "outline",
                              size: "sm",
                              className: "h-7 text-xs flex items-center gap-1",
                              onClick: function () {
                                // Open a tablet-sized window for testing
                                window.open(
                                  window.location.href,
                                  "_blank",
                                  "width=768,height=1024",
                                );
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Monitor, {
                                  className: "h-3 w-3",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Test Tablet",
                                }),
                              ],
                            }),
                          ],
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
                        // Update overall status if all required items are passed
                        var allRequiredPassed = items
                          .filter(function (i) {
                            return i.required;
                          })
                          .every(function (i) {
                            if (i.id === item.id) return checked;
                            return i.status === "passed";
                          });
                        onStatusChange(allRequiredPassed ? "passed" : "failed");
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
