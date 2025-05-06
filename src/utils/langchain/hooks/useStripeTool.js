var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
import { toast } from "sonner";
export function useStripeTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Get Stripe analytics via Edge Function
     */
    const getStripeAnalytics = (query) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            logger.info("Querying Stripe analytics", { query });
            const { data, error } = yield supabase.functions.invoke("stripe-analytics", {
                body: { query },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Failed to get Stripe analytics";
            logger.error("Error querying Stripe analytics", err);
            setError(message);
            toast.error("Failed to fetch Stripe data", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        getStripeAnalytics,
        isLoading,
        error,
    };
}
