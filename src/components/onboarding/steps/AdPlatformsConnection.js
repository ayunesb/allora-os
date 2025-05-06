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
exports.AdPlatformsConnection = AdPlatformsConnection;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ConnectPlatformsCard_1 = require("@/components/adplatforms/ConnectPlatformsCard");
var adPlatformService_1 = require("@/services/adPlatformService");
var react_2 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var lucide_react_1 = require("lucide-react");
var TikTokIcon_1 = require("@/components/icons/TikTokIcon");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
function AdPlatformsConnection(_a) {
  var _this = this;
  var onComplete = _a.onComplete,
    companyName = _a.companyName,
    _b = _a.isLoading,
    externalLoading = _b === void 0 ? false : _b;
  var _c = (0, react_1.useState)(false),
    metaConnected = _c[0],
    setMetaConnected = _c[1];
  var _d = (0, react_1.useState)(false),
    tiktokConnected = _d[0],
    setTiktokConnected = _d[1];
  var _e = (0, react_1.useState)(true),
    isLoading = _e[0],
    setIsLoading = _e[1];
  var profile = (0, AuthContext_1.useAuth)().profile;
  // Check if user has connected ad accounts
  (0, react_2.useEffect)(
    function () {
      var checkConnections = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var connections, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                setIsLoading(true);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [
                  4 /*yield*/,
                  (0, adPlatformService_1.getAdPlatformConnections)(),
                ];
              case 2:
                connections = _a.sent();
                setMetaConnected(
                  connections.some(function (conn) {
                    return conn.platform === "meta" && conn.is_active;
                  }),
                );
                setTiktokConnected(
                  connections.some(function (conn) {
                    return conn.platform === "tiktok" && conn.is_active;
                  }),
                );
                return [3 /*break*/, 5];
              case 3:
                error_1 = _a.sent();
                console.error(
                  "Error checking ad platform connections:",
                  error_1,
                );
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
      if (
        profile === null || profile === void 0 ? void 0 : profile.company_id
      ) {
        checkConnections();
      } else {
        setIsLoading(false);
      }
    },
    [profile],
  );
  var handleProceed = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!onComplete) return [3 /*break*/, 2];
            return [4 /*yield*/, onComplete()];
          case 1:
            _a.sent();
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-2xl font-bold tracking-tight",
            children: "Connect Your Ad Accounts",
          }),
          (0, jsx_runtime_1.jsxs)("p", {
            className: "text-muted-foreground",
            children: [
              "Connect your Meta and TikTok ad accounts to help ",
              companyName,
              " AI provide more targeted strategy recommendations",
            ],
          }),
        ],
      }),
      (profile === null || profile === void 0 ? void 0 : profile.company_id)
        ? (0, jsx_runtime_1.jsx)(ConnectPlatformsCard_1.default, {
            metaConnected: metaConnected,
            tiktokConnected: tiktokConnected,
            isLoading: isLoading || externalLoading,
            onProceed: handleProceed,
          })
        : (0, jsx_runtime_1.jsxs)(card_1.Card, {
            className: "border-amber-200 bg-amber-50",
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                className: "pb-2",
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center text-amber-800",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                        className: "mr-2 h-5 w-5",
                      }),
                      "Company Setup Required",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    className: "text-amber-700",
                    children:
                      "Please complete the company setup before connecting ad platforms",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-col gap-3",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center opacity-50",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Facebook, {
                          className: "mr-2 h-4 w-4 text-blue-600",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children: "Meta (Facebook/Instagram)",
                        }),
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          variant: "outline",
                          size: "sm",
                          className: "ml-auto",
                          disabled: true,
                          children: "Connect",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center opacity-50",
                      children: [
                        (0, jsx_runtime_1.jsx)(TikTokIcon_1.TikTokIcon, {
                          className: "mr-2 h-4 w-4",
                        }),
                        (0, jsx_runtime_1.jsx)("span", { children: "TikTok" }),
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          variant: "outline",
                          size: "sm",
                          className: "ml-auto",
                          disabled: true,
                          children: "Connect",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      className: "w-full mt-2",
                      onClick: handleProceed,
                      children: "Continue Without Connecting",
                    }),
                  ],
                }),
              }),
            ],
          }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "text-sm text-muted-foreground mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            children:
              "* You can skip this step and connect your ad accounts later from the dashboard.",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            children:
              "* Connecting your ad accounts helps our AI provide more personalized strategy recommendations.",
          }),
        ],
      }),
    ],
  });
}
