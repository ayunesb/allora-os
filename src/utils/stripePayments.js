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
export function createCreditPurchaseCheckout(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call to Supabase edge function or directly to Stripe API
            // This is a placeholder implementation - in a real app, you would call
            // your Stripe backend function to create a checkout session
            const { data, error } = yield supabase.functions.invoke("stripe", {
                body: {
                    action: "createCheckoutSession",
                    userId: params.userId,
                    credits: params.credits,
                    amount: params.priceUsd * 100, // Convert to cents
                    mode: "payment",
                    successUrl: `${window.location.origin}/billing/success`,
                    cancelUrl: `${window.location.origin}/checkout`,
                },
            });
            if (error)
                throw error;
            return data;
        }
        catch (error) {
            console.error("Failed to create checkout session:", error);
            toast.error("Payment initialization failed");
            throw error;
        }
    });
}
export function getCurrentCreditBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { data: user } = yield supabase.auth.getUser();
            if (!user) {
                return 0;
            }
            const userId = (_b = (_a = user.user) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "unknown";
            const { data, error } = yield supabase
                .from("billing_profiles")
                .select("credits")
                .eq("user_id", userId)
                .single();
            if (error)
                throw error;
            return (data === null || data === void 0 ? void 0 : data.credits) || 0;
        }
        catch (error) {
            console.error("Failed to fetch credit balance:", error);
            return 0;
        }
    });
}
