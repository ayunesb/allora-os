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
exports.default = DocumentLegalContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var useCompliance_1 = require("@/hooks/useCompliance");
var dateUtils_1 = require("@/utils/dateUtils");
function DocumentLegalContent(_a) {
  var _this = this;
  var title = _a.title,
    description = _a.description,
    content = _a.content;
  var _b = (0, react_1.useState)(false),
    isRefreshing = _b[0],
    setIsRefreshing = _b[1];
  var compliance = (0, useCompliance_1.useCompliance)();
  var handleRefresh = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsRefreshing(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, compliance.checkForUpdates()];
          case 2:
            _a.sent();
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error checking for updates:", error_1);
            return [3 /*break*/, 5];
          case 4:
            setIsRefreshing(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg",
            children: title,
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: description,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "prose dark:prose-invert max-w-none",
            children: content
              ? (0, jsx_runtime_1.jsx)("p", { children: content })
              : (0, jsx_runtime_1.jsx)("div", {
                  className: "text-center py-6",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "No content available for this document.",
                  }),
                }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between border-t pt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center text-xs text-muted-foreground",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                    className: "h-3 w-3 mr-1",
                  }),
                  "Last updated ",
                  compliance.lastChecked
                    ? (0, dateUtils_1.formatRelativeTime)(
                        compliance.lastChecked,
                      )
                    : "Never",
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: handleRefresh,
                disabled: isRefreshing,
                children: isRefreshing
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                          className: "h-3.5 w-3.5 mr-1.5 animate-spin",
                        }),
                        "Checking...",
                      ],
                    })
                  : "Check for Updates",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
