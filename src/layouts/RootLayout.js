import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // if using shadcn
import GalaxyPage from "@/pages/Galaxy";
const queryClient = new QueryClient();
export default function RootLayout() {
    const location = useLocation();
    return (_jsx(GlobalErrorBoundary, { children: _jsx(HelmetProvider, { children: _jsx(ThemeProvider, { defaultTheme: "dark", storageKey: "allora-theme", children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx("div", { className: "min-h-screen text-white bg-gradient-to-br from-[#0A0A23] to-[#1A1A40] bg-fixed", children: _jsx("body", { className: "bg-gradient-futuristic text-foreground", children: _jsx("div", { id: "root", children: _jsxs("div", { className: "min-h-screen bg-background text-foreground antialiased", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.25, ease: "easeOut" }, className: "min-h-screen", children: _jsx(Suspense, { fallback: _jsx(Skeleton, { className: "h-[500px] w-full" }), children: location.pathname === "/galaxy" ? (_jsx(GalaxyPage, {})) : (_jsx(Outlet, {})) }) }, location.pathname) }), _jsx(Toaster, {})] }) }) }) }) }) }) }) }));
}
