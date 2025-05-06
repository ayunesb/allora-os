var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getSubscriptionDetails, createCheckoutSession, createCustomerPortalSession, cancelSubscription, reactivateSubscription, changeSubscriptionPlan, } from "@/backend/stripe";
/**
 * Custom hook for managing subscriptions
 * @returns Functions and state for subscription management
 */
export function useSubscription() {
    const [isLoading, setIsLoading] = useState(true);
    const [subscription, setSubscription] = useState(null);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    // Fetch subscription details
    const fetchSubscriptionDetails = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            const details = yield getSubscriptionDetails();
            setSubscription(details);
        }
        catch (error) {
            console.error("Error fetching subscription details:", error);
            toast.error("Failed to load subscription information");
        }
        finally {
            setIsLoading(false);
        }
    }), []);
    // Load subscription data on mount
    useEffect(() => {
        fetchSubscriptionDetails();
    }, [fetchSubscriptionDetails]);
    // Subscribe to a plan
    const subscribeToPlan = (priceId, successUrl, cancelUrl) => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsSubscribing(true);
            const { url, error } = yield createCheckoutSession(priceId, successUrl, cancelUrl);
            if (error) {
                throw new Error(error);
            }
            if (url) {
                window.location.href = url;
                return true;
            }
            else {
                throw new Error("No checkout URL returned");
            }
        }
        catch (error) {
            toast.error(`Failed to create checkout session: ${error.message}`);
            return false;
        }
        finally {
            setIsSubscribing(false);
        }
    });
    // Open the customer portal
    const openCustomerPortal = () => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsUpdating(true);
            const { url, error } = yield createCustomerPortalSession();
            if (error) {
                throw new Error(error);
            }
            if (url) {
                window.location.href = url;
                return true;
            }
            else {
                throw new Error("No portal URL returned");
            }
        }
        catch (error) {
            toast.error(`Failed to access billing portal: ${error.message}`);
            return false;
        }
        finally {
            setIsUpdating(false);
        }
    });
    // Cancel a subscription
    const cancelCurrentSubscription = () => __awaiter(this, void 0, void 0, function* () {
        if (!(subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionId)) {
            toast.error("No active subscription to cancel");
            return false;
        }
        try {
            setIsUpdating(true);
            const { success, error } = yield cancelSubscription(subscription.subscriptionId);
            if (!success) {
                throw new Error(error || "Failed to cancel subscription");
            }
            toast.success("Your subscription will be canceled at the end of the billing period");
            yield fetchSubscriptionDetails();
            return true;
        }
        catch (error) {
            toast.error(`Failed to cancel subscription: ${error.message}`);
            return false;
        }
        finally {
            setIsUpdating(false);
        }
    });
    // Reactivate a subscription
    const reactivateCurrentSubscription = () => __awaiter(this, void 0, void 0, function* () {
        if (!(subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionId)) {
            toast.error("No subscription to reactivate");
            return false;
        }
        try {
            setIsUpdating(true);
            const { success, error } = yield reactivateSubscription(subscription.subscriptionId);
            if (!success) {
                throw new Error(error || "Failed to reactivate subscription");
            }
            toast.success("Your subscription has been reactivated");
            yield fetchSubscriptionDetails();
            return true;
        }
        catch (error) {
            toast.error(`Failed to reactivate subscription: ${error.message}`);
            return false;
        }
        finally {
            setIsUpdating(false);
        }
    });
    // Change subscription plan
    const changePlan = (newPriceId) => __awaiter(this, void 0, void 0, function* () {
        if (!(subscription === null || subscription === void 0 ? void 0 : subscription.subscriptionId)) {
            toast.error("No active subscription to change");
            return false;
        }
        try {
            setIsUpdating(true);
            const { success, error } = yield changeSubscriptionPlan(subscription.subscriptionId, newPriceId);
            if (!success) {
                throw new Error(error || "Failed to change subscription plan");
            }
            toast.success("Your subscription plan has been updated");
            yield fetchSubscriptionDetails();
            return true;
        }
        catch (error) {
            toast.error(`Failed to change subscription plan: ${error.message}`);
            return false;
        }
        finally {
            setIsUpdating(false);
        }
    });
    return {
        subscription,
        isLoading,
        isSubscribing,
        isUpdating,
        subscribeToPlan,
        openCustomerPortal,
        cancelCurrentSubscription,
        reactivateCurrentSubscription,
        changePlan,
        refresh: fetchSubscriptionDetails,
    };
}
