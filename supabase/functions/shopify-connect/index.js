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
var secretManager_ts_1 = require("../_shared/secretManager.ts");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var SUPABASE_URL,
      SUPABASE_ANON_KEY,
      _a,
      userId,
      shopDomain,
      accessToken,
      supabase,
      _b,
      profile,
      profileError,
      companyId,
      _c,
      integrationData,
      integrationError,
      shopInfo,
      shopResponse,
      shopData,
      shopError_1,
      error_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
          SUPABASE_ANON_KEY = (0, secretManager_ts_1.getSecret)(
            "SUPABASE_ANON_KEY",
            true,
          );
          _d.label = 1;
        case 1:
          _d.trys.push([1, 11, , 12]);
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _d.sent()),
            (userId = _a.userId),
            (shopDomain = _a.shopDomain),
            (accessToken = _a.accessToken);
          if (!userId || !shopDomain) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "userId and shopDomain are required" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          supabase = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_ANON_KEY,
          );
          return [
            4 /*yield*/,
            supabase.from("profiles").select("*").eq("id", userId).single(),
          ];
        case 3:
          (_b = _d.sent()), (profile = _b.data), (profileError = _b.error);
          if (profileError) {
            console.error("Error fetching user profile:", profileError);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Failed to fetch user profile" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          companyId = profile.company_id;
          if (!companyId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "User does not have an associated company",
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
            supabase
              .from("company_integrations")
              .upsert(
                {
                  company_id: companyId,
                  integration_ids: {
                    shopify: {
                      domain: shopDomain,
                      access_token: accessToken,
                      connected_at: new Date().toISOString(),
                    },
                  },
                },
                {
                  onConflict: "company_id",
                },
              )
              .select(),
          ];
        case 4:
          (_c = _d.sent()),
            (integrationData = _c.data),
            (integrationError = _c.error);
          if (integrationError) {
            console.error(
              "Error storing Shopify integration:",
              integrationError,
            );
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to store Shopify integration",
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
          shopInfo = null;
          if (!accessToken) return [3 /*break*/, 10];
          _d.label = 5;
        case 5:
          _d.trys.push([5, 9, , 10]);
          return [
            4 /*yield*/,
            fetch(
              "https://".concat(shopDomain, "/admin/api/2023-07/shop.json"),
              {
                headers: {
                  "X-Shopify-Access-Token": accessToken,
                },
              },
            ),
          ];
        case 6:
          shopResponse = _d.sent();
          if (!shopResponse.ok) return [3 /*break*/, 8];
          return [4 /*yield*/, shopResponse.json()];
        case 7:
          shopData = _d.sent();
          shopInfo = shopData.shop;
          _d.label = 8;
        case 8:
          return [3 /*break*/, 10];
        case 9:
          shopError_1 = _d.sent();
          console.error("Error fetching Shopify shop info:", shopError_1);
          return [3 /*break*/, 10];
        case 10:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                message: "Shopify integration saved successfully",
                shop: shopInfo,
              }),
              {
                status: 200,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 11:
          error_1 = _d.sent();
          console.error("Error in shopify-connect function:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: error_1.message || "Unknown error" }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 12:
          return [2 /*return*/];
      }
    });
  });
});
