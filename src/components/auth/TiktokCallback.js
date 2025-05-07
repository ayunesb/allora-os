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
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { RefreshCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
export default function TiktokCallback() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const handleCallback = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchParams = new URLSearchParams(location.search);
                const authCode = searchParams.get("auth_code");
                const errorParam = searchParams.get("error");
                if (errorParam) {
                    setError(`TikTok authorization error: ${errorParam}`);
                    setIsLoading(false);
                    return;
                }
                if (!authCode) {
                    setError("No authorization code provided");
                    setIsLoading(false);
                    return;
                }
                // Call the edge function to exchange the code for a token
                const { data, error } = yield supabase.functions.invoke("tiktok-auth", {
                    body: {
                        action: "callback",
                        auth_code: authCode,
                    },
                });
                if (error) {
                    console.error("TikTok callback error:", error);
                    throw error;
                }
                if (data.success) {
                    toast.success("TikTok account connected successfully!");
                    navigate("/dashboard/ad-accounts?platform=tiktok&success=true");
                }
                else {
                    throw new Error(data.error || "Failed to connect TikTok account");
                }
            }
            catch (error) {
                console.error("TikTok callback error:", error);
                setError(error.message || "An error occurred during TikTok authentication");
                toast.error("Failed to connect TikTok account");
            }
            finally {
                setIsLoading(false);
            }
        });
        handleCallback();
    }, [location, navigate]);
    const handleRetry = () => {
        window.location.href = "/dashboard/ad-accounts";
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx(RefreshCcw, { className: "h-12 w-12 animate-spin text-primary mx-auto mb-4" }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Connecting to TikTok..." }), _jsx("p", { className: "text-muted-foreground", children: "Please wait while we authenticate your account." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Authentication Error" }), _jsx("p", { className: "text-red-500 mb-4", children: error }), _jsx(Button, { onClick: handleRetry, children: "Try Again" })] }) }));
    }
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx(RefreshCcw, { className: "h-12 w-12 animate-spin text-primary mx-auto mb-4" }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Redirecting..." }), _jsx("p", { className: "text-muted-foreground", children: "You will be redirected to the dashboard shortly." })] }) }));
}
