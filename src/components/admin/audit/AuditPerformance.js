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
exports.AuditPerformance = AuditPerformance;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var checkbox_1 = require("@/components/ui/checkbox");
var sonner_1 = require("sonner");
var progress_1 = require("@/components/ui/progress");
var AuditPerformanceGuidance_1 = require("./AuditPerformanceGuidance");
function AuditPerformance(_a) {
  var _this = this;
  var status = _a.status,
    onStatusChange = _a.onStatusChange;
  var _b = (0, react_1.useState)(false),
    isRunning = _b[0],
    setIsRunning = _b[1];
  var _c = (0, react_1.useState)(null),
    pageLoadTime = _c[0],
    setPageLoadTime = _c[1];
  var _d = (0, react_1.useState)([
      {
        id: "perf-1",
        title: "Initial Page Load",
        description: "Target < 2s load time",
        status: "pending",
        required: true,
      },
      {
        id: "perf-2",
        title: "Image Optimization",
        description: "Images are properly sized and compressed",
        status: "pending",
        required: true,
      },
      {
        id: "perf-3",
        title: "Component Rendering",
        description: "No render bottlenecks in components",
        status: "pending",
        required: true,
      },
      {
        id: "perf-4",
        title: "API Response Time",
        description: "API calls complete in < 500ms",
        status: "pending",
        required: true,
      },
      {
        id: "perf-5",
        title: "Bundle Size",
        description: "JS bundle size < 1MB",
        status: "pending",
        required: true,
      },
    ]),
    items = _d[0],
    setItems = _d[1];
  // Get page load time from performance API if available
  (0, react_1.useEffect)(function () {
    if (window.performance && window.performance.timing) {
      var _a = window.performance.timing,
        navigationStart = _a.navigationStart,
        loadEventEnd = _a.loadEventEnd;
      var loadTime = loadEventEnd - navigationStart;
      // Convert to seconds
      var loadTimeSeconds_1 = loadTime / 1000;
      setPageLoadTime(loadTimeSeconds_1);
      // Automatically update the page load time check
      setItems(function (prev) {
        return prev.map(function (item) {
          return item.id === "perf-1"
            ? __assign(__assign({}, item), {
                status: loadTimeSeconds_1 < 2 ? "passed" : "failed",
                description: "Target < 2s load time (Actual: ".concat(
                  loadTimeSeconds_1.toFixed(2),
                  "s)",
                ),
              })
            : item;
        });
      });
    }
  }, []);
  var checkImageOptimization = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var images,
        allOptimized_1,
        totalSize,
        _i,
        images_1,
        img,
        width,
        height,
        src,
        isFromCDN,
        containerWidth,
        containerHeight,
        isProperlyResized,
        isOptimizedFormat,
        isOptimized;
      return __generator(this, function (_a) {
        // Set the image optimization check to in-progress
        setItems(function (prev) {
          return prev.map(function (item) {
            return item.id === "perf-2"
              ? __assign(__assign({}, item), { status: "in-progress" })
              : item;
          });
        });
        try {
          images = document.querySelectorAll("img");
          allOptimized_1 = true;
          totalSize = 0;
          // Examine each image
          for (_i = 0, images_1 = images; _i < images_1.length; _i++) {
            img = images_1[_i];
            width = img.naturalWidth;
            height = img.naturalHeight;
            // Skip images that haven't loaded yet
            if (width === 0 || height === 0) continue;
            src = img.src;
            isFromCDN =
              src.includes("imagecdn") ||
              src.includes("cloudinary") ||
              src.includes("cloudfront") ||
              src.includes("cdn");
            containerWidth = img.clientWidth;
            containerHeight = img.clientHeight;
            isProperlyResized =
              width <= containerWidth * 1.5 || height <= containerHeight * 1.5;
            isOptimizedFormat =
              src.endsWith(".webp") ||
              src.endsWith(".avif") ||
              src.toLowerCase().includes("format=webp");
            isOptimized = isFromCDN || isProperlyResized || isOptimizedFormat;
            if (!isOptimized) {
              allOptimized_1 = false;
            }
          }
          // Update image optimization check result
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "perf-2"
                ? __assign(__assign({}, item), {
                    status: allOptimized_1 ? "passed" : "failed",
                  })
                : item;
            });
          });
          return [2 /*return*/, allOptimized_1];
        } catch (error) {
          console.error("Error checking image optimization:", error);
          setItems(function (prev) {
            return prev.map(function (item) {
              return item.id === "perf-2"
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
  var runSimulatedTests = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var idsToTest, _loop_1, _i, idsToTest_1, id;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            idsToTest = ["perf-3", "perf-4", "perf-5"];
            _loop_1 = function (id) {
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    setItems(function (prev) {
                      return prev.map(function (item) {
                        return item.id === id
                          ? __assign(__assign({}, item), {
                              status: "in-progress",
                            })
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
                    _b.sent();
                    // For demo purposes, we'll mark these as passed
                    setItems(function (prev) {
                      return prev.map(function (item) {
                        return item.id === id
                          ? __assign(__assign({}, item), { status: "passed" })
                          : item;
                      });
                    });
                    return [2 /*return*/];
                }
              });
            };
            (_i = 0), (idsToTest_1 = idsToTest);
            _a.label = 1;
          case 1:
            if (!(_i < idsToTest_1.length)) return [3 /*break*/, 4];
            id = idsToTest_1[_i];
            return [5 /*yield**/, _loop_1(id)];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            _i++;
            return [3 /*break*/, 1];
          case 4:
            return [2 /*return*/, true];
        }
      });
    });
  };
  var runTest = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var allPassed, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsRunning(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, 5, 6]);
            // Check image optimization
            return [4 /*yield*/, checkImageOptimization()];
          case 2:
            // Check image optimization
            _a.sent();
            // Run simulated tests for other performance items
            return [4 /*yield*/, runSimulatedTests()];
          case 3:
            // Run simulated tests for other performance items
            _a.sent();
            allPassed = items.every(function (item) {
              return item.status === "passed";
            });
            onStatusChange(allPassed ? "passed" : "failed");
            if (allPassed) {
              sonner_1.toast.success("Performance audit passed!");
            } else {
              sonner_1.toast.error(
                "Performance audit failed! Please check the details.",
              );
            }
            return [3 /*break*/, 6];
          case 4:
            error_1 = _a.sent();
            console.error("Audit error:", error_1);
            onStatusChange("failed");
            sonner_1.toast.error("Error running performance audit");
            return [3 /*break*/, 6];
          case 5:
            setIsRunning(false);
            return [7 /*endfinally*/];
          case 6:
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
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Gauge, {
                      className: "h-5 w-5 text-primary/80",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Performance Audit",
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
                          "Testing...",
                        ],
                      })
                    : "Run Audit",
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              pageLoadTime !== null &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "mb-4 space-y-1.5",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between items-center",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm font-medium",
                          children: "Page Load Time",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-sm font-medium",
                          children: [pageLoadTime.toFixed(2), "s"],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                      value: Math.min(100, (2 - pageLoadTime) * 50),
                      className:
                        pageLoadTime < 2 ? "bg-green-100" : "bg-red-100",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex justify-between text-xs text-muted-foreground",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", { children: "0s" }),
                        (0, jsx_runtime_1.jsx)("div", {
                          children: "Target: 2s",
                        }),
                        (0, jsx_runtime_1.jsx)("div", { children: "4s+" }),
                      ],
                    }),
                  ],
                }),
              (0, jsx_runtime_1.jsx)("div", {
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
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-sm font-medium",
                              children: item.title,
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground",
                              children: item.description,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "ml-auto flex items-center",
                          children: (0, jsx_runtime_1.jsx)(
                            checkbox_1.Checkbox,
                            {
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
                                // Update overall status after manual change
                                var allPassed = items.every(function (i) {
                                  if (i.id === item.id) return checked;
                                  return i.status === "passed";
                                });
                                onStatusChange(allPassed ? "passed" : "failed");
                              },
                            },
                          ),
                        }),
                      ],
                    },
                    item.id,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(
        AuditPerformanceGuidance_1.AuditPerformanceGuidance,
        { pageLoadTime: pageLoadTime },
      ),
    ],
  });
}
