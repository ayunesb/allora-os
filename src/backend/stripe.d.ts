import {
  SubscriptionDetails,
  CreateCheckoutSessionResponse,
  CreateCustomerPortalResponse,
} from "@/types/stripe";
export declare const getSubscriptionDetails: () => Promise<SubscriptionDetails>;
export declare const createCheckoutSession: (
  priceId: string,
  successUrl?: string,
  cancelUrl?: string,
) => Promise<CreateCheckoutSessionResponse>;
export declare const createCustomerPortalSession: (
  returnUrl?: string,
) => Promise<CreateCustomerPortalResponse>;
export declare const cancelSubscription: (subscriptionId: string) => Promise<{
  success: boolean;
  error?: string;
}>;
export declare const reactivateSubscription: (
  subscriptionId: string,
) => Promise<{
  success: boolean;
  error?: string;
}>;
export declare const changeSubscriptionPlan: (
  subscriptionId: string,
  newPriceId: string,
) => Promise<{
  success: boolean;
  error?: string;
}>;
export declare const getProducts: () => Promise<any>;
export declare const createCustomer: (
  email: string,
  name?: string,
) => Promise<{
  customerId?: string;
  error?: string;
}>;
