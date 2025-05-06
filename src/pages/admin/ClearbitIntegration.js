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
exports.default = ClearbitIntegration;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var tabs_1 = require("@/components/ui/tabs");
var typography_1 = require("@/components/ui/typography");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var CompanyAPIContext_1 = require("@/context/CompanyAPIContext");
var useClearbitTool_1 = require("@/utils/langchain/hooks/useClearbitTool");
function ClearbitIntegration() {
  var _this = this;
  var _a = (0, CompanyAPIContext_1.useCompanyAPI)(),
    setApiKey = _a.setApiKey,
    hasApiKey = _a.hasApiKey;
  var _b = (0, react_1.useState)(""),
    apiKey = _b[0],
    setApiKeyInput = _b[1];
  var _c = (0, react_1.useState)(""),
    testValue = _c[0],
    setTestValue = _c[1];
  var _d = (0, react_1.useState)(null),
    testResult = _d[0],
    setTestResult = _d[1];
  var _e = (0, react_1.useState)(null),
    testError = _e[0],
    setTestError = _e[1];
  var _f = (0, react_1.useState)(false),
    testLoading = _f[0],
    setTestLoading = _f[1];
  var _g = (0, react_1.useState)("company"),
    activeTab = _g[0],
    setActiveTab = _g[1];
  var _h = (0, useClearbitTool_1.useClearbitTool)(),
    lookupCompany = _h.lookupCompany,
    lookupPerson = _h.lookupPerson,
    isLoading = _h.isLoading;
  var saveApiKey = function () {
    if (!apiKey.trim()) {
      sonner_1.toast.error("Please enter an API key");
      return;
    }
    setApiKey("clearbit", apiKey.trim());
    sonner_1.toast.success("Clearbit API key saved successfully");
  };
  var runTest = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!testValue.trim()) {
              sonner_1.toast.error(
                "Please enter a ".concat(
                  activeTab === "company" ? "domain" : "email",
                  " to test",
                ),
              );
              return [2 /*return*/];
            }
            setTestResult(null);
            setTestError(null);
            setTestLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            result = void 0;
            if (!(activeTab === "company")) return [3 /*break*/, 3];
            return [4 /*yield*/, lookupCompany(testValue)];
          case 2:
            result = _a.sent();
            return [3 /*break*/, 5];
          case 3:
            return [4 /*yield*/, lookupPerson(testValue)];
          case 4:
            result = _a.sent();
            _a.label = 5;
          case 5:
            if (
              typeof result === "string" &&
              (result.includes("not found") || result.includes("failed"))
            ) {
              setTestError(result);
            } else {
              setTestResult(result);
            }
            return [3 /*break*/, 8];
          case 6:
            err_1 = _a.sent();
            setTestError(
              err_1 instanceof Error
                ? err_1.message
                : "An error occurred during the test",
            );
            return [3 /*break*/, 8];
          case 7:
            setTestLoading(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container space-y-6 py-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Clearbit Integration",
          }),
          hasApiKey("clearbit") &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center text-green-600",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                  className: "h-5 w-5 mr-2",
                }),
                " Connected",
              ],
            }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
        children:
          "Connect Clearbit to enrich leads and companies with detailed information. This integration enables AI agents to look up company and person data.",
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Clearbit API Configuration",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Enter your Clearbit API key to connect to the Clearbit Enrichment API.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "clearbit-key",
                    children: "Clearbit API Key",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex space-x-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "clearbit-key",
                        type: "password",
                        placeholder: "sk_...",
                        value: apiKey,
                        onChange: function (e) {
                          return setApiKeyInput(e.target.value);
                        },
                      }),
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        onClick: saveApiKey,
                        children: "Save",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "You can find your API key in the Clearbit dashboard.",
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      hasApiKey("clearbit") &&
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Test Clearbit Integration",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "Test the connection by looking up a company or person.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                  defaultValue: "company",
                  value: activeTab,
                  onValueChange: setActiveTab,
                  children: [
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                      className: "mb-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                          value: "company",
                          children: "Company Lookup",
                        }),
                        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                          value: "person",
                          children: "Person Lookup",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                      value: "company",
                      className: "space-y-4",
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "test-domain",
                            children: "Company Domain",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex space-x-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(input_1.Input, {
                                id: "test-domain",
                                placeholder: "example.com",
                                value: testValue,
                                onChange: function (e) {
                                  return setTestValue(e.target.value);
                                },
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                onClick: runTest,
                                disabled: testLoading,
                                children: testLoading ? "Testing..." : "Test",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                      value: "person",
                      className: "space-y-4",
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "test-email",
                            children: "Email Address",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex space-x-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(input_1.Input, {
                                id: "test-email",
                                placeholder: "person@example.com",
                                value: testValue,
                                onChange: function (e) {
                                  return setTestValue(e.target.value);
                                },
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                onClick: runTest,
                                disabled: testLoading,
                                children: testLoading ? "Testing..." : "Test",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                testError &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "mt-4 p-4 bg-red-50 text-red-800 rounded-md flex items-start",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                        className: "h-5 w-5 mr-2 flex-shrink-0 mt-0.5",
                      }),
                      (0, jsx_runtime_1.jsx)("p", { children: testError }),
                    ],
                  }),
                testResult &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "mt-4 p-4 bg-green-50 text-green-800 rounded-md",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center mb-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                            className: "h-5 w-5 mr-2",
                          }),
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "font-medium",
                            children: "Lookup successful!",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "space-y-2 mt-2",
                        children: Object.entries(testResult).map(function (_a) {
                          var key = _a[0],
                            value = _a[1];
                          return (0, jsx_runtime_1.jsxs)(
                            "div",
                            {
                              children: [
                                (0, jsx_runtime_1.jsxs)("span", {
                                  className: "font-medium",
                                  children: [key, ": "],
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: value ? String(value) : "N/A",
                                }),
                              ],
                            },
                            key,
                          );
                        }),
                      }),
                    ],
                  }),
              ],
            }),
          ],
        }),
    ],
  });
}
