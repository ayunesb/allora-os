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
var supabase_js_2_38_4_1 = require("https://esm.sh/@supabase/supabase-js@2.38.4");
var cors_ts_1 = require("../_shared/cors.ts");
// Get environment variables
var supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
var supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
var zyteApiKey = Deno.env.get("ZYTE_API_KEY") || "";
// Initialize Supabase client
var supabase = (0, supabase_js_2_38_4_1.createClient)(
  supabaseUrl,
  supabaseAnonKey,
);
Deno.serve(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var website,
      normalizedUrl,
      zyteResponse,
      errorData,
      responseData,
      companyData,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [
              2 /*return*/,
              new Response(null, { headers: cors_ts_1.corsHeaders }),
            ];
          }
          // Ensure only POST requests are handled
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
          _a.label = 1;
        case 1:
          _a.trys.push([1, 7, , 8]);
          return [4 /*yield*/, req.json()];
        case 2:
          website = _a.sent().website;
          if (!website) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Website URL is required" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          console.log("Fetching company data for website: ".concat(website));
          normalizedUrl = website;
          if (!normalizedUrl.startsWith("http")) {
            normalizedUrl = "https://".concat(normalizedUrl);
          }
          return [
            4 /*yield*/,
            fetch("https://api.zyte.com/v1/extract", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Basic ".concat(
                  btoa("".concat(zyteApiKey, ":")),
                ),
              },
              body: JSON.stringify({
                url: normalizedUrl,
                browserHtml: true,
                extractFrom: {
                  webPage: {
                    "schema.org": {
                      "@type": ["Organization", "LocalBusiness", "Corporation"],
                    },
                    meta: true,
                    article: true,
                    address: true,
                    organizationContacts: true,
                    product: true,
                    autoKeywords: true,
                    links: true,
                    itemList: true,
                    screenshot: true,
                  },
                },
              }),
            }),
          ];
        case 3:
          zyteResponse = _a.sent();
          if (!!zyteResponse.ok) return [3 /*break*/, 5];
          return [4 /*yield*/, zyteResponse.json()];
        case 4:
          errorData = _a.sent();
          console.error("Zyte API error:", errorData);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: "Failed to fetch company data",
                details: errorData,
              }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 5:
          return [4 /*yield*/, zyteResponse.json()];
        case 6:
          responseData = _a.sent();
          companyData = processCompanyData(responseData);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                data: companyData,
              }),
              {
                status: 200,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 7:
          error_1 = _a.sent();
          console.error("Error processing request:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: error_1.message || "Unknown error occurred",
              }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
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
// Helper function to process and extract relevant company data from Zyte response
function processCompanyData(zyteData) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  try {
    var result = {
      name: "",
      description: "",
      industry: "",
      size: "",
      products: [],
      services: [],
      website: "",
      headquarters: "",
      founded: "",
    };
    // Extract company name
    if (
      (_b =
        (_a = zyteData.webPage) === null || _a === void 0
          ? void 0
          : _a.schema) === null || _b === void 0
        ? void 0
        : _b.org
    ) {
      var org = zyteData.webPage.schema.org.find(function (item) {
        return (
          item["@type"] === "Organization" ||
          item["@type"] === "LocalBusiness" ||
          item["@type"] === "Corporation"
        );
      });
      if (org) {
        result.name = org.name || "";
        result.website = org.url || "";
        result.founded = org.foundingDate || "";
      }
    }
    // If no name found in schema.org data, try meta data
    if (
      !result.name &&
      ((_c = zyteData.webPage) === null || _c === void 0 ? void 0 : _c.meta)
    ) {
      result.name = zyteData.webPage.meta.title || "";
    }
    // Extract description
    if (
      (_e =
        (_d = zyteData.webPage) === null || _d === void 0
          ? void 0
          : _d.meta) === null || _e === void 0
        ? void 0
        : _e.description
    ) {
      result.description = zyteData.webPage.meta.description;
    } else if (
      (_g =
        (_f = zyteData.webPage) === null || _f === void 0
          ? void 0
          : _f.article) === null || _g === void 0
        ? void 0
        : _g.description
    ) {
      result.description = zyteData.webPage.article.description;
    }
    // Extract industry from keywords
    if (
      (_h = zyteData.webPage) === null || _h === void 0
        ? void 0
        : _h.autoKeywords
    ) {
      var keywords = zyteData.webPage.autoKeywords
        .slice(0, 5)
        .map(function (k) {
          return k.value;
        });
      var industryKeywords = {
        technology: "Technology",
        software: "Technology",
        tech: "Technology",
        healthcare: "Healthcare",
        medical: "Healthcare",
        finance: "Finance",
        banking: "Finance",
        education: "Education",
        retail: "Retail",
        ecommerce: "E-Commerce",
        manufacturing: "Manufacturing",
        "real estate": "Real Estate",
        property: "Real Estate",
        construction: "Construction",
        // Add more industry mappings as needed
      };
      for (var _i = 0, keywords_1 = keywords; _i < keywords_1.length; _i++) {
        var keyword = keywords_1[_i];
        for (
          var _o = 0, _p = Object.entries(industryKeywords);
          _o < _p.length;
          _o++
        ) {
          var _q = _p[_o],
            industryKey = _q[0],
            industryValue = _q[1];
          if (keyword.toLowerCase().includes(industryKey)) {
            result.industry = industryValue;
            break;
          }
        }
        if (result.industry) break;
      }
    }
    // Extract products
    if (
      (_j = zyteData.webPage) === null || _j === void 0 ? void 0 : _j.product
    ) {
      result.products = zyteData.webPage.product.map(function (p) {
        return p.name || "Unnamed Product";
      });
    }
    // Try to extract services from navigation
    if ((_k = zyteData.webPage) === null || _k === void 0 ? void 0 : _k.links) {
      var serviceKeywords_1 = [
        "services",
        "solutions",
        "offerings",
        "what we do",
      ];
      var serviceLinks = zyteData.webPage.links.filter(function (link) {
        return serviceKeywords_1.some(function (keyword) {
          return link.text.toLowerCase().includes(keyword);
        });
      });
      if (serviceLinks.length > 0) {
        result.services = serviceLinks.map(function (link) {
          return link.text;
        });
      }
    }
    // Try to estimate company size
    if (
      (_m =
        (_l = zyteData.webPage) === null || _l === void 0
          ? void 0
          : _l.article) === null || _m === void 0
        ? void 0
        : _m.text
    ) {
      var sizePatterns = [
        { regex: /([0-9,]+)\s*employees/i, group: 1 },
        { regex: /team of\s*([0-9,]+)/i, group: 1 },
        { regex: /staff of\s*([0-9,]+)/i, group: 1 },
        { regex: /company of\s*([0-9,]+)/i, group: 1 },
      ];
      for (
        var _r = 0, sizePatterns_1 = sizePatterns;
        _r < sizePatterns_1.length;
        _r++
      ) {
        var pattern = sizePatterns_1[_r];
        var match = zyteData.webPage.article.text.match(pattern.regex);
        if (match && match[pattern.group]) {
          result.size = match[pattern.group].replace(/,/g, "");
          break;
        }
      }
    }
    return result;
  } catch (error) {
    console.error("Error processing company data:", error);
    return {
      name: "",
      description: "",
      industry: "",
      size: "",
      products: [],
      services: [],
      website: "",
      headquarters: "",
      founded: "",
    };
  }
}
