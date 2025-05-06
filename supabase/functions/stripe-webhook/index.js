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
var server_ts_1 = require("https://deno.land/std@0.177.0/http/server.ts");
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
var stripe_12_6_0_target_deno_1 = require("https://esm.sh/stripe@12.6.0?target=deno");
// Load environment variables
var SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
var SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
var STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
var STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
// Validate required environment variables
if (
  !SUPABASE_URL ||
  !SUPABASE_SERVICE_ROLE_KEY ||
  !STRIPE_SECRET_KEY ||
  !STRIPE_WEBHOOK_SECRET
) {
  console.error(
    "Missing required environment variables for stripe-webhook function",
  );
}
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var stripe_1,
      supabase,
      signature,
      body,
      event_1,
      session,
      metadata,
      tenantId,
      credits,
      creditError,
      logError,
      err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 7, , 8]);
          stripe_1 = new stripe_12_6_0_target_deno_1.Stripe(STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
          });
          supabase = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_SERVICE_ROLE_KEY,
          );
          signature = req.headers.get("stripe-signature");
          if (!signature) {
            console.error("No signature provided in webhook request");
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "No signature provided" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [4 /*yield*/, req.text()];
        case 2:
          body = _a.sent();
          // Validate body is not empty
          if (!body || body.trim() === "") {
            console.error("Empty webhook payload received");
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Empty request body" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          try {
            event_1 = stripe_1.webhooks.constructEvent(
              body,
              signature,
              STRIPE_WEBHOOK_SECRET,
            );
          } catch (err) {
            console.error(
              "Webhook signature verification failed: ".concat(err.message),
            );
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Webhook Error: ".concat(err.message),
                }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          console.log("Webhook event received: ".concat(event_1.type));
          if (!(event_1.type === "checkout.session.completed"))
            return [3 /*break*/, 6];
          session = event_1.data.object;
          console.log("Payment succeeded: ".concat(session.id));
          metadata = session.metadata || {};
          tenantId = metadata.tenant_id;
          credits = parseInt(metadata.credits || "0", 10);
          if (!(tenantId && credits)) return [3 /*break*/, 5];
          return [
            4 /*yield*/,
            supabase.rpc("decrement_credits", {
              p_tenant_id: tenantId,
              p_amount: -credits, // Negative value to add credits
            }),
          ];
        case 3:
          creditError = _a.sent().error;
          if (creditError) {
            console.error(
              "Error updating credits: ".concat(creditError.message),
            );
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to update credits: ".concat(
                    creditError.message,
                  ),
                }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase.from("credit_logs").insert({
              tenant_id: tenantId,
              credits_added: credits,
              source: "stripe",
              session_id: session.id,
              amount: session.amount_total,
              email: session.customer_email,
            }),
          ];
        case 4:
          logError = _a.sent().error;
          if (logError) {
            console.error(
              "Error logging credit purchase: ".concat(logError.message),
            );
            // Continue anyway, since the credits were already added
          }
          console.log(
            "\u2705 Added "
              .concat(credits, " credits to tenant ")
              .concat(tenantId),
          );
          return [3 /*break*/, 6];
        case 5:
          console.warn("Missing tenant_id or credits in session metadata");
          _a.label = 6;
        case 6:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ received: true }), {
              status: 200,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 7:
          err_1 = _a.sent();
          console.error("Webhook handler failed: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: "Webhook Error: ".concat(err_1.message),
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
});
