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
exports.refreshData = void 0;
var sonner_1 = require("sonner");
/**
 * A shared utility function to handle consistent data refresh operations across the application
 *
 * @param options.fetchFn - The function that performs the actual data fetching/refresh
 * @param options.onComplete - Optional callback to run after successful fetch
 * @param options.setIsRefreshing - State setter function to track loading state
 * @param options.successMessage - Optional message to display on success
 * @param options.errorMessage - Optional message to display on error
 * @returns Promise that resolves when refresh is complete
 */
var refreshData = function (_a) {
  return __awaiter(void 0, [_a], void 0, function (_b) {
    var error_1;
    var fetchFn = _b.fetchFn,
      onComplete = _b.onComplete,
      setIsRefreshing = _b.setIsRefreshing,
      _c = _b.successMessage,
      successMessage = _c === void 0 ? "Data refreshed successfully" : _c,
      _d = _b.errorMessage,
      errorMessage = _d === void 0 ? "Failed to refresh data" : _d;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          setIsRefreshing(true);
          _e.label = 1;
        case 1:
          _e.trys.push([1, 5, 6, 7]);
          return [4 /*yield*/, fetchFn()];
        case 2:
          _e.sent();
          if (!onComplete) return [3 /*break*/, 4];
          return [4 /*yield*/, onComplete()];
        case 3:
          _e.sent();
          _e.label = 4;
        case 4:
          sonner_1.toast.success(successMessage);
          return [2 /*return*/, Promise.resolve()];
        case 5:
          error_1 = _e.sent();
          console.error("Error refreshing data:", error_1);
          sonner_1.toast.error(errorMessage);
          return [2 /*return*/, Promise.reject(error_1)];
        case 6:
          setIsRefreshing(false);
          return [7 /*endfinally*/];
        case 7:
          return [2 /*return*/];
      }
    });
  });
};
exports.refreshData = refreshData;
