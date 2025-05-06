var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
const CURRENT_VERSIONS = {
    terms: "v2.0",
    privacy: "v2.4",
    messaging: "v1.0",
};
export function LegalAcceptanceModal({ isOpen, userId, onClose, onAccept }) {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [messagingAccepted, setMessagingAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const allAccepted = termsAccepted && privacyAccepted && messagingAccepted;
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!allAccepted) {
            toast.error("You must accept all terms to continue");
            return;
        }
        if (!userId) {
            setErrorMessage("User information is missing");
            toast.error("User information is missing");
            return;
        }
        setIsSubmitting(true);
        setErrorMessage(null);
        try {
            console.log("Attempting to save legal acceptance for user:", userId);
            // Get client IP (in a real production app, this would be done server-side)
            let ipAddress = "127.0.0.1"; // Default fallback IP
            try {
                const response = yield fetch("https://api.ipify.org?format=json");
                if (response.ok) {
                    const data = yield response.json();
                    ipAddress = data.ip;
                }
            }
            catch (error) {
                console.error("Could not determine IP address:", error);
                // Continue with fallback IP
            }
            // First check if a record already exists to avoid unique constraint violations
            const { data: existingRecord, error: checkError } = yield supabase
                .from("user_legal_acceptances")
                .select("id")
                .eq("user_id", userId)
                .eq("terms_version", CURRENT_VERSIONS.terms)
                .eq("privacy_version", CURRENT_VERSIONS.privacy)
                .eq("consent_version", CURRENT_VERSIONS.messaging)
                .maybeSingle();
            if (checkError) {
                console.error("Error checking for existing record:", checkError);
                // Continue with insert attempt
            }
            if (existingRecord) {
                // Update existing record
                const { error: updateError } = yield supabase
                    .from("user_legal_acceptances")
                    .update({
                    terms_of_service: termsAccepted,
                    privacy_policy: privacyAccepted,
                    messaging_consent: messagingAccepted,
                    ip_address: ipAddress,
                    user_agent: navigator.userAgent,
                    accepted_at: new Date().toISOString(),
                })
                    .eq("id", existingRecord.id);
                if (updateError) {
                    throw updateError;
                }
                toast.success("Legal terms updated successfully");
                onAccept();
                return;
            }
            // If no existing record, create a new one
            const { error } = yield supabase.from("user_legal_acceptances").insert({
                user_id: userId,
                terms_of_service: termsAccepted,
                privacy_policy: privacyAccepted,
                messaging_consent: messagingAccepted,
                terms_version: CURRENT_VERSIONS.terms,
                privacy_version: CURRENT_VERSIONS.privacy,
                consent_version: CURRENT_VERSIONS.messaging,
                ip_address: ipAddress,
                user_agent: navigator.userAgent,
            });
            if (error) {
                console.error("Error details from Supabase:", error);
                if (error.code === "23505") {
                    // Unique constraint violation
                    // If there's already a record, try updating it instead
                    const { error: fetchError, data: existingRecords } = yield supabase
                        .from("user_legal_acceptances")
                        .select("id")
                        .eq("user_id", userId)
                        .limit(1);
                    if (fetchError || !existingRecords || existingRecords.length === 0) {
                        throw error;
                    }
                    const recordId = existingRecords[0].id;
                    const { error: updateError } = yield supabase
                        .from("user_legal_acceptances")
                        .update({
                        terms_of_service: termsAccepted,
                        privacy_policy: privacyAccepted,
                        messaging_consent: messagingAccepted,
                        terms_version: CURRENT_VERSIONS.terms,
                        privacy_version: CURRENT_VERSIONS.privacy,
                        consent_version: CURRENT_VERSIONS.messaging,
                        ip_address: ipAddress,
                        user_agent: navigator.userAgent,
                        accepted_at: new Date().toISOString(),
                    })
                        .eq("id", recordId);
                    if (updateError) {
                        throw updateError;
                    }
                    else {
                        // Update was successful
                        toast.success("Legal terms accepted successfully");
                        onAccept();
                        return;
                    }
                }
                else if (error.code === "42501" ||
                    ((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes("permission denied"))) {
                    // This is an RLS policy error
                    setErrorMessage("Permission denied. Please make sure you are properly authenticated.");
                    toast.error("Permission denied. Please make sure you are properly authenticated.");
                    // Try to refresh the session
                    const { error: refreshError } = yield supabase.auth.refreshSession();
                    if (refreshError) {
                        console.error("Failed to refresh session:", refreshError);
                    }
                    else {
                        // Retry after session refresh
                        setTimeout(() => handleSubmit(), 1000);
                    }
                    return;
                }
                throw error;
            }
            toast.success("Legal terms accepted successfully");
            onAccept();
        }
        catch (error) {
            console.error("Error saving legal acceptances:", error);
            setErrorMessage("Failed to save your acceptance. Please try again.");
            toast.error("Failed to save your acceptance. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsx(Dialog, { open: isOpen, onOpenChange: () => { }, children: _jsxs(DialogContent, { className: "max-w-md max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Legal Agreements" }), _jsx(DialogDescription, { children: "Please review and accept the following legal agreements to continue using Allora AI." })] }), _jsxs("div", { className: "space-y-6 py-4", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "terms", checked: termsAccepted, onCheckedChange: (checked) => setTermsAccepted(!!checked) }), _jsxs("div", { className: "grid gap-1.5 leading-none", children: [_jsxs("label", { htmlFor: "terms", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: ["I accept the", " ", _jsx(Link, { to: "/legal/terms-of-service", target: "_blank", className: "text-primary hover:underline", children: "Terms of Service" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "By checking this box, you agree to our terms of service and conditions." })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "privacy", checked: privacyAccepted, onCheckedChange: (checked) => setPrivacyAccepted(!!checked) }), _jsxs("div", { className: "grid gap-1.5 leading-none", children: [_jsxs("label", { htmlFor: "privacy", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: ["I accept the", " ", _jsx(Link, { to: "/legal/privacy-policy", target: "_blank", className: "text-primary hover:underline", children: "Privacy Policy" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "By checking this box, you consent to our collection and use of your data as described in our privacy policy." })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "messaging", checked: messagingAccepted, onCheckedChange: (checked) => setMessagingAccepted(!!checked) }), _jsxs("div", { className: "grid gap-1.5 leading-none", children: [_jsx("label", { htmlFor: "messaging", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: "I consent to receive messaging communications" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "By checking this box, you consent to receive communications via Email, SMS, and WhatsApp from Allora AI." })] })] }), errorMessage && (_jsx("div", { className: "p-3 mt-2 bg-destructive/10 border border-destructive rounded-md text-sm text-destructive", children: errorMessage }))] }), _jsx(DialogFooter, { children: _jsx(Button, { onClick: handleSubmit, disabled: !allAccepted || isSubmitting, className: "w-full", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : ("Accept & Continue") }) })] }) }));
}
