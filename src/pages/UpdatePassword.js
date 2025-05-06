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
exports.default = UpdatePassword;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var card_1 = require("@/components/ui/card");
var use_toast_1 = require("@/components/ui/use-toast");
var authService_1 = require("@/services/authService");
function UpdatePassword() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    password = _a[0],
    setPassword = _a[1];
  var _b = (0, react_1.useState)(""),
    confirmPassword = _b[0],
    setConfirmPassword = _b[1];
  var _c = (0, react_1.useState)(false),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var toast = (0, use_toast_1.useToast)().toast;
  var handleSubmit = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            if (password !== confirmPassword) {
              toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match",
                variant: "destructive",
              });
              return [2 /*return*/];
            }
            if (password.length < 6) {
              toast({
                title: "Password too short",
                description: "Password must be at least 6 characters long",
                variant: "destructive",
              });
              return [2 /*return*/];
            }
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, authService_1.updateUserPassword)(password),
            ];
          case 2:
            result = _a.sent();
            if (result.success) {
              toast({
                title: "Password updated",
                description: "Your password has been successfully updated",
              });
              // Redirect to login page after successful password update
              setTimeout(function () {
                navigate("/login");
              }, 1500);
            } else {
              toast({
                title: "Error",
                description: result.error || "Failed to update password",
                variant: "destructive",
              });
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            toast({
              title: "Error",
              description: error_1.message || "An unexpected error occurred",
              variant: "destructive",
            });
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
    className:
      "flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "w-full max-w-md",
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          className: "space-y-1",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "text-2xl font-bold",
              children: "Update Password",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Create a new password for your account",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsxs)("form", {
            onSubmit: handleSubmit,
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)("label", {
                    htmlFor: "password",
                    className: "text-sm font-medium",
                    children: "New Password",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "password",
                    type: "password",
                    value: password,
                    onChange: function (e) {
                      return setPassword(e.target.value);
                    },
                    placeholder: "Enter your new password",
                    required: true,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)("label", {
                    htmlFor: "confirmPassword",
                    className: "text-sm font-medium",
                    children: "Confirm Password",
                  }),
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    id: "confirmPassword",
                    type: "password",
                    value: confirmPassword,
                    onChange: function (e) {
                      return setConfirmPassword(e.target.value);
                    },
                    placeholder: "Confirm your new password",
                    required: true,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                type: "submit",
                className: "w-full",
                disabled: isLoading,
                children: isLoading ? "Updating..." : "Update Password",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "text-center w-full text-sm text-muted-foreground",
            children: (0, jsx_runtime_1.jsx)("p", {
              children:
                "After updating your password, you'll be redirected to the login page.",
            }),
          }),
        }),
      ],
    }),
  });
}
