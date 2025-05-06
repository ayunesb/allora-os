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
exports.default = PluginInspector;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
function PluginInspector(_a) {
  var _this = this;
  var plugin = _a.plugin;
  var _b = (0, react_1.useState)(null),
    pluginData = _b[0],
    setPluginData = _b[1];
  (0, react_1.useEffect)(
    function () {
      var supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
      var fetchPluginData = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var _a, data, error;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                return [
                  4 /*yield*/,
                  supabase
                    .from("plugin_card_with_xp")
                    .select("*")
                    .eq("id", plugin.id),
                ];
              case 1:
                (_a = _b.sent()), (data = _a.data), (error = _a.error);
                if (error) {
                  console.error("Error fetching plugin data:", error);
                } else {
                  setPluginData(data[0]);
                }
                return [2 /*return*/];
            }
          });
        });
      };
      fetchPluginData();
    },
    [plugin.id],
  );
  if (!pluginData) {
    return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-xl font-bold",
        children: pluginData.name,
      }),
      (0, jsx_runtime_1.jsxs)("p", {
        className: "text-sm text-muted-foreground",
        children: ["XP: ", pluginData.total_xp, " / 100"],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "w-full h-2 bg-muted rounded-full overflow-hidden mt-1",
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-full bg-green-500 transition-all duration-500",
          style: {
            width: "".concat(
              Math.min((pluginData.total_xp / 100) * 100, 100),
              "%",
            ),
          },
        }),
      }),
      pluginData.total_xp >= 100 &&
        (0, jsx_runtime_1.jsx)("span", {
          className: "text-xs text-yellow-500 font-semibold animate-pulse",
          children: "\uD83E\uDDEC Ready to evolve",
        }),
    ],
  });
}
