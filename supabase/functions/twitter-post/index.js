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
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
var cors_ts_1 = require("../_shared/cors.ts");
var crypto_ts_1 = require("https://deno.land/std@0.167.0/node/crypto.ts");
var supabaseUrl =
  Deno.env.get("SUPABASE_URL") || "https://tnfqzklfdwknmplrygag.supabase.co";
var supabaseKey =
  Deno.env.get("SUPABASE_ANON_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";
// Twitter API credentials - these need to be added to Supabase secrets
var API_KEY = Deno.env.get("TWITTER_CONSUMER_KEY");
var API_SECRET = Deno.env.get("TWITTER_CONSUMER_SECRET");
var BASE_URL = "https://api.twitter.com/2";
var supabase = (0, supabase_js_2_38_0_1.createClient)(supabaseUrl, supabaseKey);
function validateEnvironmentVariables() {
  if (!API_KEY) throw new Error("Missing TWITTER_CONSUMER_KEY");
  if (!API_SECRET) throw new Error("Missing TWITTER_CONSUMER_SECRET");
}
// Generates the OAuth signature for Twitter API requests
function generateOAuthSignature(
  method,
  url,
  params,
  consumerSecret,
  tokenSecret,
) {
  var signatureBaseString = ""
    .concat(method, "&")
    .concat(encodeURIComponent(url), "&")
    .concat(
      encodeURIComponent(
        Object.entries(params)
          .sort()
          .map(function (_a) {
            var k = _a[0],
              v = _a[1];
            return "".concat(k, "=").concat(v);
          })
          .join("&"),
      ),
    );
  var signingKey = ""
    .concat(encodeURIComponent(consumerSecret), "&")
    .concat(encodeURIComponent(tokenSecret));
  var hmacSha1 = (0, crypto_ts_1.createHmac)("sha1", signingKey);
  var signature = hmacSha1.update(signatureBaseString).digest("base64");
  return signature;
}
// Generates the OAuth header for Twitter API requests
function generateOAuthHeader(method, url, accessToken, accessTokenSecret) {
  var oauthParams = {
    oauth_consumer_key: API_KEY,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: "1.0",
  };
  var signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    API_SECRET,
    accessTokenSecret,
  );
  var signedOAuthParams = __assign(__assign({}, oauthParams), {
    oauth_signature: signature,
  });
  return (
    "OAuth " +
    Object.entries(signedOAuthParams)
      .sort(function (a, b) {
        return a[0].localeCompare(b[0]);
      })
      .map(function (_a) {
        var k = _a[0],
          v = _a[1];
        return ""
          .concat(encodeURIComponent(k), '="')
          .concat(encodeURIComponent(v), '"');
      })
      .join(", ")
  );
}
// Posts a tweet using the Twitter API
function postTweet(text, accessToken, accessTokenSecret) {
  return __awaiter(this, void 0, void 0, function () {
    var url, method, oauthHeader, response, text_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          url = "".concat(BASE_URL, "/tweets");
          method = "POST";
          oauthHeader = generateOAuthHeader(
            method,
            url,
            accessToken,
            accessTokenSecret,
          );
          return [
            4 /*yield*/,
            fetch(url, {
              method: method,
              headers: {
                Authorization: oauthHeader,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: text }),
            }),
          ];
        case 1:
          response = _a.sent();
          if (!!response.ok) return [3 /*break*/, 3];
          return [4 /*yield*/, response.text()];
        case 2:
          text_1 = _a.sent();
          throw new Error(
            "Twitter API error: ".concat(response.status, " ").concat(text_1),
          );
        case 3:
          return [2 /*return*/, response.json()];
      }
    });
  });
}
// Queue a tweet for moderation if queueing is enabled
function queueTweet(tenant_id, message) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [
            4 /*yield*/,
            supabase
              .from("tweet_queue")
              .insert({
                tenant_id: tenant_id,
                content: message,
                status: "pending",
              })
              .select()
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw new Error("Failed to queue tweet: ".concat(error.message));
          }
          return [
            2 /*return*/,
            { success: true, queued: true, queue_id: data.id },
          ];
      }
    });
  });
}
Deno.serve(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      tenant_id,
      message,
      _b,
      queue,
      queueResult,
      _c,
      tenant,
      tenantError,
      result,
      error_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [
              2 /*return*/,
              new Response(null, { headers: cors_ts_1.corsHeaders }),
            ];
          }
          _d.label = 1;
        case 1:
          _d.trys.push([1, 8, , 9]);
          validateEnvironmentVariables();
          if (req.method !== "POST") {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Method not allowed" }), {
                status: 405,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _d.sent()),
            (tenant_id = _a.tenant_id),
            (message = _a.message),
            (_b = _a.queue),
            (queue = _b === void 0 ? true : _b);
          if (!tenant_id || !message) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Missing required parameters: tenant_id and message",
                }),
                {
                  status: 400,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          if (!queue) return [3 /*break*/, 4];
          return [4 /*yield*/, queueTweet(tenant_id, message)];
        case 3:
          queueResult = _d.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(queueResult), {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 4:
          return [
            4 /*yield*/,
            supabase
              .from("tenants")
              .select("twitter_access_token, twitter_access_token_secret")
              .eq("id", tenant_id)
              .single(),
          ];
        case 5:
          (_c = _d.sent()), (tenant = _c.data), (tenantError = _c.error);
          if (
            tenantError ||
            !(tenant === null || tenant === void 0
              ? void 0
              : tenant.twitter_access_token) ||
            !(tenant === null || tenant === void 0
              ? void 0
              : tenant.twitter_access_token_secret)
          ) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Twitter not connected for this tenant",
                }),
                {
                  status: 400,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            postTweet(
              message,
              tenant.twitter_access_token,
              tenant.twitter_access_token_secret,
            ),
          ];
        case 6:
          result = _d.sent();
          // Update the last_tweet_at timestamp
          return [
            4 /*yield*/,
            supabase
              .from("tenants")
              .update({ last_tweet_at: new Date().toISOString() })
              .eq("id", tenant_id),
          ];
        case 7:
          // Update the last_tweet_at timestamp
          _d.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ success: true, tweet_id: result.data.id }),
              {
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 8:
          error_1 = _d.sent();
          console.error("Error posting to Twitter:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: error_1.message || "Unknown error" }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 9:
          return [2 /*return*/];
      }
    });
  });
});
