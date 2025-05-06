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
exports.initCalendlyClient = initCalendlyClient;
exports.createCalendlyTool = createCalendlyTool;
var tools_1 = require("langchain/tools");
var g = global;
/**
 * Initialize the Calendly client with API key and user URI
 */
function initCalendlyClient(apiKey, userUri) {
  if (!apiKey || !userUri) {
    console.error("Calendly API key and user URI are required");
    return;
  }
  g.CALENDLY_API_KEY = apiKey;
  g.CALENDLY_USER_URI = userUri;
}
/**
 * Create a Calendly tool for LangChain that can check availability and schedule meetings
 */
function createCalendlyTool() {
  var _this = this;
  return new tools_1.DynamicTool({
    name: "CalendlyScheduler",
    description: "Check availability or schedule meetings via Calendly",
    func: function (input) {
      return __awaiter(_this, void 0, void 0, function () {
        var apiKey,
          userUri,
          normalized,
          response_1,
          data,
          links,
          response_2,
          data,
          eventTypes,
          err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 7, , 8]);
              apiKey = g.CALENDLY_API_KEY;
              userUri = g.CALENDLY_USER_URI;
              if (!apiKey || !userUri) {
                return [
                  2 /*return*/,
                  "Calendly client not initialized. Please set CALENDLY_API_KEY and CALENDLY_USER_URI first.",
                ];
              }
              normalized = input.toLowerCase();
              if (!normalized.includes("availability")) return [3 /*break*/, 3];
              return [
                4 /*yield*/,
                fetch("https://api.calendly.com/scheduling_links", {
                  headers: {
                    Authorization: "Bearer ".concat(apiKey),
                    "Content-Type": "application/json",
                  },
                }),
              ];
            case 1:
              response_1 = _a.sent();
              if (!response_1.ok) {
                return [2 /*return*/, "Failed to fetch Calendly availability."];
              }
              return [4 /*yield*/, response_1.json()];
            case 2:
              data = _a.sent();
              links = data.collection;
              if (!links || links.length === 0) {
                return [2 /*return*/, "No scheduling links found."];
              }
              return [
                2 /*return*/,
                "Available booking links:\n".concat(
                  links
                    .map(function (link) {
                      return "- "
                        .concat(link.name, ": ")
                        .concat(link.booking_url);
                    })
                    .join("\n"),
                ),
              ];
            case 3:
              if (!normalized.includes("schedule")) return [3 /*break*/, 6];
              return [
                4 /*yield*/,
                fetch("".concat(userUri, "/event_types"), {
                  headers: {
                    Authorization: "Bearer ".concat(apiKey),
                    "Content-Type": "application/json",
                  },
                }),
              ];
            case 4:
              response_2 = _a.sent();
              if (!response_2.ok) {
                return [2 /*return*/, "Failed to fetch Calendly event types."];
              }
              return [4 /*yield*/, response_2.json()];
            case 5:
              data = _a.sent();
              eventTypes = data.collection;
              if (!eventTypes || eventTypes.length === 0) {
                return [2 /*return*/, "No event types found."];
              }
              return [
                2 /*return*/,
                "Available meeting types:\n".concat(
                  eventTypes
                    .map(function (event) {
                      return "- "
                        .concat(event.name, " (")
                        .concat(event.duration, " min): ")
                        .concat(event.scheduling_url);
                    })
                    .join("\n"),
                ),
              ];
            case 6:
              return [
                2 /*return*/,
                'Please specify "check availability" or "schedule a meeting".',
              ];
            case 7:
              err_1 = _a.sent();
              console.error("CalendlyTool error:", err_1);
              return [
                2 /*return*/,
                "Failed to process Calendly request: ".concat(
                  err_1 instanceof Error ? err_1.message : String(err_1),
                ),
              ];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    },
  });
}
