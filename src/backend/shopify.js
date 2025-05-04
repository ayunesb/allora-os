import { supabase } from './supabase';
/**
 * Lists products from Shopify store
 * @returns A promise with the list of products
 */
export const listProducts = async () => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to list products');
        }
        // Call the Shopify edge function
        const { data, error } = await supabase.functions.invoke("shopify", {
            body: {
                action: "list-products"
            }
        });
        if (error) {
            console.error('Error listing products:', error);
            throw error;
        }
        return data.products || [];
    }
    catch (error) {
        console.error('Failed to list products:', error);
        return [];
    }
};
/**
 * Gets a specific product from Shopify
 * @param productId The Shopify product ID
 * @returns A promise with the product details
 */
export const getProduct = async (productId) => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to get product');
        }
        // Call the Shopify edge function
        const { data, error } = await supabase.functions.invoke("shopify", {
            body: {
                action: "get-product",
                productId
            }
        });
        if (error) {
            console.error('Error getting product:', error);
            throw error;
        }
        return data.product;
    }
    catch (error) {
        console.error(`Failed to get product ${productId}:`, error);
        return null;
    }
};
/**
 * Creates a product in Shopify
 * @param productData The product data to create
 * @returns A promise with the created product
 */
export const createProduct = async (productData) => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to create product');
        }
        // Call the Shopify edge function
        const { data, error } = await supabase.functions.invoke("shopify", {
            body: {
                action: "create-product",
                productData
            }
        });
        if (error) {
            console.error('Error creating product:', error);
            throw error;
        }
        return data.product;
    }
    catch (error) {
        console.error('Failed to create product:', error);
        return null;
    }
};
/**
 * Creates a checkout for a product
 * @param variantId The Shopify variant ID
 * @param quantity The quantity to purchase
 * @param shippingAddress Optional shipping address information
 * @returns A promise with the checkout details
 */
export const createCheckout = async (variantId, quantity, shippingAddress) => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to create checkout');
        }
        // Call the Shopify edge function
        const { data, error } = await supabase.functions.invoke("shopify", {
            body: {
                action: "create-checkout",
                variantId,
                quantity,
                shippingAddress
            }
        });
        if (error) {
            console.error('Error creating checkout:', error);
            throw error;
        }
        return data.checkout;
    }
    catch (error) {
        console.error('Failed to create checkout:', error);
        return null;
    }
};
/**
 * Gets the details of a checkout
 * @param checkoutId The Shopify checkout ID
 * @returns A promise with the checkout details
 */
export const getCheckout = async (checkoutId) => {
    try {
        // Get the current auth session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            throw new Error('Authentication required to get checkout');
        }
        // Call the Shopify edge function
        const { data, error } = await supabase.functions.invoke("shopify", {
            body: {
                action: "get-checkout",
                checkoutId
            }
        });
        if (error) {
            console.error('Error getting checkout:', error);
            throw error;
        }
        return data.checkout;
    }
    catch (error) {
        console.error(`Failed to get checkout ${checkoutId}:`, error);
        return null;
    }
};
