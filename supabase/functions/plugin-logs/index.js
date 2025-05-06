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
var supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
var supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
// Initialize the Supabase client with the service role key (admin privileges)
var supabase = (0, supabase_js_2_38_0_1.createClient)(
  supabaseUrl,
  supabaseServiceKey,
);
Deno.serve(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var authHeader,
      token,
      _a,
      user,
      userError,
      _b,
      profile,
      profileError,
      _c,
      data,
      error,
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
          _d.trys.push([1, 5, , 6]);
          // Only allow GET requests
          if (req.method !== "GET") {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Method not allowed",
                }),
                {
                  status: 405,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          authHeader = req.headers.get("Authorization");
          if (!authHeader) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Unauthorized",
                }),
                {
                  status: 401,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          token = authHeader.replace("Bearer ", "");
          return [4 /*yield*/, supabase.auth.getUser(token)];
        case 2:
          (_a = _d.sent()), (user = _a.data.user), (userError = _a.error);
          if (userError || !user) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Unauthorized",
                }),
                {
                  status: 401,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase.from("profiles").select("role").eq("id", user.id).single(),
          ];
        case 3:
          (_b = _d.sent()), (profile = _b.data), (profileError = _b.error);
          if (
            profileError ||
            (profile === null || profile === void 0 ? void 0 : profile.role) !==
              "admin"
          ) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Forbidden",
                }),
                {
                  status: 403,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("plugin_logs")
              .select("*")
              .order("created_at", { ascending: false })
              .limit(100),
          ];
        case 4:
          (_c = _d.sent()), (data = _c.data), (error = _c.error);
          if (error) {
            console.error("Error fetching plugin logs:", error);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to fetch plugin logs",
                }),
                {
                  status: 500,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            2 /*return*/,
            new Response(JSON.stringify(data), {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 5:
          error_1 = _d.sent();
          console.error("Unexpected error:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: "Internal server error",
              }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 6:
          return [2 /*return*/];
      }
    });
  });
});
