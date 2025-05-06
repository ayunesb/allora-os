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
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAdPlatformConnections } from "@/services/adPlatformService";
import ConnectPlatformsCard from "@/components/adplatforms/ConnectPlatformsCard";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
export default function AdAccountsConnect() {
    const [metaConnected, setMetaConnected] = useState(false);
    const [tiktokConnected, setTiktokConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { profile } = useAuth();
    // Check if user has connected ad accounts
    useEffect(() => {
        const checkConnections = () => __awaiter(this, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                const connections = yield getAdPlatformConnections();
                setMetaConnected(connections.some((conn) => conn.platform === "meta" && conn.is_active));
                setTiktokConnected(connections.some((conn) => conn.platform === "tiktok" && conn.is_active));
            }
            catch (error) {
                console.error("Error checking ad platform connections:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        if (profile === null || profile === void 0 ? void 0 : profile.company_id) {
            checkConnections();
        }
    }, [profile]);
    useEffect(() => {
        // Check URL parameters for auth callback
        const searchParams = new URLSearchParams(window.location.search);
        const platform = searchParams.get("platform");
        const success = searchParams.get("success");
        if (platform && success) {
            if (success === "true") {
                toast.success(`${platform === "meta" ? "Meta" : "TikTok"} account connected successfully!`);
                // Refresh connections after successful connection
                getAdPlatformConnections().then((connections) => {
                    setMetaConnected(connections.some((conn) => conn.platform === "meta" && conn.is_active));
                    setTiktokConnected(connections.some((conn) => conn.platform === "tiktok" && conn.is_active));
                });
            }
            else {
                toast.error(`Failed to connect ${platform === "meta" ? "Meta" : "TikTok"} account. Please try again.`);
            }
            // Remove query params from URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);
    const handleProceed = () => {
        navigate("/dashboard/campaigns/create");
    };
    return (_jsx("div", { className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Connect Your Ad Accounts" }), _jsx("p", { className: "text-muted-foreground", children: "To create and manage campaigns, connect your Meta or TikTok ad accounts" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "w-full max-w-2xl", children: _jsx(ConnectPlatformsCard, { metaConnected: metaConnected, tiktokConnected: tiktokConnected, isLoading: isLoading, onProceed: handleProceed }) })] }) }));
}
