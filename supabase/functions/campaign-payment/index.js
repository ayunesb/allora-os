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
var stripe_14_21_0_1 = require("https://esm.sh/stripe@14.21.0");
var SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
var STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "";
var APP_URL = Deno.env.get("APP_URL") || "http://localhost:5173";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabase,
      stripe,
      _a,
      user,
      authError,
      _b,
      action,
      campaignId,
      cancelUrl,
      _c,
      campaign,
      campaignError,
      managementFee,
      totalAmount,
      updateError,
      customerId,
      profile,
      customer,
      session,
      _d,
      campaign,
      campaignError,
      session,
      paymentStatus,
      err_1;
    var _e;
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          // Handle CORS
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          supabase = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_ANON_KEY,
            {
              auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
              },
              global: {
                headers: {
                  Authorization: req.headers.get("Authorization") || "",
                },
              },
            },
          );
          stripe = new stripe_14_21_0_1.default(STRIPE_SECRET_KEY, {
            apiVersion: "2023-10-16",
          });
          _f.label = 1;
        case 1:
          _f.trys.push([1, 20, , 21]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_a = _f.sent()), (user = _a.data.user), (authError = _a.error);
          if (authError || !user) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [4 /*yield*/, req.json()];
        case 3:
          (_b = _f.sent()),
            (action = _b.action),
            (campaignId = _b.campaignId),
            (cancelUrl = _b.cancelUrl);
          if (!(action === "create-checkout-session")) return [3 /*break*/, 13];
          if (!campaignId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Campaign ID is required" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .select("*")
              .eq("id", campaignId)
              .single(),
          ];
        case 4:
          (_c = _f.sent()), (campaign = _c.data), (campaignError = _c.error);
          if (campaignError || !campaign) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Campaign not found",
                  details: campaignError,
                }),
                {
                  status: 404,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          managementFee = Math.round(campaign.budget * 0.1);
          totalAmount = campaign.budget + managementFee;
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                management_fee: managementFee,
                total_amount: totalAmount,
              })
              .eq("id", campaignId),
          ];
        case 5:
          updateError = _f.sent().error;
          if (updateError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to update campaign",
                  details: updateError,
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
          customerId = void 0;
          return [
            4 /*yield*/,
            supabase
              .from("profiles")
              .select("stripe_customer_id, name, email")
              .eq("id", user.id)
              .single(),
          ];
        case 6:
          profile = _f.sent().data;
          if (
            !(profile === null || profile === void 0
              ? void 0
              : profile.stripe_customer_id)
          )
            return [3 /*break*/, 7];
          customerId = profile.stripe_customer_id;
          return [3 /*break*/, 10];
        case 7:
          return [
            4 /*yield*/,
            stripe.customers.create({
              name:
                (profile === null || profile === void 0
                  ? void 0
                  : profile.name) ||
                ((_e = user.email) === null || _e === void 0
                  ? void 0
                  : _e.split("@")[0]),
              email: user.email,
              metadata: {
                userId: user.id,
              },
            }),
          ];
        case 8:
          customer = _f.sent();
          customerId = customer.id;
          // Save Stripe customer ID
          return [
            4 /*yield*/,
            supabase
              .from("profiles")
              .update({ stripe_customer_id: customerId })
              .eq("id", user.id),
          ];
        case 9:
          // Save Stripe customer ID
          _f.sent();
          _f.label = 10;
        case 10:
          return [
            4 /*yield*/,
            stripe.checkout.sessions.create({
              payment_method_types: ["card"],
              customer: customerId,
              line_items: [
                {
                  price_data: {
                    currency: "usd",
                    product_data: {
                      name: "Campaign: ".concat(campaign.name),
                      description: "Ad budget: $"
                        .concat(campaign.budget, " + Management fee: $")
                        .concat(managementFee),
                    },
                    unit_amount: Math.round(totalAmount * 100), // Convert to cents
                  },
                  quantity: 1,
                },
              ],
              metadata: {
                campaignId: campaignId,
                budget: campaign.budget,
                managementFee: managementFee,
                userId: user.id,
              },
              mode: "payment",
              success_url: "".concat(
                APP_URL,
                "/dashboard/campaigns/payment-success?session_id={CHECKOUT_SESSION_ID}",
              ),
              cancel_url:
                cancelUrl || "".concat(APP_URL, "/dashboard/campaigns"),
            }),
          ];
        case 11:
          session = _f.sent();
          // Update campaign with Stripe payment ID
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                stripe_payment_id: session.id,
                payment_status: "pending",
              })
              .eq("id", campaignId),
          ];
        case 12:
          // Update campaign with Stripe payment ID
          _f.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                url: session.url,
                sessionId: session.id,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 13:
          if (!(action === "check-payment-status")) return [3 /*break*/, 18];
          if (!campaignId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Campaign ID is required" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .select("stripe_payment_id, payment_status")
              .eq("id", campaignId)
              .single(),
          ];
        case 14:
          (_d = _f.sent()), (campaign = _d.data), (campaignError = _d.error);
          if (campaignError || !campaign) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Campaign not found",
                  details: campaignError,
                }),
                {
                  status: 404,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          if (!campaign.stripe_payment_id) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "No payment found for this campaign" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            stripe.checkout.sessions.retrieve(campaign.stripe_payment_id),
          ];
        case 15:
          session = _f.sent();
          paymentStatus = campaign.payment_status;
          if (
            !(
              session.payment_status === "paid" &&
              campaign.payment_status !== "paid"
            )
          )
            return [3 /*break*/, 17];
          // Update campaign payment status
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                payment_status: "paid",
                deployment_status: "ready",
              })
              .eq("id", campaignId),
          ];
        case 16:
          // Update campaign payment status
          _f.sent();
          paymentStatus = "paid";
          _f.label = 17;
        case 17:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                status: paymentStatus,
                stripeStatus: session.payment_status,
                session: session,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 18:
          if (action === "process-webhook") {
            // This would be a separate webhook handler for Stripe
            // For now, we'll implement the manual check status above
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Webhook processing not implemented" }),
                {
                  status: 501,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          } else {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Invalid action" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          _f.label = 19;
        case 19:
          return [3 /*break*/, 21];
        case 20:
          err_1 = _f.sent();
          console.error("Campaign payment error: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: err_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 21:
          return [2 /*return*/];
      }
    });
  });
});
