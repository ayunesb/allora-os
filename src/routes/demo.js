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
exports.default = DemoRoute;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useAuth_1 = require("@/hooks/useAuth");
var isDemoTenant_1 = require("@/utils/isDemoTenant");
var alert_1 = require("@/components/ui/alert");
var button_1 = require("@/components/ui/button");
var useCompanyId_1 = require("@/hooks/useCompanyId");
function DemoRoute() {
  var _this = this;
  var user = (0, useAuth_1.useAuth)().user;
  var tenantId = (0, useCompanyId_1.useCompanyId)();
  var _a = (0, react_1.useState)(null),
    isDemo = _a[0],
    setIsDemo = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  (0, react_1.useEffect)(
    function () {
      var checkDemoStatus = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var demo;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!tenantId) return [3 /*break*/, 2];
                return [
                  4 /*yield*/,
                  (0, isDemoTenant_1.isDemoTenant)(tenantId),
                ];
              case 1:
                demo = _a.sent();
                setIsDemo(demo);
                return [3 /*break*/, 3];
              case 2:
                setIsDemo(false);
                _a.label = 3;
              case 3:
                setIsLoading(false);
                return [2 /*return*/];
            }
          });
        });
      };
      checkDemoStatus();
    },
    [tenantId],
  );
  // While checking demo status
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className:
        "container mx-auto p-6 flex items-center justify-center min-h-[60vh]",
      children: (0, jsx_runtime_1.jsx)("div", {
        className:
          "animate-spin rounded-full h-8 w-8 border-b-2 border-primary",
      }),
    });
  }
  // If not in demo mode, redirect to dashboard
  if (isDemo === false) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/dashboard",
      replace: true,
    });
  }
  var demoExpirationTime = 24; // hours
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen flex flex-col",
    children: [
      (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
        className:
          "rounded-none border-t-0 border-x-0 bg-amber-50 dark:bg-amber-900/20",
        children: [
          (0, jsx_runtime_1.jsxs)(alert_1.AlertTitle, {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsx)("span", { children: "Demo Mode" }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: function () {
                  return navigate("/dashboard");
                },
                type: "default",
                size: "sm",
                className:
                  "bg-amber-100 hover:bg-amber-200 dark:bg-amber-800 dark:hover:bg-amber-700",
                children: "Exit Demo",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
            children: [
              "You're viewing a read-only demo environment. All changes will be automatically reset after ",
              demoExpirationTime,
              " hours.",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1",
        children: [
          (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}),
          (0, jsx_runtime_1.jsx)("div", { children: ["Text", 123] }),
        ],
      }),
    ],
  });
}
