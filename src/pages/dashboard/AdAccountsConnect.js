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
exports.default = AdAccountsConnect;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var adPlatformService_1 = require("@/services/adPlatformService");
var ConnectPlatformsCard_1 = require("@/components/adplatforms/ConnectPlatformsCard");
var sonner_1 = require("sonner");
var useAuth_1 = require("@/hooks/useAuth");
function AdAccountsConnect() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    metaConnected = _a[0],
    setMetaConnected = _a[1];
  var _b = (0, react_1.useState)(false),
    tiktokConnected = _b[0],
    setTiktokConnected = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var profile = (0, useAuth_1.useAuth)().profile;
  // Check if user has connected ad accounts
  (0, react_1.useEffect)(
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
      }
    },
    [profile],
  );
  (0, react_1.useEffect)(function () {
    // Check URL parameters for auth callback
    var searchParams = new URLSearchParams(window.location.search);
    var platform = searchParams.get("platform");
    var success = searchParams.get("success");
    if (platform && success) {
      if (success === "true") {
        sonner_1.toast.success(
          "".concat(
            platform === "meta" ? "Meta" : "TikTok",
            " account connected successfully!",
          ),
        );
        // Refresh connections after successful connection
        (0, adPlatformService_1.getAdPlatformConnections)().then(
          function (connections) {
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
          },
        );
      } else {
        sonner_1.toast.error(
          "Failed to connect ".concat(
            platform === "meta" ? "Meta" : "TikTok",
            " account. Please try again.",
          ),
        );
      }
      // Remove query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  var handleProceed = function () {
    navigate("/dashboard/campaigns/create");
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto px-4 py-12",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col items-center",
      children: [
        (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "text-center mb-8",
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-3xl font-bold mb-2",
              children: "Connect Your Ad Accounts",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children:
                "To create and manage campaigns, connect your Meta or TikTok ad accounts",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "w-full max-w-2xl",
          children: (0, jsx_runtime_1.jsx)(ConnectPlatformsCard_1.default, {
            metaConnected: metaConnected,
            tiktokConnected: tiktokConnected,
            isLoading: isLoading,
            onProceed: handleProceed,
          }),
        }),
      ],
    }),
  });
}
