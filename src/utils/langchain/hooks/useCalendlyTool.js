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
export function useCalendlyTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Check availability on Calendly
     */
    const checkAvailability = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            logger.info("Checking Calendly availability");
            const { data, error } = yield supabase.functions.invoke("calendly-tool", {
                body: { action: "check_availability" },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to check Calendly availability";
            logger.error("Error checking Calendly availability", err);
            setError(message);
            toast.error("Failed to check availability", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    /**
     * Get a list of meeting types from Calendly
     */
    const getMeetingTypes = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            logger.info("Getting Calendly meeting types");
            const { data, error } = yield supabase.functions.invoke("calendly-tool", {
                body: { action: "get_meeting_types" },
            });
            if (error) {
                throw new Error(error.message);
            }
            return data.result;
        }
        catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Failed to get Calendly meeting types";
            logger.error("Error getting Calendly meeting types", err);
            setError(message);
            toast.error("Failed to get meeting types", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        checkAvailability,
        getMeetingTypes,
        isLoading,
        error,
    };
}
