import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
export async function listShopifyProducts() {
    try {
        const { data, error } = await supabase.functions.invoke('shopify', {
            body: { action: 'list-products' }
        });
        if (error)
            throw error;
        if (data.success) {
            return data.products || [];
        }
        else {
            throw new Error(data.error || 'Failed to list products');
        }
    }
    catch (error) {
        toast.error(`Product list error: ${error.message}`);
        return [];
    }
}
export async function getShopifyProduct(productId) {
    try {
        const { data, error } = await supabase.functions.invoke('shopify', {
            body: { action: 'get-product', productId }
        });
        if (error)
            throw error;
        if (data.success) {
            return data.product || null;
        }
        else {
            throw new Error(data.error || 'Failed to get product');
        }
    }
    catch (error) {
        toast.error(`Product fetch error: ${error.message}`);
        return null;
    }
}
export async function createShopifyProduct(productData) {
    try {
        const { data, error } = await supabase.functions.invoke('shopify', {
            body: { action: 'create-product', productData }
        });
        if (error)
            throw error;
        if (data.success) {
            toast.success('Product created successfully');
            return data.product || null;
        }
        else {
            throw new Error(data.error || 'Failed to create product');
        }
    }
    catch (error) {
        toast.error(`Product creation error: ${error.message}`);
        return null;
    }
}
export async function createShopifyCheckout(variantId, quantity, shippingAddress) {
    try {
        const { data, error } = await supabase.functions.invoke('shopify', {
            body: {
                action: 'create-checkout',
                variantId,
                quantity,
                shippingAddress
            }
        });
        if (error)
            throw error;
        if (data.success) {
            return data.checkout || null;
        }
        else {
            throw new Error(data.error || 'Failed to create checkout');
        }
    }
    catch (error) {
        toast.error(`Checkout creation error: ${error.message}`);
        return null;
    }
}
export async function getShopifyCheckout(checkoutId) {
    try {
        const { data, error } = await supabase.functions.invoke('shopify', {
            body: { action: 'get-checkout', checkoutId }
        });
        if (error)
            throw error;
        if (data.success) {
            return data.checkout || null;
        }
        else {
            throw new Error(data.error || 'Failed to get checkout');
        }
    }
    catch (error) {
        toast.error(`Checkout fetch error: ${error.message}`);
        return null;
    }
}
