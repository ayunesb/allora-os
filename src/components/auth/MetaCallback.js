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
export default function MetaCallback() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const handleCallback = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchParams = new URLSearchParams(location.search);
                const code = searchParams.get("code");
                const errorParam = searchParams.get("error");
                if (errorParam) {
                    setError(`Meta authorization error: ${errorParam}`);
                    setIsLoading(false);
                    return;
                }
                if (!code) {
                    setError("No authorization code provided");
                    setIsLoading(false);
                    return;
                }
                // Call the edge function to exchange the code for a token
                const response = yield fetch(`/functions/v1/meta-auth?action=callback&code=${code}`);
                const data = yield response.json();
                if (!response.ok) {
                    throw new Error(data.error || "Failed to authenticate with Meta");
                }
                if (data.success) {
                    toast.success("Meta account connected successfully!");
                    navigate("/dashboard/ad-accounts?platform=meta&success=true");
                }
                else {
                    throw new Error(data.error || "Failed to connect Meta account");
                }
            }
            catch (error) {
                console.error("Meta callback error:", error);
                setError(error.message || "An error occurred during Meta authentication");
                toast.error("Failed to connect Meta account");
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
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx(RefreshCcw, { className: "h-12 w-12 animate-spin text-primary mx-auto mb-4" }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Connecting to Meta..." }), _jsx("p", { className: "text-muted-foreground", children: "Please wait while we authenticate your account." })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Authentication Error" }), _jsx("p", { className: "text-red-500 mb-4", children: error }), _jsx(Button, { onClick: handleRetry, children: "Try Again" })] }) }));
    }
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx(RefreshCcw, { className: "h-12 w-12 animate-spin text-primary mx-auto mb-4" }), _jsx("h1", { className: "text-2xl font-bold mb-2", children: "Redirecting..." }), _jsx("p", { className: "text-muted-foreground", children: "You will be redirected to the dashboard shortly." })] }) }));
}
