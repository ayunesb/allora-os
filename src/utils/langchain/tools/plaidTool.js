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
exports.initPlaidClient = initPlaidClient;
exports.createPlaidTool = createPlaidTool;
var tools_1 = require("langchain/tools");
var g = global;
/**
 * Initialize the Plaid client with API credentials
 */
function initPlaidClient(clientId, secret, accessToken, env) {
  if (env === void 0) {
    env = "sandbox";
  }
  if (!clientId || !secret) {
    console.error("Plaid client ID and secret are required");
    return;
  }
  g.PLAID_CLIENT_ID = clientId;
  g.PLAID_SECRET = secret;
  g.PLAID_ACCESS_TOKEN = accessToken;
  g.PLAID_ENV = env;
}
/**
 * Create a Plaid finance tool for LangChain that can retrieve account balances and transaction data
 */
function createPlaidTool() {
  var _this = this;
  return new tools_1.DynamicTool({
    name: "PlaidFinance",
    description:
      "Use this to retrieve business cashflow, transactions, and account balances via Plaid.",
    func: function (input) {
      return __awaiter(_this, void 0, void 0, function () {
        var clientId,
          secret,
          accessToken,
          query,
          response_1,
          data,
          summary,
          now,
          past,
          response_2,
          data,
          topTx,
          err_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 7, , 8]);
              clientId = g.PLAID_CLIENT_ID;
              secret = g.PLAID_SECRET;
              accessToken = g.PLAID_ACCESS_TOKEN;
              if (!clientId || !secret || !accessToken) {
                return [
                  2 /*return*/,
                  "Plaid client not initialized. Please set PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ACCESS_TOKEN first.",
                ];
              }
              query = input.toLowerCase();
              if (!(query.includes("balance") || query.includes("cash")))
                return [3 /*break*/, 3];
              return [
                4 /*yield*/,
                fetch("https://api.plaid.com/accounts/balance/get", {
                  method: "POST",
                  headers: {
                    "PLAID-CLIENT-ID": clientId,
                    "PLAID-SECRET": secret,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ access_token: accessToken }),
                }),
              ];
            case 1:
              response_1 = _a.sent();
              if (!response_1.ok) {
                return [2 /*return*/, "Failed to fetch account balances."];
              }
              return [4 /*yield*/, response_1.json()];
            case 2:
              data = _a.sent();
              summary = data.accounts
                .map(function (acc) {
                  return "\u2022 "
                    .concat(acc.name, ": $")
                    .concat(acc.balances.current);
                })
                .join("\n");
              return [
                2 /*return*/,
                "Current account balances:\n".concat(summary),
              ];
            case 3:
              if (
                !(query.includes("transaction") || query.includes("expenses"))
              )
                return [3 /*break*/, 6];
              now = new Date().toISOString().split("T")[0];
              past = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0];
              return [
                4 /*yield*/,
                fetch("https://api.plaid.com/transactions/get", {
                  method: "POST",
                  headers: {
                    "PLAID-CLIENT-ID": clientId,
                    "PLAID-SECRET": secret,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    access_token: accessToken,
                    start_date: past,
                    end_date: now,
                  }),
                }),
              ];
            case 4:
              response_2 = _a.sent();
              if (!response_2.ok) {
                return [2 /*return*/, "Failed to fetch transactions."];
              }
              return [4 /*yield*/, response_2.json()];
            case 5:
              data = _a.sent();
              topTx = data.transactions
                .slice(0, 5)
                .map(function (tx) {
                  return "\u2022 $".concat(tx.amount, " at ").concat(tx.name);
                })
                .join("\n");
              return [
                2 /*return*/,
                "Top 5 expenses in the last 7 days:\n".concat(topTx),
              ];
            case 6:
              return [
                2 /*return*/,
                'You can ask for "balance" or "recent transactions".',
              ];
            case 7:
              err_1 = _a.sent();
              console.error("PlaidTool error:", err_1);
              return [
                2 /*return*/,
                "Failed to process Plaid request: ".concat(
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
