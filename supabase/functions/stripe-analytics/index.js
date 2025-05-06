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
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
require("https://deno.land/x/xhr@0.1.0/mod.ts");
var npm_stripe_1 = require("npm:stripe");
// CORS headers for the response
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var stripeApiKey,
      stripe_1,
      query,
      normalized,
      result,
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
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 10, , 11]);
          stripeApiKey = Deno.env.get("STRIPE_SECRET_KEY");
          if (!stripeApiKey) {
            throw new Error("STRIPE_SECRET_KEY environment variable not set");
          }
          stripe_1 = new npm_stripe_1.default(stripeApiKey, {
            apiVersion: "2023-10-16",
          });
          return [4 /*yield*/, req.json()];
        case 2:
          query = _a.sent().query;
          if (!query) {
            throw new Error("Query is required");
          }
          normalized = query.toLowerCase();
          result = "";
          if (!normalized.includes("total revenue")) return [3 /*break*/, 4];
          now = Math.floor(Date.now() / 1000);
          thirtyDaysAgo = now - 30 * 24 * 60 * 60;
          return [
            4 /*yield*/,
            stripe_1.charges.list({
              limit: 100,
              created: { gte: thirtyDaysAgo },
            }),
          ];
        case 3:
          charges = _a.sent();
          total = charges.data.reduce(function (sum, charge) {
            return charge.paid && !charge.refunded ? sum + charge.amount : sum;
          }, 0);
          result = "Total revenue in last 30 days: $".concat(
            (total / 100).toFixed(2),
          );
          return [3 /*break*/, 9];
        case 4:
          if (!normalized.includes("active subscriptions"))
            return [3 /*break*/, 6];
          return [
            4 /*yield*/,
            stripe_1.subscriptions.list({ status: "active", limit: 10 }),
          ];
        case 5:
          subs = _a.sent();
          if (subs.data.length === 0) {
            result = "No active subscriptions found.";
          } else {
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
            result = "Active subscriptions:\n".concat(names);
          }
          return [3 /*break*/, 9];
        case 6:
          if (!normalized.includes("refunds")) return [3 /*break*/, 8];
          now = Math.floor(Date.now() / 1000);
          oneWeekAgo = now - 7 * 24 * 60 * 60;
          return [
            4 /*yield*/,
            stripe_1.refunds.list({
              limit: 20,
              created: { gte: oneWeekAgo },
            }),
          ];
        case 7:
          refunds = _a.sent();
          if (refunds.data.length === 0) {
            result = "No refunds in the past week.";
          } else {
            total = refunds.data.reduce(function (sum, refund) {
              return sum + refund.amount;
            }, 0);
            result = "Refunds in the past week: "
              .concat(refunds.data.length, " totaling $")
              .concat((total / 100).toFixed(2));
          }
          return [3 /*break*/, 9];
        case 8:
          result =
            'Specify what you want from Stripe (e.g., "total revenue", "active subscriptions", "refunds this week").';
          _a.label = 9;
        case 9:
          console.log("Successfully generated Stripe analytics");
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                result: result,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 10:
          error_1 = _a.sent();
          console.error("Error in stripe-analytics function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 11:
          return [2 /*return*/];
      }
    });
  });
});
