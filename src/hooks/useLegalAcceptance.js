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
import { supabase } from "@/integrations/supabase/client";
export function useLegalAcceptance(user) {
    const [hasAcceptedLegal, setHasAcceptedLegal] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [showLegalModal, setShowLegalModal] = useState(false);
    const [acceptanceError, setAcceptanceError] = useState(null);
    const checkAcceptanceStatus = useCallback((userId) => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsCheckingStatus(true);
            console.log("Checking legal acceptance status for user:", userId);
            const { data, error } = yield supabase
                .from("user_legal_acceptances")
                .select("*")
                .eq("user_id", userId)
                .order("accepted_at", { ascending: false })
                .limit(1)
                .single();
            if (error) {
                // PGRST116 is "no rows returned" - this means the user hasn't accepted yet
                if (error.code === "PGRST116") {
                    console.log("No legal acceptance records found for user:", userId);
                    setHasAcceptedLegal(false);
                    setShowLegalModal(true);
                    return false;
                }
                console.error("Error checking legal acceptance status:", error);
                setHasAcceptedLegal(false);
                setShowLegalModal(true);
                return false;
            }
            // Check if they've accepted all required terms
            if (data) {
                console.log("Found legal acceptance record:", data);
                const allAccepted = data.terms_of_service &&
                    data.privacy_policy &&
                    data.messaging_consent;
                setHasAcceptedLegal(allAccepted);
                setShowLegalModal(!allAccepted);
                return allAccepted;
            }
            else {
                // No acceptance record found
                console.log("No legal acceptance record found despite no error");
                setHasAcceptedLegal(false);
                setShowLegalModal(true);
                return false;
            }
        }
        catch (error) {
            console.error("Error checking legal acceptance:", error);
            setHasAcceptedLegal(false);
            setShowLegalModal(true);
            return false;
        }
        finally {
            setIsCheckingStatus(false);
        }
    }), []);
    // Check acceptance status when user changes
    useEffect(() => {
        if (!user) {
            setIsCheckingStatus(false);
            return;
        }
        checkAcceptanceStatus(user.id);
    }, [user, checkAcceptanceStatus]);
    const closeLegalModal = () => {
        setShowLegalModal(false);
    };
    const acceptLegalTerms = () => __awaiter(this, void 0, void 0, function* () {
        setAcceptanceError(null);
        if (!user) {
            console.error("Cannot accept legal terms: User not authenticated");
            setAcceptanceError("User not authenticated");
            return false;
        }
        try {
            // We don't need to implement the actual acceptance logic here,
            // as it's handled in the LegalAcceptanceModal component
            console.log("Legal terms accepted for user:", user.id);
            setHasAcceptedLegal(true);
            setShowLegalModal(false);
            return true;
        }
        catch (error) {
            console.error("Error in acceptLegalTerms:", error);
            setAcceptanceError(error instanceof Error ? error.message : "Unknown error");
            return false;
        }
    });
    const retryAcceptance = () => __awaiter(this, void 0, void 0, function* () {
        if (!user)
            return false;
        return checkAcceptanceStatus(user.id);
    });
    return {
        hasAcceptedLegal,
        isCheckingStatus,
        showLegalModal,
        closeLegalModal,
        acceptLegalTerms,
        retryAcceptance,
    };
}
