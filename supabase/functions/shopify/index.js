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
var SHOPIFY_API_KEY = Deno.env.get("SHOPIFY_API_KEY") || "";
var SHOPIFY_API_SECRET = Deno.env.get("SHOPIFY_API_SECRET") || "";
var SHOPIFY_SHOP_DOMAIN = Deno.env.get("SHOPIFY_SHOP_DOMAIN") || "";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var authHeader,
      supabase,
      _a,
      user,
      authError,
      _b,
      action,
      productId,
      productData,
      customerId,
      variantId,
      quantity,
      checkoutId,
      shippingAddress,
      storeId,
      shopifyAuthString,
      shopifyResponse,
      shopifyResult,
      shopifyResponse,
      shopifyResult,
      shopifyResponse,
      shopifyResult,
      shopifyResponse,
      shopifyResult,
      analyticsResponse,
      analyticsResult,
      storeData,
      productResponse,
      productResult,
      product,
      seoUpdates,
      updateResponse,
      updateResult,
      checkoutData,
      shopifyResponse,
      shopifyResult,
      shopifyResponse,
      shopifyResult,
      err_1;
    var _c, _d;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          // Handle CORS
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
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
                  Authorization: authHeader,
                },
              },
            },
          );
          _e.label = 1;
        case 1:
          _e.trys.push([1, 31, , 32]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_a = _e.sent()), (user = _a.data.user), (authError = _a.error);
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
          (_b = _e.sent()),
            (action = _b.action),
            (productId = _b.productId),
            (productData = _b.productData),
            (customerId = _b.customerId),
            (variantId = _b.variantId),
            (quantity = _b.quantity),
            (checkoutId = _b.checkoutId),
            (shippingAddress = _b.shippingAddress),
            (storeId = _b.storeId);
          shopifyAuthString = btoa(
            "".concat(SHOPIFY_API_KEY, ":").concat(SHOPIFY_API_SECRET),
          );
          if (!(action === "list-products")) return [3 /*break*/, 6];
          return [
            4 /*yield*/,
            fetch(
              "https://".concat(
                SHOPIFY_SHOP_DOMAIN,
                "/admin/api/2023-04/products.json",
              ),
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
              },
            ),
          ];
        case 4:
          shopifyResponse = _e.sent();
          return [4 /*yield*/, shopifyResponse.json()];
        case 5:
          shopifyResult = _e.sent();
          if (!shopifyResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to list products",
                  details: shopifyResult,
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
                products: shopifyResult.products,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 6:
          if (!(action === "get-product")) return [3 /*break*/, 9];
          // Validate request
          if (!productId) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing product ID" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            fetch(
              "https://"
                .concat(SHOPIFY_SHOP_DOMAIN, "/admin/api/2023-04/products/")
                .concat(productId, ".json"),
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
              },
            ),
          ];
        case 7:
          shopifyResponse = _e.sent();
          return [4 /*yield*/, shopifyResponse.json()];
        case 8:
          shopifyResult = _e.sent();
          if (!shopifyResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get product",
                  details: shopifyResult,
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
                product: shopifyResult.product,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 9:
          if (!(action === "create-product")) return [3 /*break*/, 12];
          // Validate request
          if (!productData) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing product data" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            fetch(
              "https://".concat(
                SHOPIFY_SHOP_DOMAIN,
                "/admin/api/2023-04/products.json",
              ),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
                body: JSON.stringify({ product: productData }),
              },
            ),
          ];
        case 10:
          shopifyResponse = _e.sent();
          return [4 /*yield*/, shopifyResponse.json()];
        case 11:
          shopifyResult = _e.sent();
          if (!shopifyResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to create product",
                  details: shopifyResult,
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
                product: shopifyResult.product,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 12:
          if (!(action === "get-store-data")) return [3 /*break*/, 17];
          // Validate request
          if (!storeId) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing store ID" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            fetch(
              "https://".concat(
                SHOPIFY_SHOP_DOMAIN,
                "/admin/api/2023-04/shop.json",
              ),
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
              },
            ),
          ];
        case 13:
          shopifyResponse = _e.sent();
          return [4 /*yield*/, shopifyResponse.json()];
        case 14:
          shopifyResult = _e.sent();
          if (!shopifyResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get store data",
                  details: shopifyResult,
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
            4 /*yield*/,
            fetch(
              "https://".concat(
                SHOPIFY_SHOP_DOMAIN,
                "/admin/api/2023-04/reports/sales.json",
              ),
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
              },
            ),
          ];
        case 15:
          analyticsResponse = _e.sent();
          return [4 /*yield*/, analyticsResponse.json()];
        case 16:
          analyticsResult = _e.sent();
          storeData = __assign(__assign({}, shopifyResult.shop), {
            orders_count:
              ((_c =
                analyticsResult === null || analyticsResult === void 0
                  ? void 0
                  : analyticsResult.report) === null || _c === void 0
                ? void 0
                : _c.orders_count) || 0,
            conversion_rate: calculateConversionRate(
              shopifyResult.shop,
              analyticsResult,
            ),
            average_order_value: calculateAOV(analyticsResult),
          });
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                store: storeData,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 17:
          if (!(action === "optimize-product-seo")) return [3 /*break*/, 22];
          // Validate request
          if (!productId) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing product ID" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            fetch(
              "https://"
                .concat(SHOPIFY_SHOP_DOMAIN, "/admin/api/2023-04/products/")
                .concat(productId, ".json"),
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
              },
            ),
          ];
        case 18:
          productResponse = _e.sent();
          return [4 /*yield*/, productResponse.json()];
        case 19:
          productResult = _e.sent();
          if (!productResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get product for SEO optimization",
                  details: productResult,
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
          product = productResult.product;
          seoUpdates = {
            product: {
              id: product.id,
              metafields_global_title_tag:
                product.title +
                " | " +
                ((_d =
                  shopifyResult === null || shopifyResult === void 0
                    ? void 0
                    : shopifyResult.shop) === null || _d === void 0
                  ? void 0
                  : _d.name),
              metafields_global_description_tag:
                generateSeoDescription(product),
              tags: enhanceProductTags(product.tags || ""),
            },
          };
          return [
            4 /*yield*/,
            fetch(
              "https://"
                .concat(SHOPIFY_SHOP_DOMAIN, "/admin/api/2023-04/products/")
                .concat(productId, ".json"),
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
                body: JSON.stringify(seoUpdates),
              },
            ),
          ];
        case 20:
          updateResponse = _e.sent();
          return [4 /*yield*/, updateResponse.json()];
        case 21:
          updateResult = _e.sent();
          if (!updateResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to optimize product SEO",
                  details: updateResult,
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
                product: updateResult.product,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 22:
          if (!(action === "optimize-images")) return [3 /*break*/, 23];
          // Validate request
          if (!productId) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing product ID" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          // This would typically connect to an image optimization service
          // For this example, we'll just return a success message
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                message:
                  "Image optimization initiated for product " + productId,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 23:
          if (!(action === "create-checkout")) return [3 /*break*/, 26];
          // Validate request
          if (!variantId || !quantity) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Missing required fields" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          checkoutData = {
            checkout: {
              line_items: [
                {
                  variant_id: variantId,
                  quantity: quantity,
                },
              ],
              email: user.email,
            },
          };
          // Add shipping address if provided
          if (shippingAddress) {
            checkoutData.checkout.shipping_address = shippingAddress;
          }
          return [
            4 /*yield*/,
            fetch(
              "https://".concat(
                SHOPIFY_SHOP_DOMAIN,
                "/admin/api/2023-04/checkouts.json",
              ),
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
                body: JSON.stringify(checkoutData),
              },
            ),
          ];
        case 24:
          shopifyResponse = _e.sent();
          return [4 /*yield*/, shopifyResponse.json()];
        case 25:
          shopifyResult = _e.sent();
          if (!shopifyResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to create checkout",
                  details: shopifyResult,
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
                checkout: shopifyResult.checkout,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 26:
          if (!(action === "get-checkout")) return [3 /*break*/, 29];
          // Validate request
          if (!checkoutId) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing checkout ID" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            fetch(
              "https://"
                .concat(SHOPIFY_SHOP_DOMAIN, "/admin/api/2023-04/checkouts/")
                .concat(checkoutId, ".json"),
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic ".concat(shopifyAuthString),
                },
              },
            ),
          ];
        case 27:
          shopifyResponse = _e.sent();
          return [4 /*yield*/, shopifyResponse.json()];
        case 28:
          shopifyResult = _e.sent();
          if (!shopifyResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get checkout",
                  details: shopifyResult,
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
                checkout: shopifyResult.checkout,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 29:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Invalid action" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 30:
          return [3 /*break*/, 32];
        case 31:
          err_1 = _e.sent();
          console.error("Shopify API error: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: err_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 32:
          return [2 /*return*/];
      }
    });
  });
});
/**
 * Helper function to calculate conversion rate
 */
