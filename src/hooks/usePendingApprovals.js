var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function usePendingApprovals() {
    const [isLoading, setIsLoading] = useState(true);
    const [pendingApprovals, setPendingApprovals] = useState(0);
    useEffect(() => {
        const fetchPendingApprovals = () => __awaiter(this, void 0, void 0, function* () {
            try {
                setIsLoading(true);
                // Use a simpler approach to query pending approvals
                const { count, error } = yield supabase
                    .from("user_actions")
                    .select("*", { count: "exact", head: true })
                    .eq("category", "approval")
                    .eq("metadata->>status", "pending");
                if (error)
                    throw error;
                setPendingApprovals(count || 0);
            }
            catch (error) {
                console.error("Error fetching pending approvals:", error);
                toast.error("Failed to load pending approvals");
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchPendingApprovals();
    }, []);
    return {
        isLoading,
        pendingApprovals,
    };
}
