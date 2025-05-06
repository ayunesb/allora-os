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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var slider_1 = require("@/components/ui/slider");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var supabase_1 = require("@/backend/supabase");
var typography_1 = require("@/components/ui/typography");
var recharts_1 = require("recharts");
var initialFormState = {
  competitorName: "",
  marketShare: 0,
  strengthScore: 5,
  weaknessScore: 5,
  notes: "",
};
var CompetitorBenchmarking = function (_a) {
  var strategyId = _a.strategyId;
  var _b = (0, react_1.useState)([]),
    competitors = _b[0],
    setCompetitors = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)(false),
    isEditing = _d[0],
    setIsEditing = _d[1];
  var _e = (0, react_1.useState)(initialFormState),
    formState = _e[0],
    setFormState = _e[1];
  (0, react_1.useEffect)(
    function () {
      var fetchCompetitors = function () {
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
                    .from("competitor_benchmarks")
                    .select("*")
                    .eq("strategyId", strategyId)
                    .order("marketShare", { ascending: false }),
                ];
              case 2:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) throw error;
                setCompetitors(data || []);
                return [3 /*break*/, 5];
              case 3:
                error_1 = _b.sent();
                console.error("Error fetching competitors:", error_1);
                sonner_1.toast.error("Failed to load competitor data");
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
      fetchCompetitors();
    },
    [strategyId],
  );
  var handleInputChange = function (e) {
    var _a = e.target,
      name = _a.name,
      value = _a.value;
    setFormState(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}),
        (_a[name] = name === "marketShare" ? Number(value) : value),
        _a),
      );
    });
  };
  var handleSliderChange = function (name, value) {
    setFormState(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[name] = value[0]), _a),
      );
    });
  };
  var handleAddCompetitor = function () {
    setIsEditing(true);
    setFormState(initialFormState);
  };
  var handleEditCompetitor = function (competitor) {
    setIsEditing(true);
    setFormState({
      id: competitor.id,
      competitorName: competitor.competitorName,
      marketShare: competitor.marketShare,
      strengthScore: competitor.strengthScore,
      weaknessScore: competitor.weaknessScore,
      notes: competitor.notes || "",
    });
  };
  var handleCancelEdit = function () {
    setIsEditing(false);
    setFormState(initialFormState);
  };
  var handleSaveCompetitor = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error, _a, data_1, error, error_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!formState.competitorName.trim()) {
              sonner_1.toast.error("Competitor name is required");
              return [2 /*return*/];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 6, , 7]);
            if (!formState.id) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("competitor_benchmarks")
                .update({
                  competitorName: formState.competitorName,
                  marketShare: formState.marketShare,
                  strengthScore: formState.strengthScore,
                  weaknessScore: formState.weaknessScore,
                  notes: formState.notes,
                })
                .eq("id", formState.id),
            ];
          case 2:
            error = _b.sent().error;
            if (error) throw error;
            setCompetitors(function (prev) {
              return prev.map(function (c) {
                return c.id === formState.id
                  ? __assign(__assign({}, c), formState)
                  : c;
              });
            });
            sonner_1.toast.success("Competitor updated successfully");
            return [3 /*break*/, 5];
          case 3:
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("competitor_benchmarks")
                .insert([
                  {
                    strategyId: strategyId,
                    competitorName: formState.competitorName,
                    marketShare: formState.marketShare,
                    strengthScore: formState.strengthScore,
                    weaknessScore: formState.weaknessScore,
                    notes: formState.notes,
                    created_at: new Date().toISOString(),
                  },
                ])
                .select(),
            ];
          case 4:
            (_a = _b.sent()), (data_1 = _a.data), (error = _a.error);
            if (error) throw error;
            if (data_1 && data_1.length > 0) {
              setCompetitors(function (prev) {
                return __spreadArray(
                  __spreadArray([], prev, true),
                  [data_1[0]],
                  false,
                ).sort(function (a, b) {
                  return b.marketShare - a.marketShare;
                });
              });
              sonner_1.toast.success("Competitor added successfully");
            }
            _b.label = 5;
          case 5:
            setIsEditing(false);
            setFormState(initialFormState);
            return [3 /*break*/, 7];
          case 6:
            error_2 = _b.sent();
            console.error("Error saving competitor:", error_2);
            sonner_1.toast.error("Failed to save competitor data");
            return [3 /*break*/, 7];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDeleteCompetitor = function (id) {
    return __awaiter(void 0, void 0, void 0, function () {
      var error, error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("competitor_benchmarks")
                .delete()
                .eq("id", id),
            ];
          case 1:
            error = _a.sent().error;
            if (error) throw error;
            setCompetitors(function (prev) {
              return prev.filter(function (c) {
                return c.id !== id;
              });
            });
            sonner_1.toast.success("Competitor deleted successfully");
            return [3 /*break*/, 3];
          case 2:
            error_3 = _a.sent();
            console.error("Error deleting competitor:", error_3);
            sonner_1.toast.error("Failed to delete competitor");
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  // Prepare chart data
  var getChartData = function () {
    return competitors.map(function (comp) {
      return {
        name: comp.competitorName,
        marketShare: comp.marketShare,
        strength: comp.strengthScore,
        weakness: comp.weaknessScore,
        rating: comp.strengthScore - comp.weaknessScore,
      };
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "flex flex-row items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Competitor Benchmarking",
          }),
          !isEditing &&
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: handleAddCompetitor,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                  className: "mr-2 h-4 w-4",
                }),
                "Add Competitor",
              ],
            }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "py-6 text-center text-muted-foreground",
              children: "Loading competitor data...",
            })
          : isEditing
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "competitorName",
                        children: "Competitor Name",
                      }),
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "competitorName",
                        name: "competitorName",
                        value: formState.competitorName,
                        onChange: handleInputChange,
                        placeholder: "e.g., Acme Inc.",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "marketShare",
                        children: "Market Share (%)",
                      }),
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "marketShare",
                        name: "marketShare",
                        type: "number",
                        min: "0",
                        max: "100",
                        value: formState.marketShare,
                        onChange: handleInputChange,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsxs)(label_1.Label, {
                        className: "flex justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Strength Score (1-10)",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: formState.strengthScore,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                        min: 1,
                        max: 10,
                        step: 1,
                        value: [formState.strengthScore],
                        onValueChange: function (value) {
                          return handleSliderChange("strengthScore", value);
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsxs)(label_1.Label, {
                        className: "flex justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            children: "Weakness Score (1-10)",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: formState.weaknessScore,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                        min: 1,
                        max: 10,
                        step: 1,
                        value: [formState.weaknessScore],
                        onValueChange: function (value) {
                          return handleSliderChange("weaknessScore", value);
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "notes",
                        children: "Notes",
                      }),
                      (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                        id: "notes",
                        name: "notes",
                        value: formState.notes,
                        onChange: handleInputChange,
                        placeholder: "Add notes about this competitor...",
                        rows: 3,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-end gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        variant: "outline",
                        onClick: handleCancelEdit,
                        children: "Cancel",
                      }),
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        onClick: handleSaveCompetitor,
                        children: "Save",
                      }),
                    ],
                  }),
                ],
              })
            : competitors.length === 0
              ? (0, jsx_runtime_1.jsxs)("div", {
                  className: "py-12 text-center text-muted-foreground",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "mb-4",
                      children: "No competitor data has been added yet.",
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      onClick: handleAddCompetitor,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Add your first competitor",
                      ],
                    }),
                  ],
                })
              : (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "h-[300px]",
                      children: (0, jsx_runtime_1.jsx)(
                        recharts_1.ResponsiveContainer,
                        {
                          width: "100%",
                          height: "100%",
                          children: (0, jsx_runtime_1.jsxs)(
                            recharts_1.BarChart,
                            {
                              data: getChartData(),
                              margin: {
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  recharts_1.CartesianGrid,
                                  { strokeDasharray: "3 3" },
                                ),
                                (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                                  dataKey: "name",
                                }),
                                (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                                (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                                (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                                (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                                  dataKey: "marketShare",
                                  name: "Market Share %",
                                  fill: "#8884d8",
                                }),
                                (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                                  dataKey: "strength",
                                  name: "Strength",
                                  fill: "#82ca9d",
                                }),
                                (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                                  dataKey: "weakness",
                                  name: "Weakness",
                                  fill: "#ff8042",
                                }),
                              ],
                            },
                          ),
                        },
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.Table, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                            children: [
                              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                children: "Competitor",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                children: "Market Share",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                children: "Strength",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                children: "Weakness",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                children: "Net Rating",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                className: "text-right",
                                children: "Actions",
                              }),
                            ],
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                          children: competitors.map(function (competitor) {
                            return (0, jsx_runtime_1.jsxs)(
                              table_1.TableRow,
                              {
                                children: [
                                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                    className: "font-medium",
                                    children: competitor.competitorName,
                                  }),
                                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                                    children: [competitor.marketShare, "%"],
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                    children: (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex items-center",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "w-24 h-2 bg-gray-200 rounded-full overflow-hidden",
                                          children: (0, jsx_runtime_1.jsx)(
                                            "div",
                                            {
                                              className: "h-full bg-green-500",
                                              style: {
                                                width: "".concat(
                                                  (competitor.strengthScore /
                                                    10) *
                                                    100,
                                                  "%",
                                                ),
                                              },
                                            },
                                          ),
                                        }),
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "ml-2",
                                          children: competitor.strengthScore,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                    children: (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex items-center",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "w-24 h-2 bg-gray-200 rounded-full overflow-hidden",
                                          children: (0, jsx_runtime_1.jsx)(
                                            "div",
                                            {
                                              className: "h-full bg-red-500",
                                              style: {
                                                width: "".concat(
                                                  (competitor.weaknessScore /
                                                    10) *
                                                    100,
                                                  "%",
                                                ),
                                              },
                                            },
                                          ),
                                        }),
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "ml-2",
                                          children: competitor.weaknessScore,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                    className:
                                      competitor.strengthScore >
                                      competitor.weaknessScore
                                        ? "text-green-500"
                                        : "text-red-500",
                                    children:
                                      competitor.strengthScore -
                                      competitor.weaknessScore,
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                    className: "text-right",
                                    children: (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex justify-end gap-2",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          button_1.Button,
                                          {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: function () {
                                              return handleEditCompetitor(
                                                competitor,
                                              );
                                            },
                                            children: (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.Edit2,
                                              { className: "h-4 w-4" },
                                            ),
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          button_1.Button,
                                          {
                                            variant: "ghost",
                                            size: "icon",
                                            className:
                                              "text-destructive hover:text-destructive",
                                            onClick: function () {
                                              return handleDeleteCompetitor(
                                                competitor.id,
                                              );
                                            },
                                            children: (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.Trash2,
                                              { className: "h-4 w-4" },
                                            ),
                                          },
                                        ),
                                      ],
                                    }),
                                  }),
                                ],
                              },
                              competitor.id,
                            );
                          }),
                        }),
                      ],
                    }),
                    competitors.some(function (c) {
                      return c.notes;
                    }) &&
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "mt-4",
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "text-lg font-semibold mb-2",
                            children: "Competitor Notes",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "space-y-3",
                            children: competitors
                              .filter(function (c) {
                                return c.notes;
                              })
                              .map(function (competitor) {
                                return (0, jsx_runtime_1.jsx)(
                                  card_1.Card,
                                  {
                                    children: (0, jsx_runtime_1.jsxs)(
                                      card_1.CardContent,
                                      {
                                        className: "p-4",
                                        children: [
                                          (0, jsx_runtime_1.jsx)("h4", {
                                            className: "font-medium mb-1",
                                            children: competitor.competitorName,
                                          }),
                                          (0, jsx_runtime_1.jsx)(
                                            typography_1.TypographyP,
                                            { children: competitor.notes },
                                          ),
                                        ],
                                      },
                                    ),
                                  },
                                  "notes-".concat(competitor.id),
                                );
                              }),
                          }),
                        ],
                      }),
                  ],
                }),
      }),
    ],
  });
};
exports.default = CompetitorBenchmarking;
