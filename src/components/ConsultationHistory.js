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
exports.default = ConsultationHistory;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var consultation_1 = require("@/utils/consultation");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var scroll_area_1 = require("@/components/ui/scroll-area");
var separator_1 = require("@/components/ui/separator");
function ConsultationHistory() {
  var _a = (0, react_1.useState)([]),
    consultations = _a[0],
    setConsultations = _a[1];
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  (0, react_1.useEffect)(function () {
    function loadConsultations() {
      return __awaiter(this, void 0, void 0, function () {
        var history_1, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                (0, consultation_1.getUserConsultationHistory)(),
              ];
            case 2:
              history_1 = _a.sent();
              setConsultations(history_1);
              return [3 /*break*/, 5];
            case 3:
              error_1 = _a.sent();
              console.error("Failed to load consultation history:", error_1);
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
    loadConsultations();
  }, []);
  if (loading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "flex items-center justify-center p-8",
      children: (0, jsx_runtime_1.jsx)("div", {
        className:
          "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent",
      }),
    });
  }
  if (consultations.length === 0) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "flex flex-col items-center justify-center p-8 text-center",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
            className: "h-12 w-12 text-muted-foreground mb-4",
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium mb-2",
            children: "No consultations yet",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children:
              "Your conversations with executive advisors will appear here",
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: consultations.map(function (consultation) {
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      children: consultation.botName,
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-xs text-muted-foreground",
                      children: ["(", consultation.botRole, ")"],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "flex items-center gap-2 text-xs text-muted-foreground",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                      className: "h-3 w-3",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      children: (0, date_fns_1.format)(
                        new Date(consultation.messages[0].timestamp),
                        "MMM d, yyyy",
                      ),
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
                className: "h-[200px] rounded-md border p-4",
                children: consultation.messages.map(function (message, index) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "mb-4 last:mb-0",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-1",
                          children: [
                            message.type === "user"
                              ? (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
                                  className: "h-4 w-4 text-primary",
                                })
                              : (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
                                  className: "h-4 w-4 text-primary",
                                }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-xs font-medium",
                              children:
                                message.type === "user"
                                  ? "You"
                                  : consultation.botName,
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-xs text-muted-foreground",
                              children: (0, date_fns_1.format)(
                                new Date(message.timestamp),
                                "h:mm a",
                              ),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm pl-6",
                          children: message.content,
                        }),
                        index < consultation.messages.length - 1 &&
                          (0, jsx_runtime_1.jsx)(separator_1.Separator, {
                            className: "my-2",
                          }),
                      ],
                    },
                    index,
                  );
                }),
              }),
            }),
          ],
        },
        consultation.id,
      );
    }),
  });
}
