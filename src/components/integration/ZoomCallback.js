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
exports.default = ZoomCallback;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var useZoomIntegration_1 = require("@/hooks/useZoomIntegration");
var lucide_react_1 = require("lucide-react");
function ZoomCallback() {
  var _a = (0, react_1.useState)("loading"),
    status = _a[0],
    setStatus = _a[1];
  var _b = (0, react_1.useState)(null),
    errorMessage = _b[0],
    setErrorMessage = _b[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var location = (0, react_router_dom_1.useLocation)();
  var handleCallback = (0, useZoomIntegration_1.useZoomIntegration)()
    .handleCallback;
  (0, react_1.useEffect)(
    function () {
      function processCallback() {
        return __awaiter(this, void 0, void 0, function () {
          var searchParams, code, state, error, redirectUri, result, error_1;
          var _a;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                searchParams = new URLSearchParams(location.search);
                code = searchParams.get("code");
                state = searchParams.get("state");
                error = searchParams.get("error");
                if (error) {
                  setStatus("error");
                  setErrorMessage("Zoom authorization error: ".concat(error));
                  return [2 /*return*/];
                }
                if (!code || !state) {
                  setStatus("error");
                  setErrorMessage("Missing required parameters");
                  return [2 /*return*/];
                }
                redirectUri = "".concat(
                  window.location.origin,
                  "/zoom-callback",
                );
                return [4 /*yield*/, handleCallback(code, state, redirectUri)];
              case 1:
                result = _b.sent();
                if (result.success) {
                  setStatus("success");
                  // Redirect after a short delay
                  setTimeout(function () {
                    navigate("/dashboard");
                  }, 2000);
                } else {
                  setStatus("error");
                  setErrorMessage(
                    ((_a = result.error) === null || _a === void 0
                      ? void 0
                      : _a.message) || "Failed to connect Zoom",
                  );
                }
                return [3 /*break*/, 3];
              case 2:
                error_1 = _b.sent();
                setStatus("error");
                setErrorMessage(
                  error_1.message || "An unexpected error occurred",
                );
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      }
      processCallback();
    },
    [location, handleCallback, navigate],
  );
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex h-screen items-center justify-center",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "w-full max-w-md p-8 bg-card rounded-lg shadow-lg border",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center",
        children: [
          status === "loading" &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                  className: "mx-auto h-12 w-12 animate-spin text-primary",
                }),
                (0, jsx_runtime_1.jsx)("h2", {
                  className: "mt-4 text-2xl font-bold",
                  children: "Connecting to Zoom",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mt-2 text-muted-foreground",
                  children: "Please wait while we complete the connection...",
                }),
              ],
            }),
          status === "success" &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900",
                  children: (0, jsx_runtime_1.jsx)("svg", {
                    className: "h-6 w-6 text-green-600 dark:text-green-300",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: (0, jsx_runtime_1.jsx)("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7",
                    }),
                  }),
                }),
                (0, jsx_runtime_1.jsx)("h2", {
                  className:
                    "mt-4 text-2xl font-bold text-green-600 dark:text-green-400",
                  children: "Successfully Connected!",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mt-2 text-muted-foreground",
                  children:
                    "Your Zoom account has been connected to Allora AI.",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mt-4 text-sm text-muted-foreground",
                  children: "Redirecting to dashboard...",
                }),
              ],
            }),
          status === "error" &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900",
                  children: (0, jsx_runtime_1.jsx)("svg", {
                    className: "h-6 w-6 text-red-600 dark:text-red-300",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: (0, jsx_runtime_1.jsx)("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M6 18L18 6M6 6l12 12",
                    }),
                  }),
                }),
                (0, jsx_runtime_1.jsx)("h2", {
                  className:
                    "mt-4 text-2xl font-bold text-red-600 dark:text-red-400",
                  children: "Connection Failed",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mt-2 text-muted-foreground",
                  children:
                    errorMessage ||
                    "An error occurred while connecting to Zoom.",
                }),
                (0, jsx_runtime_1.jsx)("button", {
                  onClick: function () {
                    return navigate("/dashboard");
                  },
                  className:
                    "mt-6 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90",
                  children: "Return to Dashboard",
                }),
              ],
            }),
        ],
      }),
    }),
  });
}
