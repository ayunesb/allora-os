/**
 * Lists products from Shopify store
 * @returns A promise with the list of products
 */
export declare const listProducts: () => Promise<any>;
/**
 * Gets a specific product from Shopify
 * @param productId The Shopify product ID
 * @returns A promise with the product details
 */
export declare const getProduct: (productId: string) => Promise<any>;
/**
 * Creates a product in Shopify
 * @param productData The product data to create
 * @returns A promise with the created product
 */
export declare const createProduct: (productData: any) => Promise<any>;
/**
 * Creates a checkout for a product
 * @param variantId The Shopify variant ID
 * @param quantity The quantity to purchase
 * @param shippingAddress Optional shipping address information
 * @returns A promise with the checkout details
 */
export declare const createCheckout: (variantId: string, quantity: number, shippingAddress?: any) => Promise<any>;
/**
 * Gets the details of a checkout
 * @param checkoutId The Shopify checkout ID
 * @returns A promise with the checkout details
 */
export declare const getCheckout: (checkoutId: string) => Promise<any>;
