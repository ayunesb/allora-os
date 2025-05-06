export declare function listShopifyProducts(): Promise<any>;
export declare function getShopifyProduct(productId: string): Promise<any>;
export declare function createShopifyProduct(productData: any): Promise<any>;
export declare function createShopifyCheckout(
  variantId: string,
  quantity: number,
  shippingAddress?: any,
): Promise<any>;
export declare function getShopifyCheckout(checkoutId: string): Promise<any>;
