var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function createCheckoutSession(priceId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("stripe", {
                body: { action: "create-checkout-session", priceId },
            });
            if (error)
                throw error;
            if (data.url) {
                window.location.href = data.url;
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
    });
}
export function createCustomerPortal() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("stripe", {
                body: { action: "create-customer-portal" },
            });
            if (error)
                throw error;
            if (data.url) {
                window.location.href = data.url;
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
    });
}
export function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("stripe", {
                body: { action: "get-products" },
            });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            toast.error(`Failed to fetch products: ${error.message}`);
            return [];
        }
    });
}
