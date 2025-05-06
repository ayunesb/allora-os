var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useZoomIntegration } from "@/hooks/useZoomIntegration";
import { Loader2 } from "lucide-react";
export default function ZoomCallback() {
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleCallback } = useZoomIntegration();
    useEffect(() => {
        function processCallback() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    // Parse the URL query parameters
                    const searchParams = new URLSearchParams(location.search);
                    const code = searchParams.get("code");
                    const state = searchParams.get("state");
                    const error = searchParams.get("error");
                    if (error) {
                        setStatus("error");
                        setErrorMessage(`Zoom authorization error: ${error}`);
                        return;
                    }
                    if (!code || !state) {
                        setStatus("error");
                        setErrorMessage("Missing required parameters");
                        return;
                    }
                    // Handle the callback
                    const redirectUri = `${window.location.origin}/zoom-callback`;
                    const result = yield handleCallback(code, state, redirectUri);
                    if (result.success) {
                        setStatus("success");
                        // Redirect after a short delay
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 2000);
                    }
                    else {
                        setStatus("error");
                        setErrorMessage(((_a = result.error) === null || _a === void 0 ? void 0 : _a.message) || "Failed to connect Zoom");
                    }
                }
                catch (error) {
                    setStatus("error");
                    setErrorMessage(error.message || "An unexpected error occurred");
                }
            });
        }
        processCallback();
    }, [location, handleCallback, navigate]);
    return (_jsx("div", { className: "flex h-screen items-center justify-center", children: _jsx("div", { className: "w-full max-w-md p-8 bg-card rounded-lg shadow-lg border", children: _jsxs("div", { className: "text-center", children: [status === "loading" && (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mx-auto h-12 w-12 animate-spin text-primary" }), _jsx("h2", { className: "mt-4 text-2xl font-bold", children: "Connecting to Zoom" }), _jsx("p", { className: "mt-2 text-muted-foreground", children: "Please wait while we complete the connection..." })] })), status === "success" && (_jsxs(_Fragment, { children: [_jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900", children: _jsx("svg", { className: "h-6 w-6 text-green-600 dark:text-green-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }), _jsx("h2", { className: "mt-4 text-2xl font-bold text-green-600 dark:text-green-400", children: "Successfully Connected!" }), _jsx("p", { className: "mt-2 text-muted-foreground", children: "Your Zoom account has been connected to Allora AI." }), _jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Redirecting to dashboard..." })] })), status === "error" && (_jsxs(_Fragment, { children: [_jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900", children: _jsx("svg", { className: "h-6 w-6 text-red-600 dark:text-red-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), _jsx("h2", { className: "mt-4 text-2xl font-bold text-red-600 dark:text-red-400", children: "Connection Failed" }), _jsx("p", { className: "mt-2 text-muted-foreground", children: errorMessage || "An error occurred while connecting to Zoom." }), _jsx("button", { onClick: () => navigate("/dashboard"), className: "mt-6 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90", children: "Return to Dashboard" })] }))] }) }) }));
}
