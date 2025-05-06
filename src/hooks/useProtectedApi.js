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
exports.useProtectedApi = useProtectedApi;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
function useProtectedApi() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var auth = (0, AuthContext_1.useAuth)();
  var makeRequest = function (options) {
    return __awaiter(_this, void 0, void 0, function () {
      var url,
        _a,
        method,
        _b,
        headers,
        body,
        _c,
        skipAuthCheck,
        _d,
        quiet,
        requestHeaders,
        response_1,
        errorData,
        data,
        error_1;
      var _e;
      return __generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            (url = options.url),
              (_a = options.method),
              (method = _a === void 0 ? "GET" : _a),
              (_b = options.headers),
              (headers = _b === void 0 ? {} : _b),
              (body = options.body),
              (_c = options.skipAuthCheck),
              (skipAuthCheck = _c === void 0 ? false : _c),
              (_d = options.quiet),
              (quiet = _d === void 0 ? false : _d);
            setIsLoading(true);
            _f.label = 1;
          case 1:
            _f.trys.push([1, 6, , 7]);
            // Check if user is authenticated unless explicitly skipped
            if (!skipAuthCheck && (!auth.user || !auth.session)) {
              throw new Error("User not authenticated");
            }
            requestHeaders = __assign(
              { "Content-Type": "application/json" },
              headers,
            );
            // Add auth token if available
            if (
              (_e = auth.session) === null || _e === void 0
                ? void 0
                : _e.access_token
            ) {
              requestHeaders["Authorization"] = "Bearer ".concat(
                auth.session.access_token,
              );
            }
            return [
              4 /*yield*/,
              fetch(url, {
                method: method,
                headers: requestHeaders,
                body: body ? JSON.stringify(body) : undefined,
              }),
            ];
          case 2:
            response_1 = _f.sent();
            if (!!response_1.ok) return [3 /*break*/, 4];
            return [
              4 /*yield*/,
              response_1.json().catch(function () {
                return { message: "Network response was not ok" };
              }),
            ];
          case 3:
            errorData = _f.sent();
            throw new Error(
              errorData.message ||
                "Error "
                  .concat(response_1.status, ": ")
                  .concat(response_1.statusText),
            );
          case 4:
            return [4 /*yield*/, response_1.json()];
          case 5:
            data = _f.sent();
            setIsLoading(false);
            return [2 /*return*/, data];
          case 6:
            error_1 = _f.sent();
            setIsLoading(false);
            if (!quiet) {
              sonner_1.toast.error("API request failed", {
                description:
                  error_1 instanceof Error
                    ? error_1.message
                    : "Unknown error occurred",
              });
            }
            throw error_1;
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  return { makeRequest: makeRequest, isLoading: isLoading };
}
exports.default = useProtectedApi;
