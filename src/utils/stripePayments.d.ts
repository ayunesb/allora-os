interface CheckoutParams {
  userId: string;
  credits: number;
  priceUsd: number;
}
export declare function createCreditPurchaseCheckout(
  params: CheckoutParams,
): Promise<any>;
export declare function getCurrentCreditBalance(): Promise<any>;
export {};
