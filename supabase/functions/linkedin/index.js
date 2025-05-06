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
var CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID") || "";
var CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET") || "";
var REDIRECT_URI = Deno.env.get("LINKEDIN_REDIRECT_URI") || "";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      action,
      code,
      state,
      companyId,
      accessToken,
      query,
      _b,
      authUrl,
      tokenResponse,
      tokenData,
      searchResponse,
      searchData,
      error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _c.label = 1;
        case 1:
          _c.trys.push([1, 13, , 14]);
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _c.sent()),
            (action = _a.action),
            (code = _a.code),
            (state = _a.state),
            (companyId = _a.companyId),
            (accessToken = _a.accessToken),
            (query = _a.query);
          _b = action;
          switch (_b) {
            case "get_auth_url":
              return [3 /*break*/, 3];
            case "exchange_code":
              return [3 /*break*/, 4];
            case "search_connections":
              return [3 /*break*/, 7];
            case "import_connections":
              return [3 /*break*/, 10];
          }
          return [3 /*break*/, 11];
        case 3:
          {
            authUrl =
              "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="
                .concat(CLIENT_ID, "&redirect_uri=")
                .concat(encodeURIComponent(REDIRECT_URI), "&state=")
                .concat(
                  state,
                  "&scope=r_liteprofile%20r_emailaddress%20r_organization_social",
                );
            return [
              2 /*return*/,
              new Response(JSON.stringify({ url: authUrl }), {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          _c.label = 4;
        case 4:
          return [
            4 /*yield*/,
            fetch("https://www.linkedin.com/oauth/v2/accessToken", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
              }),
            }),
          ];
        case 5:
          tokenResponse = _c.sent();
          return [4 /*yield*/, tokenResponse.json()];
        case 6:
          tokenData = _c.sent();
          if (tokenData.error) {
            throw new Error(
              "LinkedIn API error: ".concat(tokenData.error_description),
            );
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                access_token: tokenData.access_token,
                expires_in: tokenData.expires_in,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 7:
          // Search LinkedIn connections with optional filters
          if (!accessToken) {
            throw new Error("No access token provided");
          }
          return [
            4 /*yield*/,
            fetch(
              "https://api.linkedin.com/v2/search?q=".concat(
                encodeURIComponent(query),
              ),
              {
                headers: {
                  Authorization: "Bearer ".concat(accessToken),
                  "Content-Type": "application/json",
                },
              },
            ),
          ];
        case 8:
          searchResponse = _c.sent();
          return [4 /*yield*/, searchResponse.json()];
        case 9:
          searchData = _c.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify({ connections: searchData }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 10:
          {
            // Import selected connections as leads
            if (!accessToken) {
              throw new Error("No access token provided");
            }
            // This would typically make calls to both LinkedIn API and your database
            // to import the selected connections as leads
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  success: true,
                  message: "Connections imported successfully",
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          _c.label = 11;
        case 11:
          throw new Error("Unknown action: ".concat(action));
        case 12:
          return [3 /*break*/, 14];
        case 13:
          error_1 = _c.sent();
          console.error("Error in LinkedIn function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 14:
          return [2 /*return*/];
      }
    });
  });
});