function calculateConversionRate(shop, analytics) {
  if (!shop || !analytics || !analytics.report) {
    return 0;
  }
  var visitCount = analytics.report.visits || 0;
  var orderCount = analytics.report.orders_count || 0;
  if (visitCount === 0) {
    return 0;
  }
  return orderCount / visitCount;
}
/**
 * Helper function to calculate average order value
 */
function calculateAOV(analytics) {
  if (!analytics || !analytics.report) {
    return 0;
  }
  var totalSales = analytics.report.sales || 0;
  var orderCount = analytics.report.orders_count || 0;
  if (orderCount === 0) {
    return 0;
  }
  return totalSales / orderCount;
}
/**
 * Generate an SEO-friendly description
 */
function generateSeoDescription(product) {
  if (!product) {
    return "";
  }
  // Start with existing description or create one from title
  var description = product.body_html
    ? stripHtmlTags(product.body_html)
    : "Buy ".concat(product.title, " from our store.");
  // Limit to 160 characters for SEO best practices
  if (description.length > 160) {
    description = description.substring(0, 157) + "...";
  }
  return description;
}
/**
 * Strip HTML tags from a string
 */
function stripHtmlTags(html) {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}
/**
 * Enhance product tags for better searchability
 */
function enhanceProductTags(existingTags) {
  // This is a simple example - in a real app this might use AI or more complex logic
  var existingTagArray = existingTags.split(", ");
  // Add some common converting tags if they don't exist
  var enhancementTags = ["sale", "best-seller", "featured"];
  enhancementTags.forEach(function (tag) {
    if (!existingTagArray.includes(tag)) {
      existingTagArray.push(tag);
    }
  });
  return existingTagArray.join(", ");
}
