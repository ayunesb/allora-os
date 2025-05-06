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
exports.initStripeClient = initStripeClient;
exports.createStripeTool = createStripeTool;
var tools_1 = require("langchain/tools");
var stripe = null;
/**
 * Initialize the Stripe client with API key
 */
function initStripeClient(apiKey) {
  if (!apiKey) {
    console.error("Stripe API key is required");
    return;
  }
  // Dynamically import Stripe to avoid bundling it in the client
  Promise.resolve()
    .then(function () {
      return require("stripe");
    })
    .then(function (_a) {
      var Stripe = _a.default;
      stripe = new Stripe(apiKey, {
        apiVersion: "2025-04-30.basil", // Using a stable API version
      });
    })
    .catch(function (err) {
      console.error("Failed to initialize Stripe client", err);
    });
}
/**
 * Create a Stripe tool for LangChain that can analyze payment data
 */
function createStripeTool() {
  var _this = this;
  return new tools_1.DynamicTool({
    name: "StripeAnalytics",
    description:
      "Use this to retrieve payment info, revenue totals, or subscription status from Stripe.",
    func: function (input) {
      return __awaiter(_this, void 0, void 0, function () {
        var normalized,
          now,
          thirtyDaysAgo,
          charges,
          total,
          subs,
          names,
          now,
          oneWeekAgo,
          refunds,
          total,
          err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 7, , 8]);
              if (!stripe) {
                return [
                  2 /*return*/,
                  "Stripe client not initialized. Please set STRIPE_SECRET_KEY first.",
                ];
              }
              normalized = input.toLowerCase();
              if (!normalized.includes("total revenue"))
                return [3 /*break*/, 2];
              now = Math.floor(Date.now() / 1000);
              thirtyDaysAgo = now - 30 * 24 * 60 * 60;
              return [
                4 /*yield*/,
                stripe.charges.list({
                  limit: 100,
                  created: { gte: thirtyDaysAgo },
                }),
              ];
            case 1:
              charges = _a.sent();
              total = charges.data.reduce(function (sum, charge) {
                return charge.paid && !charge.refunded
                  ? sum + charge.amount
                  : sum;
              }, 0);
              return [
                2 /*return*/,
                "Total revenue in last 30 days: $".concat(
                  (total / 100).toFixed(2),
                ),
              ];
            case 2:
              if (!normalized.includes("active subscriptions"))
                return [3 /*break*/, 4];
              return [
                4 /*yield*/,
                stripe.subscriptions.list({ status: "active", limit: 10 }),
              ];
            case 3:
              subs = _a.sent();
              if (subs.data.length === 0) {
                return [2 /*return*/, "No active subscriptions found."];
              }
              names = subs.data
                .map(function (sub) {
                  return "\u2022 "
                    .concat(sub.customer, " (")
                    .concat(
                      sub.items.data[0].price.nickname || "Default Plan",
                      ")",
                    );
                })
                .join("\n");
              return [2 /*return*/, "Active subscriptions:\n".concat(names)];
            case 4:
              if (!normalized.includes("refunds")) return [3 /*break*/, 6];
              now = Math.floor(Date.now() / 1000);
              oneWeekAgo = now - 7 * 24 * 60 * 60;
              return [
                4 /*yield*/,
                stripe.refunds.list({
                  limit: 20,
                  created: { gte: oneWeekAgo },
                }),
              ];
            case 5:
              refunds = _a.sent();
              if (refunds.data.length === 0) {
                return [2 /*return*/, "No refunds in the past week."];
              }
              total = refunds.data.reduce(function (sum, refund) {
                return sum + refund.amount;
              }, 0);
              return [
                2 /*return*/,
                "Refunds in the past week: "
                  .concat(refunds.data.length, " totaling $")
                  .concat((total / 100).toFixed(2)),
              ];
            case 6:
              // Default fallback
              return [
                2 /*return*/,
                'Specify what you want from Stripe (e.g., "total revenue", "active subscriptions", "refunds this week").',
              ];
            case 7:
              err_1 = _a.sent();
              console.error("StripeAnalytics tool error:", err_1);
              return [
                2 /*return*/,
                "Failed to retrieve data from Stripe: ".concat(
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
