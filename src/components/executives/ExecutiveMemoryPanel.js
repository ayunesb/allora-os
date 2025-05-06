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
exports.ExecutiveMemoryPanel = ExecutiveMemoryPanel;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var memoryService_1 = require("@/services/memoryService");
var AuthContext_1 = require("@/context/AuthContext");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
function ExecutiveMemoryPanel() {
  var _a = (0, react_1.useState)([]),
    memories = _a[0],
    setMemories = _a[1];
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  var user = (0, AuthContext_1.useAuth)().user;
  (0, react_1.useEffect)(
    function () {
      function loadMemories() {
        return __awaiter(this, void 0, void 0, function () {
          var recentMemories, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!(user === null || user === void 0 ? void 0 : user.id))
                  return [2 /*return*/];
                setLoading(true);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [
                  4 /*yield*/,
                  (0, memoryService_1.fetchRecentMemories)(
                    user.id,
                    undefined,
                    5,
                  ),
                ];
              case 2:
                recentMemories = _a.sent();
                setMemories(recentMemories);
                return [3 /*break*/, 5];
              case 3:
                error_1 = _a.sent();
                console.error("Failed to load executive memories:", error_1);
                return [3 /*break*/, 5];
              case 4:
                setLoading(false);
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      }
      loadMemories();
      // Refresh memories every minute
      var interval = setInterval(loadMemories, 60000);
      return function () {
        return clearInterval(interval);
      };
    },
    [user === null || user === void 0 ? void 0 : user.id],
  );
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                className: "mr-2 h-5 w-5",
              }),
              "Executive Memory",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Recent decisions across all executives",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: loading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "py-4 text-center text-muted-foreground",
              children: "Loading memories...",
            })
          : memories.length === 0
            ? (0, jsx_runtime_1.jsx)("div", {
                className: "py-4 text-center text-muted-foreground",
                children:
                  "No executive memories yet. Memories will appear here as your executives make decisions.",
              })
            : (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-4",
                children: memories.map(function (memory) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "border-b pb-3 last:border-0",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between mb-1",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "font-medium",
                              children: memory.executive_name,
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-xs text-muted-foreground",
                              children:
                                memory.timestamp &&
                                (0, date_fns_1.formatDistanceToNow)(
                                  new Date(memory.timestamp),
                                  { addSuffix: true },
                                ),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          className: "text-sm mb-1",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-muted-foreground",
                              children: "Task:",
                            }),
                            " ",
                            memory.task,
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("p", {
                          className: "text-sm",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-muted-foreground",
                              children: "Decision:",
                            }),
                            " ",
                            memory.decision,
                          ],
                        }),
                      ],
                    },
                    memory.id,
                  );
                }),
              }),
      }),
    ],
  });
}
