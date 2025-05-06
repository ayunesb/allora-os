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
exports.default = BotDetailPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var BotDetail_1 = require("@/components/BotDetail");
var react_1 = require("react");
var sonner_1 = require("sonner");
function BotDetailPage() {
  var _this = this;
  var botId = (0, react_router_dom_1.useParams)().botId;
  var _a = (0, react_1.useState)(null),
    isValidBot = _a[0],
    setIsValidBot = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  (0, react_1.useEffect)(
    function () {
      // Validate the bot ID, in a real app this would check against your API
      var validateBotId = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var valid;
          return __generator(this, function (_a) {
            try {
              setIsLoading(true);
              valid = botId && botId.length > 0;
              if (!valid) {
                sonner_1.toast.error("Invalid advisor ID");
              }
              setIsValidBot(valid);
            } catch (error) {
              console.error("Error validating bot ID:", error);
              sonner_1.toast.error("Failed to validate advisor");
              setIsValidBot(false);
            } finally {
              setIsLoading(false);
            }
            return [2 /*return*/];
          });
        });
      };
      validateBotId();
    },
    [botId],
  );
  // Show loading state
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "p-8",
      children: "Loading...",
    });
  }
  // Redirect to bots listing page if invalid ID
  if (isValidBot === false) {
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, {
      to: "/dashboard/ai-bots",
      replace: true,
    });
  }
  // If valid, render the bot detail component
  return (0, jsx_runtime_1.jsx)(BotDetail_1.default, {});
}
