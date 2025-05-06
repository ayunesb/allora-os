var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { useLinkedInIntegration } from "@/hooks/useLinkedInIntegration";
import { Loader2 } from "lucide-react";
export const LinkedInAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleAuthCallback } = useLinkedInIntegration();
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const processAuth = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const code = searchParams.get("code");
                const state = searchParams.get("state");
                if (!code || !state) {
                    setError("Missing required parameters");
                    setIsProcessing(false);
                    return;
                }
                const success = yield handleAuthCallback(code, state);
                if (success) {
                    // Redirect to LinkedIn integration page
                    navigate("/linkedin-integration");
                }
                else {
                    setError("Authentication failed");
                }
            }
            catch (err) {
                console.error("Error processing LinkedIn auth callback:", err);
                setError(err.message || "An unexpected error occurred");
            }
            finally {
                setIsProcessing(false);
            }
        });
        processAuth();
    }, [searchParams, handleAuthCallback, navigate]);
    return (_jsx("div", { className: "flex items-center justify-center min-h-[70vh]", children: _jsxs(Card, { className: "w-[400px]", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "LinkedIn Authentication" }), _jsx(CardDescription, { children: isProcessing
                                ? "Processing your LinkedIn authentication..."
                                : error
                                    ? "There was a problem connecting to LinkedIn"
                                    : "Successfully connected to LinkedIn" })] }), _jsx(CardContent, { className: "flex flex-col items-center justify-center p-6", children: isProcessing ? (_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), _jsx("p", { children: "Please wait while we complete the authentication process" })] })) : error ? (_jsxs("div", { className: "text-center text-destructive", children: [_jsxs("p", { className: "mb-4", children: ["Error: ", error] }), _jsx("p", { children: "Please try connecting again from the LinkedIn integration page." })] })) : (_jsxs("div", { className: "text-center text-green-600", children: [_jsx("p", { className: "mb-4", children: "Successfully connected to LinkedIn!" }), _jsx("p", { children: "You'll be redirected to the LinkedIn integration page." })] })) })] }) }));
};
