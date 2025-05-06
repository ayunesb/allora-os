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
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var authHeader,
      supabaseClient,
      adminClient,
      _a,
      user,
      authError,
      userId,
      profileError,
      preferencesError,
      actionsError,
      profileData,
      companyAdmins,
      integrationsError,
      strategiesError,
      campaignsError,
      companyError,
      deleteUserError,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          // Handle CORS
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _b.label = 1;
        case 1:
          _b.trys.push([1, 14, , 15]);
          authHeader = req.headers.get("Authorization");
          if (!authHeader) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "No authorization header" }),
                {
                  status: 401,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          supabaseClient = (0, supabase_js_2_38_0_1.createClient)(
            Deno.env.get("SUPABASE_URL") || "",
            Deno.env.get("SUPABASE_ANON_KEY") || "",
            {
              auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
              },
              global: {
                headers: {
                  Authorization: authHeader,
                },
              },
            },
          );
          adminClient = (0, supabase_js_2_38_0_1.createClient)(
            Deno.env.get("SUPABASE_URL") || "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
            {
              auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
              },
            },
          );
          return [4 /*yield*/, supabaseClient.auth.getUser()];
        case 2:
          (_a = _b.sent()), (user = _a.data.user), (authError = _a.error);
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
          userId = user.id;
          console.log(
            "Starting account deletion process for user: ".concat(userId),
          );
          return [
            4 /*yield*/,
            supabaseClient.from("profiles").delete().eq("id", userId),
          ];
        case 3:
          profileError = _b.sent().error;
          if (profileError) {
            console.error("Error deleting profile:", profileError);
            // Continue with other deletions even if this fails
          }
          return [
            4 /*yield*/,
            supabaseClient
              .from("user_preferences")
              .delete()
              .eq("user_id", userId),
          ];
        case 4:
          preferencesError = _b.sent().error;
          if (preferencesError) {
            console.error("Error deleting user preferences:", preferencesError);
            // Continue with other deletions even if this fails
          }
          return [
            4 /*yield*/,
            supabaseClient.from("user_actions").delete().eq("user_id", userId),
          ];
        case 5:
          actionsError = _b.sent().error;
          if (actionsError) {
            console.error("Error deleting user actions:", actionsError);
            // Continue with other deletions even if this fails
          }
          return [
            4 /*yield*/,
            supabaseClient
              .from("profiles")
              .select("company_id, role")
              .eq("id", userId)
              .single(),
          ];
        case 6:
          profileData = _b.sent().data;
          if (
            !(
              (profileData === null || profileData === void 0
                ? void 0
                : profileData.company_id) && profileData.role === "admin"
            )
          )
            return [3 /*break*/, 12];
          return [
            4 /*yield*/,
            supabaseClient
              .from("profiles")
              .select("id")
              .eq("company_id", profileData.company_id)
              .eq("role", "admin"),
          ];
        case 7:
          companyAdmins = _b.sent().data;
          if (!(!companyAdmins || companyAdmins.length <= 1))
            return [3 /*break*/, 12];
          console.log(
            "User is the last admin of company. Deleting company data:",
            profileData.company_id,
          );
          return [
            4 /*yield*/,
            supabaseClient
              .from("company_integrations")
              .delete()
              .eq("company_id", profileData.company_id),
          ];
        case 8:
          integrationsError = _b.sent().error;
          if (integrationsError) {
            console.error(
              "Error deleting company integrations:",
              integrationsError,
            );
          }
          return [
            4 /*yield*/,
            supabaseClient
              .from("strategies")
              .delete()
              .eq("company_id", profileData.company_id),
          ];
        case 9:
          strategiesError = _b.sent().error;
          if (strategiesError) {
            console.error(
              "Error deleting company strategies:",
              strategiesError,
            );
          }
          return [
            4 /*yield*/,
            supabaseClient
              .from("campaigns")
              .delete()
              .eq("company_id", profileData.company_id),
          ];
        case 10:
          campaignsError = _b.sent().error;
          if (campaignsError) {
            console.error("Error deleting company campaigns:", campaignsError);
          }
          return [
            4 /*yield*/,
            supabaseClient
              .from("companies")
              .delete()
              .eq("id", profileData.company_id),
          ];
        case 11:
          companyError = _b.sent().error;
          if (companyError) {
            console.error("Error deleting company:", companyError);
          }
          _b.label = 12;
        case 12:
          return [4 /*yield*/, adminClient.auth.admin.deleteUser(userId)];
        case 13:
          deleteUserError = _b.sent().error;
          if (deleteUserError) {
            console.error("Error deleting user account:", deleteUserError);
            // Return partial success
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  success: true,
                  partial: true,
                  error:
                    "Your account data has been deleted, but you'll need to contact support to fully remove your authentication record.",
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          console.log("Account deletion completed successfully");
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 14:
          error_1 = _b.sent();
          console.error("Error during account deletion:", error_1.message);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: false,
                error: error_1.message || "An unexpected error occurred",
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
          return [2 /*return*/];
      }
    });
  });
});
