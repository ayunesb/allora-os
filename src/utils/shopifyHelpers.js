var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
export function listShopifyProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("shopify", {
                body: { action: "list-products" },
            });
            if (error)
                throw error;
            if (data.success) {
                return data.products || [];
            }
            else {
                throw new Error(data.error || "Failed to list products");
            }
        }
        catch (error) {
            toast.error(`Product list error: ${error.message}`);
            return [];
        }
    });
}
export function getShopifyProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("shopify", {
                body: { action: "get-product", productId },
            });
            if (error)
                throw error;
            if (data.success) {
                return data.product || null;
            }
            else {
                throw new Error(data.error || "Failed to get product");
            }
        }
        catch (error) {
            toast.error(`Product fetch error: ${error.message}`);
            return null;
        }
    });
}
export function createShopifyProduct(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("shopify", {
                body: { action: "create-product", productData },
            });
            if (error)
                throw error;
            if (data.success) {
                toast.success("Product created successfully");
                return data.product || null;
            }
            else {
                throw new Error(data.error || "Failed to create product");
            }
        }
        catch (error) {
            toast.error(`Product creation error: ${error.message}`);
            return null;
        }
    });
}
export function createShopifyCheckout(variantId, quantity, shippingAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("shopify", {
                body: {
                    action: "create-checkout",
                    variantId,
                    quantity,
                    shippingAddress,
                },
            });
            if (error)
                throw error;
            if (data.success) {
                return data.checkout || null;
            }
            else {
                throw new Error(data.error || "Failed to create checkout");
            }
        }
        catch (error) {
            toast.error(`Checkout creation error: ${error.message}`);
            return null;
        }
    });
}
export function getShopifyCheckout(checkoutId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("shopify", {
                body: { action: "get-checkout", checkoutId },
            });
            if (error)
                throw error;
            if (data.success) {
                return data.checkout || null;
            }
            else {
                throw new Error(data.error || "Failed to get checkout");
            }
        }
        catch (error) {
            toast.error(`Checkout fetch error: ${error.message}`);
            return null;
        }
    });
}
