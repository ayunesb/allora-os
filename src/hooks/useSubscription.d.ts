import { SubscriptionDetails } from "@/types/stripe";
/**
 * Custom hook for managing subscriptions
 * @returns Functions and state for subscription management
 */
export declare function useSubscription(): {
  subscription: SubscriptionDetails;
  isLoading: boolean;
  isSubscribing: boolean;
  isUpdating: boolean;
  subscribeToPlan: (
    priceId: string,
    successUrl?: string,
    cancelUrl?: string,
  ) => Promise<boolean>;
  openCustomerPortal: () => Promise<boolean>;
  cancelCurrentSubscription: () => Promise<boolean>;
  reactivateCurrentSubscription: () => Promise<boolean>;
  changePlan: (newPriceId: string) => Promise<boolean>;
  refresh: () => Promise<void>;
};
