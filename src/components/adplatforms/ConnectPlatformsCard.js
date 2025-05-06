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
exports.default = ConnectPlatformsCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var adPlatformService_1 = require("@/services/adPlatformService");
var TikTokIcon_1 = require("@/components/icons/TikTokIcon");
var react_1 = require("react");
var sonner_1 = require("sonner");
function ConnectPlatformsCard(_a) {
  var _this = this;
  var metaConnected = _a.metaConnected,
    tiktokConnected = _a.tiktokConnected,
    isLoading = _a.isLoading,
    onProceed = _a.onProceed;
  var _b = (0, react_1.useState)(false),
    metaConnecting = _b[0],
    setMetaConnecting = _b[1];
  var _c = (0, react_1.useState)(false),
    tiktokConnecting = _c[0],
    setTiktokConnecting = _c[1];
  var _d = (0, react_1.useState)(null),
    metaError = _d[0],
    setMetaError = _d[1];
  var _e = (0, react_1.useState)(null),
    tiktokError = _e[0],
    setTiktokError = _e[1];
  var handleMetaConnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            setMetaConnecting(true);
            setMetaError(null);
            return [4 /*yield*/, (0, adPlatformService_1.initiateMetaAuth)()];
          case 1:
            result = _a.sent();
            if (!result.success) {
              setMetaError(
                result.error || "Failed to initiate Meta authorization",
              );
            }
            return [3 /*break*/, 4];
          case 2:
            error_1 = _a.sent();
            console.error("Meta auth initiation failed:", error_1);
            setMetaError(error_1.message || "Unknown error");
            sonner_1.toast.error(
              "Failed to connect to Meta. Please try again.",
            );
            return [3 /*break*/, 4];
          case 3:
            setMetaConnecting(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleTikTokConnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            setTiktokConnecting(true);
            setTiktokError(null);
            return [4 /*yield*/, (0, adPlatformService_1.initiateTikTokAuth)()];
          case 1:
            result = _a.sent();
            if (!result.success) {
              setTiktokError(
                result.error || "Failed to initiate TikTok authorization",
              );
            }
            return [3 /*break*/, 4];
          case 2:
            error_2 = _a.sent();
            console.error("TikTok auth initiation failed:", error_2);
            setTiktokError(error_2.message || "Unknown error");
            sonner_1.toast.error(
              "Failed to connect to TikTok. Please try again.",
            );
            return [3 /*break*/, 4];
          case 3:
            setTiktokConnecting(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "space-y-1",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Connect Ad Platforms",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Connect your Meta and TikTok ad accounts to start creating campaigns",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "grid gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Facebook, {
                        className: "mr-2 h-4 w-4 text-blue-600",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Meta (Facebook/Instagram)",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: handleMetaConnect,
                    disabled: metaConnected || isLoading || metaConnecting,
                    children: metaConnecting
                      ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                              className: "mr-2 h-4 w-4 animate-spin",
                            }),
                            "Connecting...",
                          ],
                        })
                      : metaConnected
                        ? "Connected"
                        : "Connect",
                  }),
                ],
              }),
              metaError &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center text-red-500 text-sm mt-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                      className: "h-4 w-4 mr-1",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: metaError }),
                  ],
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)(TikTokIcon_1.TikTokIcon, {
                        className: "mr-2 h-4 w-4",
                      }),
                      (0, jsx_runtime_1.jsx)("span", { children: "TikTok" }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: handleTikTokConnect,
                    disabled: tiktokConnected || isLoading || tiktokConnecting,
                    children: tiktokConnecting
                      ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                              className: "mr-2 h-4 w-4 animate-spin",
                            }),
                            "Connecting...",
                          ],
                        })
                      : tiktokConnected
                        ? "Connected"
                        : "Connect",
                  }),
                ],
              }),
              tiktokError &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center text-red-500 text-sm mt-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                      className: "h-4 w-4 mr-1",
                    }),
                    (0, jsx_runtime_1.jsx)("span", { children: tiktokError }),
                  ],
                }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          className: "w-full",
          onClick: onProceed,
          disabled: !metaConnected && !tiktokConnected,
          children: "Proceed to Create Campaign",
        }),
      }),
    ],
  });
}
