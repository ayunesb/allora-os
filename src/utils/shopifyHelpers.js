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
exports.listShopifyProducts = listShopifyProducts;
exports.getShopifyProduct = getShopifyProduct;
exports.createShopifyProduct = createShopifyProduct;
exports.createShopifyCheckout = createShopifyCheckout;
exports.getShopifyCheckout = getShopifyCheckout;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
function listShopifyProducts() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: { action: "list-products" },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            return [2 /*return*/, data.products || []];
          } else {
            throw new Error(data.error || "Failed to list products");
          }
          return [3 /*break*/, 3];
        case 2:
          error_1 = _b.sent();
          sonner_1.toast.error("Product list error: ".concat(error_1.message));
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function getShopifyProduct(productId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: { action: "get-product", productId: productId },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            return [2 /*return*/, data.product || null];
          } else {
            throw new Error(data.error || "Failed to get product");
          }
          return [3 /*break*/, 3];
        case 2:
          error_2 = _b.sent();
          sonner_1.toast.error("Product fetch error: ".concat(error_2.message));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function createShopifyProduct(productData) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: { action: "create-product", productData: productData },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            sonner_1.toast.success("Product created successfully");
            return [2 /*return*/, data.product || null];
          } else {
            throw new Error(data.error || "Failed to create product");
          }
          return [3 /*break*/, 3];
        case 2:
          error_3 = _b.sent();
          sonner_1.toast.error(
            "Product creation error: ".concat(error_3.message),
          );
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function createShopifyCheckout(variantId, quantity, shippingAddress) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
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
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            return [2 /*return*/, data.checkout || null];
          } else {
            throw new Error(data.error || "Failed to create checkout");
          }
          return [3 /*break*/, 3];
        case 2:
          error_4 = _b.sent();
          sonner_1.toast.error(
            "Checkout creation error: ".concat(error_4.message),
          );
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function getShopifyCheckout(checkoutId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_5;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase.functions.invoke("shopify", {
              body: { action: "get-checkout", checkoutId: checkoutId },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            return [2 /*return*/, data.checkout || null];
          } else {
            throw new Error(data.error || "Failed to get checkout");
          }
          return [3 /*break*/, 3];
        case 2:
          error_5 = _b.sent();
          sonner_1.toast.error(
            "Checkout fetch error: ".concat(error_5.message),
          );
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
