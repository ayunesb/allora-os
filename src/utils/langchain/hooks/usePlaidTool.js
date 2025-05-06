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
import { sanitizeInput } from "@/utils/sanitizers";
export function usePlaidTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Get account balances from Plaid
     */
    const getAccountBalances = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            logger.info("Fetching Plaid account balances");
            const { data, error } = yield supabase.functions.invoke("plaid-tool", {
                body: { action: "get_balances" },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to fetch Plaid account balances";
            logger.error("Error fetching Plaid account balances", err);
            setError(message);
            toast.error("Failed to fetch balances", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    /**
     * Get recent transactions from Plaid
     */
    const getRecentTransactions = (...args_1) => __awaiter(this, [...args_1], void 0, function* (days = 7) {
        setIsLoading(true);
        setError(null);
        try {
            logger.info("Fetching Plaid recent transactions", { days });
            const { data, error } = yield supabase.functions.invoke("plaid-tool", {
                body: {
                    action: "get_transactions",
                    days: sanitizeInput(days.toString()),
                },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to fetch Plaid transactions";
            logger.error("Error fetching Plaid transactions", err);
            setError(message);
            toast.error("Failed to fetch transactions", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        getAccountBalances,
        getRecentTransactions,
        isLoading,
        error,
    };
}
