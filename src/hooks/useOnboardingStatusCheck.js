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
exports.useOnboardingStatusCheck = useOnboardingStatusCheck;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("@/context/AuthContext");
var onboarding_1 = require("@/utils/onboarding");
var sonner_1 = require("sonner");
function useOnboardingStatusCheck() {
  var _this = this;
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(true),
    isCheckingStatus = _a[0],
    setIsCheckingStatus = _a[1];
  var _b = (0, react_1.useState)(0),
    retryCount = _b[0],
    setRetryCount = _b[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  // Define hasInitialized based on user having been checked
  var hasInitialized = user !== undefined;
  (0, react_1.useEffect)(
    function () {
      var isMounted = true;
      var checkStatus = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var isCompleted, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!user && retryCount < 3) {
                  setTimeout(function () {
                    if (isMounted) {
                      setRetryCount(function (prev) {
                        return prev + 1;
                      });
                    }
                  }, 1500);
                  return [2 /*return*/];
                }
                if (!user) {
                  if (hasInitialized) {
                    sonner_1.toast.error(
                      "You must be logged in to complete onboarding",
                    );
                    navigate("/login");
                  }
                  return [2 /*return*/];
                }
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [
                  4 /*yield*/,
                  (0, onboarding_1.checkOnboardingStatus)(user.id),
                ];
              case 2:
                isCompleted = _a.sent();
                if (isCompleted && isMounted) {
                  sonner_1.toast.info("You've already completed onboarding");
                  navigate("/dashboard");
                }
                return [3 /*break*/, 5];
              case 3:
                error_1 = _a.sent();
                console.error("Error checking onboarding status:", error_1);
                return [3 /*break*/, 5];
              case 4:
                if (isMounted) {
                  setIsCheckingStatus(false);
                }
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      };
      checkStatus();
      return function () {
        isMounted = false;
      };
    },
    [user, navigate, retryCount, hasInitialized],
  );
  return {
    isCheckingStatus: isCheckingStatus,
    retryCount: retryCount,
    user: user,
  };
}
