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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var enhancedApiClient_1 = require("@/utils/api/enhancedApiClient");
var auditLogger_1 = require("@/utils/auditLogger");
var AuthContext_1 = require("@/context/AuthContext");
var securityService_1 = require("./securityService");
var SecurityToggleItem_1 = require("./SecurityToggleItem");
var SecurityTab = function (_a) {
  var initialSettings = _a.initialSettings;
  var user = (0, AuthContext_1.useAuth)().user;
  var _b = (0, react_1.useState)(
      initialSettings || {
        twoFactorEnabled: false,
        extendedSessionTimeout: false,
        strictContentSecurity: false,
        enhancedApiProtection: false,
      },
    ),
    settings = _b[0],
    setSettings = _b[1];
  var _c = (0, enhancedApiClient_1.useProtectedApi)(
      securityService_1.saveSecuritySettings,
      {
        showSuccessToast: true,
        successMessage: "Security settings saved successfully",
        showErrorToast: true,
      },
    ),
    execute = _c.execute,
    isLoading = _c.isLoading;
  var handleToggle = function (setting) {
    setSettings(function (prev) {
      var _a;
      return __assign(
        __assign({}, prev),
        ((_a = {}), (_a[setting] = !prev[setting]), _a),
      );
    });
  };
  var handleSave = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4, , 5]);
            return [4 /*yield*/, execute({ settings: settings })];
          case 1:
            _a.sent();
            if (!user) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              (0, auditLogger_1.logSystemChange)(
                user.id,
                "security_settings",
                "Security settings updated",
                { settings: settings },
              ),
            ];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            return [3 /*break*/, 5];
          case 4:
            error_1 = _a.sent();
            console.error("Failed to save security settings:", error_1);
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Fetch settings if not provided
  (0, react_1.useEffect)(
    function () {
      var loadSettings = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var data, error_2;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!!initialSettings) return [3 /*break*/, 4];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [
                  4 /*yield*/,
                  (0, securityService_1.fetchSecuritySettings)(),
                ];
              case 2:
                data = _a.sent();
                setSettings(data);
                return [3 /*break*/, 4];
              case 3:
                error_2 = _a.sent();
                sonner_1.toast.error("Failed to load security settings");
                return [3 /*break*/, 4];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      loadSettings();
    },
    [initialSettings],
  );
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center space-x-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                className: "h-5 w-5 text-primary",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Security Settings",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Configure security preferences for your organization",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)(SecurityToggleItem_1.default, {
            id: "two-factor",
            title: "Two-Factor Authentication",
            description: "Require 2FA for all admin users",
            icon: lucide_react_1.Lock,
            checked: settings.twoFactorEnabled,
            onCheckedChange: function () {
              return handleToggle("twoFactorEnabled");
            },
          }),
          (0, jsx_runtime_1.jsx)(SecurityToggleItem_1.default, {
            id: "session-timeout",
            title: "Extended Session Timeout",
            description: "Increase session duration to 24 hours",
            icon: lucide_react_1.Key,
            checked: settings.extendedSessionTimeout,
            onCheckedChange: function () {
              return handleToggle("extendedSessionTimeout");
            },
          }),
          (0, jsx_runtime_1.jsx)(SecurityToggleItem_1.default, {
            id: "content-security",
            title: "Strict Content Security",
            description: "Enable strict Content Security Policy",
            icon: lucide_react_1.Shield,
            checked: settings.strictContentSecurity,
            onCheckedChange: function () {
              return handleToggle("strictContentSecurity");
            },
          }),
          (0, jsx_runtime_1.jsx)(SecurityToggleItem_1.default, {
            id: "api-protection",
            title: "Enhanced API Protection",
            description:
              "Enable rate limiting and additional API security measures",
            icon: lucide_react_1.Key,
            checked: settings.enhancedApiProtection,
            onCheckedChange: function () {
              return handleToggle("enhancedApiProtection");
            },
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSave,
            disabled: isLoading,
            className: "w-full",
            children: isLoading
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Saving...",
                  ],
                })
              : "Save Security Settings",
          }),
        ],
      }),
    ],
  });
};
exports.default = SecurityTab;
