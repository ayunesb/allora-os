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
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExecutiveTeamCarousel } from "./ExecutiveTeamCarousel";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
export default function ExecutiveTeamIntro({ executiveTeamEnabled, setExecutiveTeamEnabled, riskAppetite, companyName, onComplete, isLoading, }) {
    const [whatsAppConsent, setWhatsAppConsent] = React.useState(true);
    const [emailConsent, setEmailConsent] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const handleCompleteSetup = () => __awaiter(this, void 0, void 0, function* () {
        // Clear any previous error messages
        setErrorMessage(null);
        if (isSubmitting)
            return; // Prevent multiple submissions
        setIsSubmitting(true);
        try {
            console.log("Completing setup with preferences:", {
                whatsAppConsent,
                emailConsent,
                executiveTeamEnabled,
            });
            // Save communication preferences to company details
            yield onComplete(); // Call the onComplete function which returns a Promise
        }
        catch (error) {
            console.error("Error completing setup:", error);
            setErrorMessage(error.message || "Failed to complete setup. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-center", children: "Meet Your Executive AI Team" }), _jsxs("p", { className: "text-center text-muted-foreground", children: ["Based on your risk profile (", riskAppetite, "), we've assembled the perfect executive team for ", companyName, "."] }), _jsx(ExecutiveTeamCarousel, { executives: [
                    {
                        id: "1",
                        name: "Alex Morgan",
                        role: "ceo",
                        title: "CEO",
                        specialty: "Strategic Planning & Leadership",
                        avatar: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png",
                    },
                    {
                        id: "2",
                        name: "Jordan Chen",
                        role: "cfo",
                        title: "CFO",
                        specialty: "Financial Planning & Risk Management",
                        avatar: "/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png",
                    },
                    {
                        id: "3",
                        name: "Taylor Reynolds",
                        role: "cmo",
                        title: "CMO",
                        specialty: "Marketing Strategy & Growth",
                        avatar: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png",
                    },
                ] }), _jsx(Card, { className: "mt-8", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-medium", children: "Communication Preferences" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("input", { type: "checkbox", id: "whatsapp-consent", className: "mt-1", checked: whatsAppConsent, onChange: (e) => setWhatsAppConsent(e.target.checked) }), _jsxs("div", { children: [_jsx("label", { htmlFor: "whatsapp-consent", className: "font-medium block", children: "WhatsApp Business Messages" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "I agree to receive business messages via WhatsApp from Allora AI. I understand I can text STOP at any time to opt out." })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("input", { type: "checkbox", id: "email-consent", className: "mt-1", checked: emailConsent, onChange: (e) => setEmailConsent(e.target.checked) }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email-consent", className: "font-medium block", children: "Email Communications" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "I agree to receive email communications from Allora AI. Each email will include an unsubscribe option." })] })] })] })] }) }) }), _jsx("div", { className: "flex justify-center mt-8", children: _jsx(Button, { onClick: handleCompleteSetup, disabled: isLoading || isSubmitting, size: "lg", className: "w-full max-w-md", children: isLoading || isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : ("Complete Setup & Launch Dashboard") }) }), errorMessage && (_jsx("div", { className: "text-center text-red-500 mt-4", children: errorMessage }))] }));
}
