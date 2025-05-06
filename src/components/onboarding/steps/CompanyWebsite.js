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
exports.CompanyWebsite = CompanyWebsite;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useCompanyWebsite_1 = require("@/hooks/useCompanyWebsite");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
function CompanyWebsite(_a) {
  var _this = this;
  var onCompanyDataFetched = _a.onCompanyDataFetched;
  var _b = (0, useCompanyWebsite_1.useCompanyWebsite)(),
    companyWebsite = _b.companyWebsite,
    setCompanyWebsite = _b.setCompanyWebsite,
    isScrapingData = _b.isScrapingData,
    scrapeCompanyData = _b.scrapeCompanyData;
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var handleSubmit = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var success;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            setError(null);
            if (!companyWebsite.trim()) {
              setError("Please enter your company website");
              return [2 /*return*/];
            }
            return [4 /*yield*/, scrapeCompanyData()];
          case 1:
            success = _a.sent();
            onCompanyDataFetched(success);
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Company Website",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground mt-1",
            children:
              "Enter your company website to automatically fetch company information or continue without it.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          className: "pt-6",
          children: (0, jsx_runtime_1.jsxs)("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsxs)(label_1.Label, {
                    htmlFor: "company-website",
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                        className: "h-4 w-4",
                      }),
                      "Company Website (Optional)",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "company-website",
                        placeholder: "www.yourcompany.com",
                        value: companyWebsite,
                        onChange: function (e) {
                          return setCompanyWebsite(e.target.value);
                        },
                        className: error ? "border-destructive" : "",
                        disabled: isScrapingData,
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        type: "submit",
                        disabled: isScrapingData || !companyWebsite.trim(),
                        children: [
                          isScrapingData
                            ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                                className: "h-4 w-4 animate-spin mr-2",
                              })
                            : (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                                className: "h-4 w-4 mr-2",
                              }),
                          isScrapingData ? "Fetching..." : "Fetch",
                        ],
                      }),
                    ],
                  }),
                  error &&
                    (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                      variant: "destructive",
                      className: "py-2 mt-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                          className: "h-4 w-4",
                        }),
                        (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                          className: "ml-2 text-xs",
                          children: error,
                        }),
                      ],
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-sm text-muted-foreground",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    children: "This will attempt to fetch:",
                  }),
                  (0, jsx_runtime_1.jsxs)("ul", {
                    className: "list-disc pl-5 mt-1 space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "Company name",
                      }),
                      (0, jsx_runtime_1.jsx)("li", { children: "Industry" }),
                      (0, jsx_runtime_1.jsx)("li", { children: "Description" }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "Company size",
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: "Products/Services",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex justify-between pt-2",
                children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                  type: "button",
                  variant: "ghost",
                  onClick: function () {
                    return onCompanyDataFetched(false);
                  },
                  disabled: isScrapingData,
                  children: "Skip this step",
                }),
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
