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
// Supabase Edge Function for Clearbit Lookups
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
require("https://deno.land/x/xhr@0.1.0/mod.ts");
// CORS headers for the response
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      type,
      query,
      clearbitApiKey,
      result,
      response_1,
      data,
      response_2,
      data,
      error_1;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
      switch (_l.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _l.label = 1;
        case 1:
          _l.trys.push([1, 10, , 11]);
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _l.sent()), (type = _a.type), (query = _a.query);
          console.log(
            "Received ".concat(type, " lookup request for: ").concat(query),
          );
          clearbitApiKey = Deno.env.get("CLEARBIT_API_KEY");
          if (!clearbitApiKey) {
            throw new Error("CLEARBIT_API_KEY environment variable not set");
          }
          result = void 0;
          if (!(type === "company")) return [3 /*break*/, 5];
          return [
            4 /*yield*/,
            fetch(
              "https://company.clearbit.com/v2/companies/find?domain=".concat(
                query,
              ),
              {
                headers: {
                  Authorization: "Bearer ".concat(clearbitApiKey),
                },
              },
            ),
          ];
        case 3:
          response_1 = _l.sent();
          if (!response_1.ok) {
            if (response_1.status === 404) {
              return [
                2 /*return*/,
                new Response(JSON.stringify({ result: "Company not found" }), {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                }),
              ];
            }
            throw new Error(
              "Clearbit API error: ".concat(response_1.statusText),
            );
          }
          return [4 /*yield*/, response_1.json()];
        case 4:
          data = _l.sent();
          result = {
            name: data.name,
            domain: data.domain,
            logo: data.logo,
            description: data.description,
            industry:
              (_b = data.category) === null || _b === void 0
                ? void 0
                : _b.industry,
            sector:
              (_c = data.category) === null || _c === void 0
                ? void 0
                : _c.sector,
            employees:
              (_d = data.metrics) === null || _d === void 0
                ? void 0
                : _d.employees,
            location: data.location,
            country:
              (_e = data.geo) === null || _e === void 0 ? void 0 : _e.country,
            tags: data.tags,
          };
          return [3 /*break*/, 9];
        case 5:
          if (!(type === "person")) return [3 /*break*/, 8];
          return [
            4 /*yield*/,
            fetch(
              "https://person.clearbit.com/v2/people/find?email=".concat(query),
              {
                headers: {
                  Authorization: "Bearer ".concat(clearbitApiKey),
                },
              },
            ),
          ];
        case 6:
          response_2 = _l.sent();
          if (!response_2.ok) {
            if (response_2.status === 404) {
              return [
                2 /*return*/,
                new Response(JSON.stringify({ result: "Person not found" }), {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                }),
              ];
            }
            throw new Error(
              "Clearbit API error: ".concat(response_2.statusText),
            );
          }
          return [4 /*yield*/, response_2.json()];
        case 7:
          data = _l.sent();
          result = {
            name:
              (_f = data.name) === null || _f === void 0 ? void 0 : _f.fullName,
            firstName:
              (_g = data.name) === null || _g === void 0
                ? void 0
                : _g.givenName,
            lastName:
              (_h = data.name) === null || _h === void 0
                ? void 0
                : _h.familyName,
            email: data.email,
            title: data.title,
            company:
              (_j = data.employment) === null || _j === void 0
                ? void 0
                : _j.name,
            role:
              (_k = data.employment) === null || _k === void 0
                ? void 0
                : _k.role,
            location: data.location,
            bio: data.bio,
            avatar: data.avatar,
          };
          return [3 /*break*/, 9];
        case 8:
          throw new Error("Invalid lookup type. Must be 'company' or 'person'");
        case 9:
          console.log("Lookup completed successfully");
          return [
            2 /*return*/,
            new Response(JSON.stringify({ result: result }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 10:
          error_1 = _l.sent();
          console.error("Error in clearbit-lookup function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 11:
          return [2 /*return*/];
      }
    });
  });
});
