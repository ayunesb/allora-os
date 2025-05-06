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
var TIKTOK_APP_ID = Deno.env.get("TIKTOK_APP_ID") || "";
var TIKTOK_APP_SECRET = Deno.env.get("TIKTOK_APP_SECRET") || "";
var APP_URL = Deno.env.get("APP_URL") || "http://localhost:5173";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var action,
      auth_code,
      url,
      body,
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
      state,
      stateParam,
      tokenUrl,
      tokenResponse,
      errorText,
      tokenData,
      accessToken,
      refreshToken,
      expiresIn,
      advertiserId,
      insertError,
      error_1,
      _c,
      connection,
      connectionError,
      updateError,
      err_1;
    var _d, _e;
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          // Handle CORS for preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _f.label = 1;
        case 1:
          _f.trys.push([1, 21, , 22]);
          (action = void 0), (auth_code = void 0);
          url = new URL(req.url);
          if (!(req.method === "GET")) return [3 /*break*/, 2];
          // Handle GET requests (like from the callback URL)
          action = url.searchParams.get("action");
          auth_code = url.searchParams.get("auth_code");
          return [3 /*break*/, 4];
        case 2:
          return [4 /*yield*/, req.json()];
        case 3:
          body = _f.sent();
          action = body.action;
          auth_code = body.auth_code;
          _f.label = 4;
        case 4:
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
          return [4 /*yield*/, supabase.auth.getUser()];
        case 5:
          (_a = _f.sent()), (user = _a.data.user), (authError = _a.error);
          if (authError || !user) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Unauthorized", status: 401 }),
                {
                  status: 401,
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
              .from("profiles")
              .select("company_id")
              .eq("id", user.id)
              .single(),
          ];
        case 6:
          (_b = _f.sent()), (profile = _b.data), (profileError = _b.error);
          if (profileError || !profile.company_id) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Company not found", status: 404 }),
                {
                  status: 404,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          if (!(action === "authorize")) return [3 /*break*/, 7];
          redirectUri = "".concat(APP_URL, "/dashboard/auth/tiktok/callback");
          scopes = "ads.basic,ads.manage,billing.basic";
          state = JSON.stringify({
            userId: user.id,
            companyId: profile.company_id,
          });
          authUrl = "https://ads.tiktok.com/marketing_api/auth?app_id="
            .concat(TIKTOK_APP_ID, "&redirect_uri=")
            .concat(encodeURIComponent(redirectUri), "&state=")
            .concat(encodeURIComponent(state), "&scope=")
            .concat(encodeURIComponent(scopes));
          return [
            2 /*return*/,
            new Response(JSON.stringify({ url: authUrl }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 7:
          if (!(action === "callback")) return [3 /*break*/, 16];
          if (!auth_code) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "No auth code provided", status: 400 }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          state = void 0;
          try {
            stateParam = url.searchParams.get("state");
            if (stateParam) {
              state = JSON.parse(decodeURIComponent(stateParam));
            } else {
              // If no state in URL, use current user's company
              state = { companyId: profile.company_id };
            }
          } catch (error) {
            console.error("Error parsing state parameter:", error);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Invalid state parameter",
                  status: 400,
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
          if (!state.companyId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Company ID not found in state",
                  status: 400,
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
          _f.label = 8;
        case 8:
          _f.trys.push([8, 14, , 15]);
          tokenUrl =
            "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/";
          return [
            4 /*yield*/,
            fetch(tokenUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                app_id: TIKTOK_APP_ID,
                secret: TIKTOK_APP_SECRET,
                auth_code: auth_code,
              }),
            }),
          ];
        case 9:
          tokenResponse = _f.sent();
          if (!!tokenResponse.ok) return [3 /*break*/, 11];
          return [4 /*yield*/, tokenResponse.text()];
        case 10:
          errorText = _f.sent();
          console.error("TikTok token exchange failed:", errorText);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: "TikTok API error: "
                  .concat(tokenResponse.status, " ")
                  .concat(errorText),
                status: tokenResponse.status,
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 11:
          return [4 /*yield*/, tokenResponse.json()];
        case 12:
          tokenData = _f.sent();
          if (
            tokenData.code !== 0 ||
            !((_d = tokenData.data) === null || _d === void 0
              ? void 0
              : _d.access_token)
          ) {
            console.error("TikTok token response error:", tokenData);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "TikTok API returned error code: ".concat(
                    tokenData.code,
                  ),
                  details: tokenData,
                  status: 400,
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
          accessToken = tokenData.data.access_token;
          refreshToken = tokenData.data.refresh_token;
          expiresIn = tokenData.data.expires_in;
          advertiserId =
            (_e = tokenData.data.advertiser_ids) === null || _e === void 0
              ? void 0
              : _e[0];
          if (!advertiserId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "No advertiser account found",
                  status: 400,
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
          return [
            4 /*yield*/,
            supabase.from("ad_platform_connections").upsert({
              user_id: user.id,
              company_id: state.companyId,
              platform: "tiktok",
              access_token: accessToken,
              refresh_token: refreshToken,
              ad_account_id: advertiserId,
              token_expires_at: new Date(
                Date.now() + expiresIn * 1000,
              ).toISOString(),
              scopes: ["ads.basic", "ads.manage", "billing.basic"],
              is_active: true,
            }),
          ];
        case 13:
          insertError = _f.sent().error;
          if (insertError) {
            console.error("Database insertion error:", insertError);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to save connection details",
                  details: insertError,
                  status: 500,
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
                advertiser_id: advertiserId,
                redirect: "".concat(
                  APP_URL,
                  "/dashboard/ad-accounts?platform=tiktok&success=true",
                ),
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 14:
          error_1 = _f.sent();
          console.error("TikTok token exchange error:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: "Token exchange failed: ".concat(error_1.message),
                status: 500,
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 15:
          return [3 /*break*/, 20];
        case 16:
          if (!(action === "revoke")) return [3 /*break*/, 19];
          return [
            4 /*yield*/,
            supabase
              .from("ad_platform_connections")
              .select("access_token")
              .match({ company_id: profile.company_id, platform: "tiktok" })
              .single(),
          ];
        case 17:
          (_c = _f.sent()),
            (connection = _c.data),
            (connectionError = _c.error);
          if (connectionError || !connection) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Connection not found", status: 404 }),
                {
                  status: 404,
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
              .from("ad_platform_connections")
              .update({ is_active: false })
              .match({ company_id: profile.company_id, platform: "tiktok" }),
          ];
        case 18:
          updateError = _f.sent().error;
          if (updateError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to update connection status",
                  details: updateError,
                  status: 500,
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
        case 19:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: "Invalid action", status: 400 }),
              {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 20:
          return [3 /*break*/, 22];
        case 21:
          err_1 = _f.sent();
          console.error("TikTok auth error: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: err_1.message, status: 500 }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 22:
          return [2 /*return*/];
      }
    });
  });
});
