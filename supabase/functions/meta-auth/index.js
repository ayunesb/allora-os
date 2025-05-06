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
var SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
var META_APP_ID = Deno.env.get("META_APP_ID") || "";
var META_APP_SECRET = Deno.env.get("META_APP_SECRET") || "";
var APP_URL = Deno.env.get("APP_URL") || "http://localhost:5173";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var url,
      params,
      action,
      supabase,
      _a,
      user,
      authError,
      _b,
      profile,
      profileError,
      redirectUri,
      scopes,
      state,
      authUrl,
      code,
      state,
      redirectUri,
      tokenUrl,
      tokenResponse,
      tokenData,
      longLivedTokenUrl,
      longLivedTokenResponse,
      longLivedTokenData,
      adAccountsUrl,
      adAccountsResponse,
      adAccountsData,
      firstAdAccount,
      insertError,
      _c,
      connection,
      connectionError,
      revokeUrl,
      updateError,
      err_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          // Handle CORS
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          url = new URL(req.url);
          params = url.searchParams;
          action = params.get("action");
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
          _d.label = 1;
        case 1:
          _d.trys.push([1, 18, , 19]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_a = _d.sent()), (user = _a.data.user), (authError = _a.error);
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
          return [
            4 /*yield*/,
            supabase
              .from("profiles")
              .select("company_id")
              .eq("id", user.id)
              .single(),
          ];
        case 3:
          (_b = _d.sent()), (profile = _b.data), (profileError = _b.error);
          if (profileError || !profile.company_id) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Company not found" }), {
                status: 404,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          if (!(action === "authorize")) return [3 /*break*/, 4];
          redirectUri = "".concat(APP_URL, "/auth/meta/callback");
          scopes = "ads_management,pages_show_list,business_management";
          state = JSON.stringify({
            userId: user.id,
            companyId: profile.company_id,
          });
          authUrl = "https://www.facebook.com/v18.0/dialog/oauth?client_id="
            .concat(META_APP_ID, "&redirect_uri=")
            .concat(encodeURIComponent(redirectUri), "&scope=")
            .concat(encodeURIComponent(scopes), "&state=")
            .concat(encodeURIComponent(state), "&response_type=code");
          return [
            2 /*return*/,
            new Response(JSON.stringify({ url: authUrl }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 4:
          if (!(action === "callback")) return [3 /*break*/, 12];
          code = params.get("code");
          state = params.get("state")
            ? JSON.parse(params.get("state") || "{}")
            : {};
          if (!code || !state.companyId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Invalid callback request" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          redirectUri = "".concat(APP_URL, "/auth/meta/callback");
          tokenUrl =
            "https://graph.facebook.com/v18.0/oauth/access_token?client_id="
              .concat(META_APP_ID, "&client_secret=")
              .concat(META_APP_SECRET, "&redirect_uri=")
              .concat(encodeURIComponent(redirectUri), "&code=")
              .concat(code);
          return [4 /*yield*/, fetch(tokenUrl)];
        case 5:
          tokenResponse = _d.sent();
          return [4 /*yield*/, tokenResponse.json()];
        case 6:
          tokenData = _d.sent();
          if (!tokenResponse.ok || !tokenData.access_token) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to exchange code for token",
                  details: tokenData,
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
          longLivedTokenUrl =
            "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id="
              .concat(META_APP_ID, "&client_secret=")
              .concat(META_APP_SECRET, "&fb_exchange_token=")
              .concat(tokenData.access_token);
          return [4 /*yield*/, fetch(longLivedTokenUrl)];
        case 7:
          longLivedTokenResponse = _d.sent();
          return [4 /*yield*/, longLivedTokenResponse.json()];
        case 8:
          longLivedTokenData = _d.sent();
          if (!longLivedTokenResponse.ok || !longLivedTokenData.access_token) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get long-lived token",
                  details: longLivedTokenData,
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
          adAccountsUrl =
            "https://graph.facebook.com/v18.0/me/adaccounts?fields=name,account_id&access_token=".concat(
              longLivedTokenData.access_token,
            );
          return [4 /*yield*/, fetch(adAccountsUrl)];
        case 9:
          adAccountsResponse = _d.sent();
          return [4 /*yield*/, adAccountsResponse.json()];
        case 10:
          adAccountsData = _d.sent();
          if (!adAccountsResponse.ok || !adAccountsData.data) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get ad accounts",
                  details: adAccountsData,
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
          firstAdAccount = adAccountsData.data[0];
          if (!firstAdAccount) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "No ad accounts found" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("ad_platform_connections")
              .upsert({
                user_id: user.id,
                company_id: state.companyId,
                platform: "meta",
                access_token: longLivedTokenData.access_token,
                refresh_token: null, // Meta doesn't use refresh tokens in the same way
                ad_account_id: firstAdAccount.account_id,
                token_expires_at: new Date(
                  Date.now() + longLivedTokenData.expires_in * 1000,
                ),
                scopes: [
                  "ads_management",
                  "pages_show_list",
                  "business_management",
                ],
                is_active: true,
              })
              .select(),
          ];
        case 11:
          insertError = _d.sent().error;
          if (insertError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to save connection details",
                  details: insertError,
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
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                ad_account: firstAdAccount,
                redirect: "".concat(APP_URL, "/dashboard/ad-accounts"),
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 12:
          if (!(action === "revoke")) return [3 /*break*/, 16];
          return [
            4 /*yield*/,
            supabase
              .from("ad_platform_connections")
              .select("access_token")
              .match({ company_id: profile.company_id, platform: "meta" })
              .single(),
          ];
        case 13:
          (_c = _d.sent()),
            (connection = _c.data),
            (connectionError = _c.error);
          if (connectionError || !connection) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Connection not found" }), {
                status: 404,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          revokeUrl =
            "https://graph.facebook.com/v18.0/me/permissions?access_token=".concat(
              connection.access_token,
            );
          return [4 /*yield*/, fetch(revokeUrl, { method: "DELETE" })];
        case 14:
          _d.sent();
          return [
            4 /*yield*/,
            supabase
              .from("ad_platform_connections")
              .update({ is_active: false })
              .match({ company_id: profile.company_id, platform: "meta" }),
          ];
        case 15:
          updateError = _d.sent().error;
          if (updateError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to update connection status",
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
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 16:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Invalid action" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 17:
          return [3 /*break*/, 19];
        case 18:
          err_1 = _d.sent();
          console.error("Meta auth error: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: err_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 19:
          return [2 /*return*/];
      }
    });
  });
});
