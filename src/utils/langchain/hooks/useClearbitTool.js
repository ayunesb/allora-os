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
export function useClearbitTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Look up company information by domain
     */
    const lookupCompany = (domain) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const sanitizedDomain = sanitizeInput(domain);
            logger.info("Looking up company information", {
                domain: sanitizedDomain,
            });
            const { data, error } = yield supabase.functions.invoke("clearbit-lookup", {
                body: { type: "company", query: sanitizedDomain },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to look up company information";
            logger.error("Error looking up company information", err);
            setError(message);
            toast.error("Failed to fetch company data", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    /**
     * Look up person information by email
     */
    const lookupPerson = (email) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const sanitizedEmail = sanitizeInput(email);
            logger.info("Looking up person information", { email: sanitizedEmail });
            const { data, error } = yield supabase.functions.invoke("clearbit-lookup", {
                body: { type: "person", query: sanitizedEmail },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to look up person information";
            logger.error("Error looking up person information", err);
            setError(message);
            toast.error("Failed to fetch person data", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        lookupCompany,
        lookupPerson,
        isLoading,
        error,
    };
}
