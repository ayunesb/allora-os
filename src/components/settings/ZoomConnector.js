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
exports.ZoomConnector = ZoomConnector;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var useZoomIntegration_1 = require("@/hooks/useZoomIntegration");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var sonner_1 = require("sonner");
function ZoomConnector() {
  var _this = this;
  var _a = (0, useZoomIntegration_1.useZoomIntegration)(),
    checkConnection = _a.checkConnection,
    connectZoom = _a.connectZoom,
    disconnectZoom = _a.disconnectZoom,
    isConnecting = _a.isConnecting,
    integration = _a.integration,
    connectionStatus = _a.isConnected;
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(false),
    isConnected = _c[0],
    setIsConnected = _c[1];
  (0, react_1.useEffect)(
    function () {
      function checkZoomConnection() {
        return __awaiter(this, void 0, void 0, function () {
          var result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, checkConnection()];
              case 1:
                result = _a.sent();
                setIsConnected(result.connected);
                setIsLoading(false);
                return [2 /*return*/];
            }
          });
        });
      }
      checkZoomConnection();
    },
    [checkConnection],
  );
  var handleConnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, connectZoom()];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            sonner_1.toast.error("Failed to initiate Zoom connection");
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDisconnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var confirmed, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            confirmed = window.confirm(
              "Are you sure you want to disconnect your Zoom integration? Any scheduled Zoom meetings will remain but you won't be able to create new ones.",
            );
            if (!confirmed) return [2 /*return*/];
            return [4 /*yield*/, disconnectZoom()];
          case 1:
            result = _a.sent();
            if (result.success) {
              setIsConnected(false);
              sonner_1.toast.success("Zoom account disconnected successfully");
            } else {
              sonner_1.toast.error("Failed to disconnect Zoom account");
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
                className: "h-5 w-5 text-blue-600",
              }),
              "Zoom Integration",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Connect your Zoom account to schedule meetings with clients",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "flex justify-center py-4",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                className: "h-6 w-6 animate-spin text-primary/70",
              }),
            })
          : isConnected
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "flex items-center gap-2 text-sm bg-green-50 dark:bg-green-950/40 p-3 rounded-md text-green-700 dark:text-green-400",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "bg-green-100 dark:bg-green-900/50 p-1 rounded-full",
                        children: (0, jsx_runtime_1.jsx)("svg", {
                          className: "h-4 w-4",
                          fill: "currentColor",
                          viewBox: "0 0 20 20",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: (0, jsx_runtime_1.jsx)("path", {
                            fillRule: "evenodd",
                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                            clipRule: "evenodd",
                          }),
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Your Zoom account is connected",
                      }),
                    ],
                  }),
                  integration &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-sm text-muted-foreground space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("p", {
                          children: [
                            "Connected: ",
                            integration.created_at
                              ? (0, date_fns_1.formatDistanceToNow)(
                                  new Date(integration.created_at),
                                  { addSuffix: true },
                                )
                              : "Recently",
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          children: [
                            "Last updated: ",
                            (0, date_fns_1.formatDistanceToNow)(
                              new Date(integration.updated_at),
                              { addSuffix: true },
                            ),
                          ],
                        }),
                      ],
                    }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm text-muted-foreground",
                    children: (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "Allora AI can now create and manage Zoom meetings on your behalf.",
                    }),
                  }),
                ],
              })
            : (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "flex items-center gap-2 text-sm bg-amber-50 dark:bg-amber-950/40 p-3 rounded-md text-amber-700 dark:text-amber-400",
                    children: [
                      (0, jsx_runtime_1.jsx)("svg", {
                        className: "h-5 w-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: (0, jsx_runtime_1.jsx)("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Your Zoom account is not connected",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-sm text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        children:
                          "Connect your Zoom account to enable Allora AI to create and manage meetings on your behalf.",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "mt-2",
                        children: "This integration allows us to:",
                      }),
                      (0, jsx_runtime_1.jsxs)("ul", {
                        className: "list-disc list-inside mt-1 space-y-1",
                        children: [
                          (0, jsx_runtime_1.jsx)("li", {
                            children:
                              "Create Zoom meetings for strategic discussions",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children: "Schedule follow-up calls with your team",
                          }),
                          (0, jsx_runtime_1.jsx)("li", {
                            children:
                              "Provide one-click access to your meetings",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        children: isConnected
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-col sm:flex-row gap-2 w-full",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  className: "w-full sm:w-auto",
                  onClick: handleDisconnect,
                  children: "Disconnect Zoom",
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  className: "w-full sm:w-auto",
                  onClick: function () {
                    return window.open("https://zoom.us/meeting", "_blank");
                  },
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Open Zoom Dashboard",
                  ],
                }),
              ],
            })
          : (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: handleConnect,
              disabled: isConnecting,
              className: "w-full sm:w-auto",
              children: isConnecting
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "mr-2 h-4 w-4 animate-spin",
                      }),
                      "Connecting...",
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Link2, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Connect Zoom Account",
                    ],
                  }),
            }),
      }),
    ],
  });
}
