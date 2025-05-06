"use strict";
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
exports.getCheckout =
  exports.createCheckout =
  exports.createProduct =
  exports.getProduct =
  exports.listProducts =
    void 0;
var supabase_1 = require("./supabase");
/**
 * Lists products from Shopify store
 * @returns A promise with the list of products
 */
var listProducts = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
        case 1:
          session = _b.sent().data.session;
          if (!session) {
            throw new Error("Authentication required to list products");
          }
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: {
                action: "list-products",
              },
            }),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error listing products:", error);
            throw error;
          }
          return [2 /*return*/, data.products || []];
        case 3:
          error_1 = _b.sent();
          console.error("Failed to list products:", error_1);
          return [2 /*return*/, []];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.listProducts = listProducts;
/**
 * Gets a specific product from Shopify
 * @param productId The Shopify product ID
 * @returns A promise with the product details
 */
var getProduct = function (productId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
        case 1:
          session = _b.sent().data.session;
          if (!session) {
            throw new Error("Authentication required to get product");
          }
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: {
                action: "get-product",
                productId: productId,
              },
            }),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error getting product:", error);
            throw error;
          }
          return [2 /*return*/, data.product];
        case 3:
          error_2 = _b.sent();
          console.error(
            "Failed to get product ".concat(productId, ":"),
            error_2,
          );
          return [2 /*return*/, null];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.getProduct = getProduct;
/**
 * Creates a product in Shopify
 * @param productData The product data to create
 * @returns A promise with the created product
 */
var createProduct = function (productData) {
  return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
        case 1:
          session = _b.sent().data.session;
          if (!session) {
            throw new Error("Authentication required to create product");
          }
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: {
                action: "create-product",
                productData: productData,
              },
            }),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error creating product:", error);
            throw error;
          }
          return [2 /*return*/, data.product];
        case 3:
          error_3 = _b.sent();
          console.error("Failed to create product:", error_3);
          return [2 /*return*/, null];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.createProduct = createProduct;
/**
 * Creates a checkout for a product
 * @param variantId The Shopify variant ID
 * @param quantity The quantity to purchase
 * @param shippingAddress Optional shipping address information
 * @returns A promise with the checkout details
 */
var createCheckout = function (variantId, quantity, shippingAddress) {
  return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
        case 1:
          session = _b.sent().data.session;
          if (!session) {
            throw new Error("Authentication required to create checkout");
          }
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: {
                action: "create-checkout",
                variantId: variantId,
                quantity: quantity,
                shippingAddress: shippingAddress,
              },
            }),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error creating checkout:", error);
            throw error;
          }
          return [2 /*return*/, data.checkout];
        case 3:
          error_4 = _b.sent();
          console.error("Failed to create checkout:", error_4);
          return [2 /*return*/, null];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.createCheckout = createCheckout;
/**
 * Gets the details of a checkout
 * @param checkoutId The Shopify checkout ID
 * @returns A promise with the checkout details
 */
var getCheckout = function (checkoutId) {
  return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, data, error, error_5;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          return [4 /*yield*/, supabase_1.supabase.auth.getSession()];
        case 1:
          session = _b.sent().data.session;
          if (!session) {
            throw new Error("Authentication required to get checkout");
          }
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: {
                action: "get-checkout",
                checkoutId: checkoutId,
              },
            }),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error getting checkout:", error);
            throw error;
          }
          return [2 /*return*/, data.checkout];
        case 3:
          error_5 = _b.sent();
          console.error(
            "Failed to get checkout ".concat(checkoutId, ":"),
            error_5,
          );
          return [2 /*return*/, null];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.getCheckout = getCheckout;
