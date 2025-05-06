import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import Navbar from "@/components/Navbar"; // Changed from { Navbar } to default import
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import TrustBadges from "@/components/home/TrustBadges";
import InteractiveDemo from "@/components/home/InteractiveDemo";
import OutcomeShowcase from "@/components/home/OutcomeShowcase";
import CookieConsent from "@/components/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { logger } from "@/utils/loggingService";
export default function Index() {
    useEffect(() => {
        logger.info("Index component mounted");
        return () => logger.info("Index component unmounted");
    }, []);
    return (_jsx(ErrorBoundary, { children: _jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [_jsx(Navbar, {}), _jsxs("main", { className: "flex flex-col items-center flex-grow", children: [_jsx(Hero, {}), _jsx(TrustBadges, {}), _jsx(InteractiveDemo, {}), _jsx(OutcomeShowcase, {}), _jsx(Features, {}), _jsx(Testimonials, {}), _jsx(CallToAction, {})] }), _jsx(Footer, {}), _jsx(CookieConsent, {})] }) }));
}
