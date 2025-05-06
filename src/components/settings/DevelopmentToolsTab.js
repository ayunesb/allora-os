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
exports.default = DevelopmentToolsTab;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var separator_1 = require("@/components/ui/separator");
var sonner_1 = require("sonner");
var AuthContext_1 = require("@/context/AuthContext");
var test_1 = require("@/utils/company/test");
var client_1 = require("@/integrations/supabase/client");
var lucide_react_1 = require("lucide-react");
var ApiTestingTool_1 = require("./ApiTestingTool");
var badge_1 = require("@/components/ui/badge");
function DevelopmentToolsTab() {
  var _this = this;
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var handleSetupTestCompany = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(user === null || user === void 0 ? void 0 : user.email)) {
              sonner_1.toast.error("User email not available");
              return [2 /*return*/];
            }
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, (0, test_1.runTestCompanySetup)(user.email)];
          case 2:
            result = _a.sent();
            if (result.success) {
              sonner_1.toast.success(result.message);
            } else {
              sonner_1.toast.error(result.message);
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error in test company setup:", error_1);
            sonner_1.toast.error("Failed to set up test company");
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
  var handleDatabaseTest = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, (0, client_1.checkSupabaseConnection)()];
          case 2:
            result = _a.sent();
            if (result.connected) {
              sonner_1.toast.success(
                result.message || "Database connection successful",
              );
            } else {
              sonner_1.toast.error(
                result.message || "Database connection failed",
              );
            }
            console.log("Database connection test result:", result);
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Database test error:", error_2);
            sonner_1.toast.error(
              "Database test failed: ".concat(error_2.message),
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
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid gap-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center gap-2",
              children: [
                "Development Tools",
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className:
                    "bg-yellow-100 text-yellow-800 border-yellow-300 ml-2",
                  children: "Admin Only",
                }),
                (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
                  className: "h-4 w-4 text-yellow-600",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Tools for testing and debugging",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className: "space-y-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Test Data",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground mb-4",
                  children: "Set up test company data for the current user.",
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  onClick: handleSetupTestCompany,
                  disabled: isLoading,
                  variant: "outline",
                  children: [
                    isLoading ? "Setting up..." : "Set Up Test Company",
                    !isLoading &&
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Code, {
                        className: "ml-2 h-4 w-4",
                      }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Database Connection Test",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground mb-4",
                  children: "Verify your connection to the database.",
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  onClick: handleDatabaseTest,
                  disabled: isLoading,
                  children: [
                    isLoading ? "Testing..." : "Test Database Connection",
                    !isLoading &&
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                        className: "ml-2 h-4 w-4",
                      }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            (0, jsx_runtime_1.jsx)(ApiTestingTool_1.default, {}),
          ],
        }),
      ],
    }),
  });
}
