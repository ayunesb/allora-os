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
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var recharts_1 = require("recharts");
var typography_1 = require("@/components/ui/typography");
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
var StrategyRoiCalculator = function (_a) {
  var strategyId = _a.strategyId;
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    roiData = _c[0],
    setRoiData = _c[1];
  // Form state
  var _d = (0, react_1.useState)(0),
    initialInvestment = _d[0],
    setInitialInvestment = _d[1];
  var _e = (0, react_1.useState)(0),
    projectedRevenue = _e[0],
    setProjectedRevenue = _e[1];
  var _f = (0, react_1.useState)(12),
    timeframeMonths = _f[0],
    setTimeframeMonths = _f[1];
  var _g = (0, react_1.useState)(0),
    annualCosts = _g[0],
    setAnnualCosts = _g[1];
  var _h = (0, react_1.useState)(undefined),
    actualRevenue = _h[0],
    setActualRevenue = _h[1];
  var _j = (0, react_1.useState)(undefined),
    actualCosts = _j[0],
    setActualCosts = _j[1];
  // Calculated values
  var _k = (0, react_1.useState)(0),
    projectedROI = _k[0],
    setProjectedROI = _k[1];
  var _l = (0, react_1.useState)(undefined),
    actualROI = _l[0],
    setActualROI = _l[1];
  // Load existing ROI data
  (0, react_1.useEffect)(
    function () {
      var fetchRoiData = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var _a, data, error, error_1;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                setIsLoading(true);
                _b.label = 1;
              case 1:
                _b.trys.push([1, 3, 4, 5]);
                return [
                  4 /*yield*/,
                  supabase_1.supabase
                    .from("strategy_roi")
                    .select("*")
                    .eq("strategyId", strategyId)
                    .single(),
                ];
              case 2:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) {
                  if (error.code !== "PGRST116") {
                    // PGRST116 is "no rows returned" which is expected if no ROI data exists yet
                    console.error("Error fetching ROI data:", error);
                    sonner_1.toast.error("Failed to load ROI data");
                  }
                } else if (data) {
                  setRoiData(data);
                  setInitialInvestment(data.initialInvestment);
                  setProjectedRevenue(data.projectedRevenue);
                  setTimeframeMonths(data.timeframeMonths);
                  setAnnualCosts(data.annualCosts);
                  setProjectedROI(data.projectedROI);
                  if (data.actualRevenue !== undefined)
                    setActualRevenue(data.actualRevenue);
                  if (data.actualCosts !== undefined)
                    setActualCosts(data.actualCosts);
                  if (data.actualROI !== undefined)
                    setActualROI(data.actualROI);
                }
                return [3 /*break*/, 5];
              case 3:
                error_1 = _b.sent();
                console.error("Unexpected error:", error_1);
                sonner_1.toast.error("An unexpected error occurred");
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
      fetchRoiData();
    },
    [strategyId],
  );
  // Calculate projected ROI whenever inputs change
  (0, react_1.useEffect)(
    function () {
      if (initialInvestment > 0) {
        // Convert annual costs to the specified timeframe
        var timeframeCosts = annualCosts * (timeframeMonths / 12);
        var totalCosts = initialInvestment + timeframeCosts;
        if (totalCosts > 0) {
          var roi = ((projectedRevenue - totalCosts) / totalCosts) * 100;
          setProjectedROI(Number(roi.toFixed(2)));
        }
      }
    },
    [initialInvestment, projectedRevenue, timeframeMonths, annualCosts],
  );
  // Calculate actual ROI when actual data is provided
  (0, react_1.useEffect)(
    function () {
      if (
        actualRevenue !== undefined &&
        actualCosts !== undefined &&
        actualCosts > 0
      ) {
        var roi = ((actualRevenue - actualCosts) / actualCosts) * 100;
        setActualROI(Number(roi.toFixed(2)));
      }
    },
    [actualRevenue, actualCosts],
  );
  // Save ROI data
  var handleSave = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var roiDataToSave, error, error, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 5, , 6]);
            roiDataToSave = {
              strategyId: strategyId,
              initialInvestment: initialInvestment,
              projectedRevenue: projectedRevenue,
              timeframeMonths: timeframeMonths,
              annualCosts: annualCosts,
              projectedROI: projectedROI,
              actualRevenue: actualRevenue,
              actualCosts: actualCosts,
              actualROI: actualROI,
              lastUpdated: new Date().toISOString(),
            };
            if (!(roiData === null || roiData === void 0 ? void 0 : roiData.id))
              return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("strategy_roi")
                .update(roiDataToSave)
                .eq("id", roiData.id),
            ];
          case 1:
            error = _a.sent().error;
            if (error) throw error;
            sonner_1.toast.success("ROI data updated successfully");
            return [3 /*break*/, 4];
          case 2:
            return [
              4 /*yield*/,
              supabase_1.supabase.from("strategy_roi").insert([roiDataToSave]),
            ];
          case 3:
            error = _a.sent().error;
            if (error) throw error;
            sonner_1.toast.success("ROI data saved successfully");
            _a.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            error_2 = _a.sent();
            console.error("Error saving ROI data:", error_2);
            sonner_1.toast.error("Failed to save ROI data");
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  // Prepare chart data
  var getChartData = function () {
    var chartData = [
      { name: "Initial Investment", value: initialInvestment },
      { name: "Ongoing Costs", value: annualCosts * (timeframeMonths / 12) },
      { name: "Projected Revenue", value: projectedRevenue },
    ];
    if (actualRevenue !== undefined && actualCosts !== undefined) {
      chartData.push(
        { name: "Actual Costs", value: actualCosts },
        { name: "Actual Revenue", value: actualRevenue },
      );
    }
    return chartData;
  };
  var COLORS = ["#0088FE", "#FF8042", "#00C49F", "#8884d8", "#82ca9d"];
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "ROI Calculator",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "py-6 text-center text-muted-foreground",
              children: "Loading ROI calculator...",
            })
          : (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-6 md:grid-cols-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "initialInvestment",
                          children: "Initial Investment ($)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "initialInvestment",
                          type: "number",
                          value: initialInvestment,
                          onChange: function (e) {
                            return setInitialInvestment(Number(e.target.value));
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "projectedRevenue",
                          children: "Projected Revenue ($)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "projectedRevenue",
                          type: "number",
                          value: projectedRevenue,
                          onChange: function (e) {
                            return setProjectedRevenue(Number(e.target.value));
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "timeframeMonths",
                          children: "Timeframe (Months)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "timeframeMonths",
                          type: "number",
                          value: timeframeMonths,
                          onChange: function (e) {
                            return setTimeframeMonths(Number(e.target.value));
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "annualCosts",
                          children: "Annual Ongoing Costs ($)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "annualCosts",
                          type: "number",
                          value: annualCosts,
                          onChange: function (e) {
                            return setAnnualCosts(Number(e.target.value));
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "pt-4 border-t",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "actualRevenue",
                          children: "Actual Revenue ($) (Optional)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "actualRevenue",
                          type: "number",
                          value:
                            actualRevenue === undefined ? "" : actualRevenue,
                          onChange: function (e) {
                            return setActualRevenue(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            );
                          },
                          placeholder: "Enter once strategy is implemented",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "actualCosts",
                          children: "Actual Costs ($) (Optional)",
                        }),
                        (0, jsx_runtime_1.jsx)(input_1.Input, {
                          id: "actualCosts",
                          type: "number",
                          value: actualCosts === undefined ? "" : actualCosts,
                          onChange: function (e) {
                            return setActualCosts(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            );
                          },
                          placeholder: "Enter once strategy is implemented",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      onClick: handleSave,
                      className: "w-full",
                      children: "Save ROI Data",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted p-4 rounded-md",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-lg font-semibold mb-2",
                          children: "Projected ROI",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-3xl font-bold text-primary",
                          children: [projectedROI, "%"],
                        }),
                        (0, jsx_runtime_1.jsxs)(typography_1.TypographyP, {
                          className: "text-sm mt-1",
                          children: ["Over ", timeframeMonths, " months"],
                        }),
                      ],
                    }),
                    actualROI !== undefined &&
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "bg-muted p-4 rounded-md",
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "text-lg font-semibold mb-2",
                            children: "Actual ROI",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "text-3xl font-bold ".concat(
                              actualROI >= 0
                                ? "text-green-500"
                                : "text-red-500",
                            ),
                            children: [actualROI, "%"],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            className: "text-sm mt-1",
                            children:
                              "Based on reported actual costs and revenue",
                          }),
                        ],
                      }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "h-[300px] mt-4",
                      children: (0, jsx_runtime_1.jsx)(
                        recharts_1.ResponsiveContainer,
                        {
                          width: "100%",
                          height: "100%",
                          children: (0, jsx_runtime_1.jsxs)(
                            recharts_1.PieChart,
                            {
                              children: [
                                (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                                  data: getChartData(),
                                  cx: "50%",
                                  cy: "50%",
                                  labelLine: false,
                                  outerRadius: 80,
                                  fill: "#8884d8",
                                  dataKey: "value",
                                  label: function (_a) {
                                    var name = _a.name,
                                      percent = _a.percent;
                                    return ""
                                      .concat(name, ": ")
                                      .concat((percent * 100).toFixed(0), "%");
                                  },
                                  children: getChartData().map(
                                    function (entry, index) {
                                      return (0, jsx_runtime_1.jsx)(
                                        recharts_1.Cell,
                                        { fill: COLORS[index % COLORS.length] },
                                        "cell-".concat(index),
                                      );
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
                                  formatter: function (value) {
                                    return "$".concat(value);
                                  },
                                }),
                                (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                              ],
                            },
                          ),
                        },
                      ),
                    }),
                  ],
                }),
              ],
            }),
      }),
    ],
  });
};
exports.default = StrategyRoiCalculator;
