var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "./supabase";
/**
 * Lists products from Shopify store
 * @returns A promise with the list of products
 */
export const listProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to list products");
        }
        // Call the Shopify edge function
        const { data, error } = yield supabase.functions.invoke("shopify", {
            body: {
                action: "list-products",
            },
        });
        if (error) {
            console.error("Error listing products:", error);
            throw error;
        }
        return data.products || [];
    }
    catch (error) {
        console.error("Failed to list products:", error);
        return [];
    }
});
/**
 * Gets a specific product from Shopify
 * @param productId The Shopify product ID
 * @returns A promise with the product details
 */
export const getProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to get product");
        }
        // Call the Shopify edge function
        const { data, error } = yield supabase.functions.invoke("shopify", {
            body: {
                action: "get-product",
                productId,
            },
        });
        if (error) {
            console.error("Error getting product:", error);
            throw error;
        }
        return data.product;
    }
    catch (error) {
        console.error(`Failed to get product ${productId}:`, error);
        return null;
    }
});
/**
 * Creates a product in Shopify
 * @param productData The product data to create
 * @returns A promise with the created product
 */
export const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to create product");
        }
        // Call the Shopify edge function
        const { data, error } = yield supabase.functions.invoke("shopify", {
            body: {
                action: "create-product",
                productData,
            },
        });
        if (error) {
            console.error("Error creating product:", error);
            throw error;
        }
        return data.product;
    }
    catch (error) {
        console.error("Failed to create product:", error);
        return null;
    }
});
/**
 * Creates a checkout for a product
 * @param variantId The Shopify variant ID
 * @param quantity The quantity to purchase
 * @param shippingAddress Optional shipping address information
 * @returns A promise with the checkout details
 */
export const createCheckout = (variantId, quantity, shippingAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to create checkout");
        }
        // Call the Shopify edge function
        const { data, error } = yield supabase.functions.invoke("shopify", {
            body: {
                action: "create-checkout",
                variantId,
                quantity,
                shippingAddress,
            },
        });
        if (error) {
            console.error("Error creating checkout:", error);
            throw error;
        }
        return data.checkout;
    }
    catch (error) {
        console.error("Failed to create checkout:", error);
        return null;
    }
});
/**
 * Gets the details of a checkout
 * @param checkoutId The Shopify checkout ID
 * @returns A promise with the checkout details
 */
export const getCheckout = (checkoutId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the current auth session
        const { data: { session }, } = yield supabase.auth.getSession();
        if (!session) {
            throw new Error("Authentication required to get checkout");
        }
        // Call the Shopify edge function
        const { data, error } = yield supabase.functions.invoke("shopify", {
            body: {
                action: "get-checkout",
                checkoutId,
            },
        });
        if (error) {
            console.error("Error getting checkout:", error);
            throw error;
        }
        return data.checkout;
    }
    catch (error) {
        console.error(`Failed to get checkout ${checkoutId}:`, error);
        return null;
    }
});
