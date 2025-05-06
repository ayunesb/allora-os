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
exports.default = StrategyWizardModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var executiveBots_1 = require("@/backend/executiveBots");
function StrategyWizardModal(_a) {
  var _this = this;
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    onCreateStrategy = _a.onCreateStrategy;
  var _b = (0, react_1.useState)(1),
    currentStep = _b[0],
    setCurrentStep = _b[1];
  var _c = (0, react_1.useState)(false),
    isGenerating = _c[0],
    setIsGenerating = _c[1];
  var _d = (0, react_1.useState)([]),
    generatedStrategies = _d[0],
    setGeneratedStrategies = _d[1];
  var _e = (0, react_1.useState)(null),
    selectedStrategyIndex = _e[0],
    setSelectedStrategyIndex = _e[1];
  // Form inputs
  var _f = (0, react_1.useState)(""),
    goal = _f[0],
    setGoal = _f[1];
  var _g = (0, react_1.useState)(""),
    market = _g[0],
    setMarket = _g[1];
  var _h = (0, react_1.useState)("Medium"),
    riskAppetite = _h[0],
    setRiskAppetite = _h[1];
  var _j = (0, react_1.useState)(""),
    budget = _j[0],
    setBudget = _j[1];
  var resetForm = function () {
    setCurrentStep(1);
    setIsGenerating(false);
    setGeneratedStrategies([]);
    setSelectedStrategyIndex(null);
    setGoal("");
    setMarket("");
    setRiskAppetite("Medium");
    setBudget("");
  };
  var handleClose = function () {
    resetForm();
    onClose();
  };
  var handleGenerateStrategies = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var getRandomExecutive, mockStrategies, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsGenerating(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // In a real app, this would call an API to generate strategies based on input
            // For now, we'll simulate a delay and generate mock data
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 2000);
              }),
            ];
          case 2:
            // In a real app, this would call an API to generate strategies based on input
            // For now, we'll simulate a delay and generate mock data
            _a.sent();
            getRandomExecutive = function () {
              var allExecs = __spreadArray(
                __spreadArray(
                  __spreadArray([], executiveBots_1.executiveBots.ceo, true),
                  executiveBots_1.executiveBots.cfo,
                  true,
                ),
                executiveBots_1.executiveBots.strategy,
                true,
              );
              return allExecs[Math.floor(Math.random() * allExecs.length)];
            };
            mockStrategies = [
              {
                title: "".concat(market, " Market Expansion Strategy"),
                description: "Strategically enter the "
                  .concat(
                    market,
                    " market with a focused value proposition targeting specific customer segments. This approach will ",
                  )
                  .concat(
                    goal.toLowerCase(),
                    " through careful market positioning and competitive differentiation.",
                  ),
                risk: riskAppetite,
                risk_level: riskAppetite,
                executiveBot: getRandomExecutive(),
                impact: "High",
                timeframe:
                  riskAppetite === "Low" ? "6-12 months" : "3-6 months",
                progress: 0,
                status: "Draft",
              },
              {
                title: "Innovative ".concat(goal, " Initiative"),
                description: "Launch a disruptive approach to "
                  .concat(
                    goal.toLowerCase(),
                    " by leveraging cutting-edge technology and strategic partnerships. This ",
                  )
                  .concat(
                    riskAppetite.toLowerCase(),
                    "-risk strategy focuses on creating new opportunities in the ",
                  )
                  .concat(market, " sector."),
                risk: riskAppetite,
                risk_level: riskAppetite,
                executiveBot: getRandomExecutive(),
                impact: "High",
                timeframe: "6-9 months",
                progress: 0,
                status: "Draft",
              },
              {
                title: ""
                  .concat(riskAppetite, " Risk ")
                  .concat(market, " Strategy"),
                description: "A carefully calibrated approach to achieve "
                  .concat(goal, " in the competitive ")
                  .concat(
                    market,
                    " landscape. This strategy balances growth objectives with well-defined risk parameters and clear success metrics.",
                  ),
                risk: riskAppetite,
                risk_level: riskAppetite,
                executiveBot: getRandomExecutive(),
                impact: riskAppetite === "Low" ? "Medium" : "High",
                timeframe:
                  riskAppetite === "High" ? "3-4 months" : "8-12 months",
                progress: 0,
                status: "Draft",
              },
            ];
            setGeneratedStrategies(mockStrategies);
            setCurrentStep(2);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error generating strategies:", error_1);
            return [3 /*break*/, 5];
          case 4:
            setIsGenerating(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleCreateSelectedStrategy = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var selectedStrategy, result, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (selectedStrategyIndex === null) return [2 /*return*/];
            selectedStrategy = generatedStrategies[selectedStrategyIndex];
            setIsGenerating(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              onCreateStrategy(
                __assign(__assign({}, selectedStrategy), {
                  company_id: "",
                  risk: selectedStrategy.risk,
                  risk_level: selectedStrategy.risk_level,
                }),
              ),
            ];
          case 2:
            result = _a.sent();
            if (result) {
              handleClose();
            }
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Error creating strategy:", error_2);
            return [3 /*break*/, 5];
          case 4:
            setIsGenerating(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: handleClose,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className:
        "sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-[#0f1526] border border-gray-800 text-white",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              className: "text-xl font-bold",
              children: "AI Strategy Wizard",
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              className: "text-gray-400",
              children:
                currentStep === 1
                  ? "Let our AI help you create a powerful growth strategy for your business."
                  : "Choose the strategy that best fits your needs or go back to refine your inputs.",
            }),
          ],
        }),
        currentStep === 1
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-5 py-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "goal",
                      className: "text-gray-300",
                      children: "What is your primary business goal?",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "goal",
                      placeholder:
                        "e.g., Increase market share, Expand to new regions, Launch a new product",
                      value: goal,
                      onChange: function (e) {
                        return setGoal(e.target.value);
                      },
                      className:
                        "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "market",
                      className: "text-gray-300",
                      children: "What market or industry are you focusing on?",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "market",
                      placeholder:
                        "e.g., SaaS, Retail, Healthcare, Financial Services",
                      value: market,
                      onChange: function (e) {
                        return setMarket(e.target.value);
                      },
                      className:
                        "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "risk",
                      className: "text-gray-300",
                      children: "What is your risk appetite?",
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: riskAppetite,
                      onValueChange: function (value) {
                        return setRiskAppetite(value);
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          id: "risk",
                          className:
                            "bg-gray-800/50 border-gray-700 text-white",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select risk level" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          className: "bg-gray-800 border-gray-700 text-white",
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "Low",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className:
                                      "h-2 w-2 rounded-full bg-green-500 mr-2",
                                  }),
                                  " Low Risk",
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "Medium",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className:
                                      "h-2 w-2 rounded-full bg-amber-500 mr-2",
                                  }),
                                  " Medium Risk",
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "High",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className:
                                      "h-2 w-2 rounded-full bg-red-500 mr-2",
                                  }),
                                  " High Risk",
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex items-start gap-2 mt-2 p-2 border border-amber-800/30 rounded-md bg-amber-900/20",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                          className:
                            "h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0",
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          className: "text-xs text-amber-300",
                          children: [
                            riskAppetite === "Low" &&
                              "Low risk strategies prioritize stability and predictable outcomes with minimal chance of setbacks.",
                            riskAppetite === "Medium" &&
                              "Medium risk strategies balance opportunity and safety, accepting moderate uncertainty for good reward potential.",
                            riskAppetite === "High" &&
                              "High risk strategies pursue maximum growth and disruption, accepting significant uncertainty for exceptional potential returns.",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "budget",
                      className: "text-gray-300",
                      children: "What is your approximate budget? (Optional)",
                    }),
                    (0, jsx_runtime_1.jsx)(input_1.Input, {
                      id: "budget",
                      placeholder: "e.g., $5,000, $50,000, $250,000+",
                      value: budget,
                      onChange: function (e) {
                        return setBudget(e.target.value);
                      },
                      className:
                        "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500",
                    }),
                  ],
                }),
              ],
            })
          : (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-6 py-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "flex items-center gap-2 p-3 bg-blue-900/20 border border-blue-800/30 rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.LightbulbIcon, {
                      className: "h-5 w-5 text-blue-400",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-blue-200",
                      children:
                        "Our AI has generated these strategies based on your inputs. Select one to implement.",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "space-y-4",
                  children: generatedStrategies.map(function (strategy, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className:
                          "p-4 border rounded-lg cursor-pointer transition-all ".concat(
                            selectedStrategyIndex === index
                              ? "border-purple-500 bg-purple-900/20"
                              : "border-gray-700 bg-gray-800/30 hover:bg-gray-700/30",
                          ),
                        onClick: function () {
                          return setSelectedStrategyIndex(index);
                        },
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex justify-between mb-2",
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-medium text-white",
                                children: strategy.title,
                              }),
                              selectedStrategyIndex === index &&
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                                  className: "h-5 w-5 text-purple-400",
                                }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-gray-300 mb-3",
                            children: strategy.description,
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex flex-wrap gap-2 text-xs",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "px-2 py-1 rounded-full \n                      ".concat(
                                    strategy.risk === "Low"
                                      ? "bg-green-900/40 text-green-300"
                                      : strategy.risk === "Medium"
                                        ? "bg-amber-800/40 text-amber-300"
                                        : "bg-red-900/40 text-red-300",
                                  ),
                                children: [strategy.risk, " Risk"],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "px-2 py-1 rounded-full bg-blue-900/40 text-blue-300",
                                children: [strategy.impact, " Impact"],
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "px-2 py-1 rounded-full bg-purple-900/40 text-purple-300",
                                children: strategy.timeframe,
                              }),
                            ],
                          }),
                        ],
                      },
                      index,
                    );
                  }),
                }),
              ],
            }),
        (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
          className: "flex-col sm:flex-row gap-2",
          children:
            currentStep === 1
              ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: handleGenerateStrategies,
                  className:
                    "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 w-full",
                  disabled: !goal || !market || isGenerating,
                  children: isGenerating
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                            className: "mr-2 h-4 w-4 animate-spin",
                          }),
                          "Generating Strategies...",
                        ],
                      })
                    : "Generate AI Strategies",
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      onClick: function () {
                        return setCurrentStep(1);
                      },
                      className:
                        "sm:w-auto w-full border-gray-700 text-white bg-transparent hover:bg-gray-800",
                      disabled: isGenerating,
                      children: "Back",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      onClick: handleCreateSelectedStrategy,
                      className:
                        "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 sm:w-auto w-full",
                      disabled: selectedStrategyIndex === null || isGenerating,
                      children: isGenerating
                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                                className: "mr-2 h-4 w-4 animate-spin",
                              }),
                              "Creating Strategy...",
                            ],
                          })
                        : "Create Selected Strategy",
                    }),
                  ],
                }),
        }),
      ],
    }),
  });
}
