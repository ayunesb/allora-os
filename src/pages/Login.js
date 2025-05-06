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
exports.default = Login;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useAuthCompat_1 = require("@/hooks/useAuthCompat");
var react_router_dom_1 = require("react-router-dom");
// Simplified placeholder component for demo purposes
function Login() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    email = _a[0],
    setEmail = _a[1];
  var _b = (0, react_1.useState)(""),
    password = _b[0],
    setPassword = _b[1];
  var _c = (0, useAuthCompat_1.useAuthCompat)(),
    signIn = _c.signIn,
    isLoading = _c.isLoading;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleSubmit = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            if (!signIn) return [2 /*return*/];
            return [4 /*yield*/, signIn(email, password)];
          case 1:
            result = _a.sent();
            if (result.success) {
              navigate("/dashboard");
            }
            return [2 /*return*/];
        }
      });
    });
  };
  var handleLogin = function (email, password) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              supabase.auth.signInWithPassword({
                email: email,
                password: password,
              }),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              console.error("Login error:", error.message);
            } else {
              console.log("Login successful:", data);
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "sm:mx-auto sm:w-full sm:max-w-sm",
        children: (0, jsx_runtime_1.jsx)("h2", {
          className:
            "mt-10 text-center text-2xl font-bold leading-9 tracking-tight",
          children: "Sign in to your account",
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm",
        children: (0, jsx_runtime_1.jsxs)("form", {
          className: "space-y-6",
          onSubmit: handleSubmit,
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "block text-sm font-medium leading-6",
                  children: "Email address",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "mt-2",
                  children: (0, jsx_runtime_1.jsx)("input", {
                    id: "email",
                    name: "email",
                    type: "email",
                    autoComplete: "email",
                    required: true,
                    value: email,
                    onChange: function (e) {
                      return setEmail(e.target.value);
                    },
                    className: "block w-full rounded-md border py-1.5 px-3",
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "block text-sm font-medium leading-6",
                  children: "Password",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "mt-2",
                  children: (0, jsx_runtime_1.jsx)("input", {
                    id: "password",
                    name: "password",
                    type: "password",
                    autoComplete: "current-password",
                    required: true,
                    value: password,
                    onChange: function (e) {
                      return setPassword(e.target.value);
                    },
                    className: "block w-full rounded-md border py-1.5 px-3",
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              children: (0, jsx_runtime_1.jsx)("button", {
                type: "submit",
                disabled: isLoading,
                className:
                  "flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500",
                children: isLoading ? "Signing in..." : "Sign in",
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
