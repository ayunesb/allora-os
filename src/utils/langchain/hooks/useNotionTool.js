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
export function useNotionTool() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Save content to Notion via Edge Function
     */
    const saveToNotion = (title, content) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            logger.info("Saving to Notion", { title });
            const { data, error } = yield supabase.functions.invoke("notion-tool", {
                body: { title, content },
            });
            if (error) {
                throw new Error(error.message);
            }
            toast.success("Saved to Notion successfully");
            return data;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Failed to save to Notion";
            logger.error("Error saving to Notion", err);
            setError(message);
            toast.error("Failed to save to Notion", { description: message });
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        saveToNotion,
        isLoading,
        error,
    };
}
