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
import { toast } from "sonner";
export function useAIExecutiveDebate() {
    const [isLoading, setIsLoading] = useState(false);
    const [debate, setDebate] = useState(null);
    const [error, setError] = useState(null);
    const generateDebate = (topic, companyContext, selectedExecutives) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            // Make sure we have at least 2 executives
            if (selectedExecutives.length < 2) {
                throw new Error("Please select at least 2 executives for the debate");
            }
            // Call our Supabase Edge Function
            const { data, error } = yield supabase.functions.invoke("ai-executive-debate", {
                body: {
                    topic,
                    companyContext,
                    executives: selectedExecutives,
                },
            });
            if (error) {
                throw new Error(`Function error: ${error.message}`);
            }
            if (data.error) {
                throw new Error(data.error);
            }
            setDebate(data.debate);
            toast.success("AI executive debate generated successfully");
            return data.debate;
        }
        catch (err) {
            console.error("Error generating AI executive debate:", err);
            const errorMessage = err.message || "Failed to generate debate";
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        generateDebate,
        isLoading,
        debate,
        error,
    };
}
