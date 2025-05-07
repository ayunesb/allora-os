import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { GlobalErrorBoundary } from "./components/errorHandling/GlobalErrorBoundary";
import { setupErrorLogging } from "./utils/errorHandling/errorLogging";
import { GlobalErrorModal } from "./components/errorHandling/GlobalErrorModal";
import { CompanyAPIProvider } from "./context/CompanyAPIContext";
import { initializeAnalytics } from "./utils/analytics";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import CookieConsent from "./components/CookieConsent";
import { RouterProvider, Route, Routes } from "react-router-dom";
import { router } from "./routes/router";
import { Helmet } from "react-helmet-async";
import PluginDetailPage from "@/pages/plugin/[id]";
import StrategyDetailPage from "@/pages/strategy/[id]";
const App = () => {
    React.useEffect(() => {
        // Initialize error logging
        setupErrorLogging();
        // Initialize analytics (only if consent is given)
        const cookieConsent = localStorage.getItem("cookie-consent");
        if (cookieConsent) {
            const settings = JSON.parse(cookieConsent);
            if (settings === null || settings === void 0 ? void 0 : settings.analytics) {
                initializeAnalytics();
            }
        }
    }, []);
    return (_jsx(GlobalErrorBoundary, { children: _jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(AccessibilityProvider, { children: _jsxs(CompanyAPIProvider, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "Allora OS \u2013 AI-Native Business System" }), _jsx("meta", { name: "description", content: "Allora OS helps startups run 90% autonomously with AI agents and strategy automation." }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx("meta", { property: "og:title", content: "Allora OS" }), _jsx("meta", { property: "og:description", content: "Run your startup like a pro\u2014with autonomous AI execution." }), _jsx("meta", { property: "og:url", content: "https://allora-os.vercel.app" })] }), _jsx(RouterProvider, { router: router }), _jsx(Suspense, { fallback: _jsx("div", { className: "p-8 text-white", children: "Loading Galaxy..." }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/plugin/:id", element: _jsx(PluginDetailPage, {}) }), _jsx(Route, { path: "/strategy/:id", element: _jsx(StrategyDetailPage, {}) }), _jsx(Route, { path: "*", element: _jsx("div", { children: "404 Not Found" }) })] }) }), _jsx(Toaster, { position: "top-right" }), _jsx(GlobalErrorModal, {}), _jsx(CookieConsent, {}), _jsx("div", { id: "aria-live-polite", className: "sr-only", "aria-live": "polite" }), _jsx("div", { id: "aria-live-assertive", className: "sr-only", "aria-live": "assertive" })] }) }) }) }) }));
};
export default App;
