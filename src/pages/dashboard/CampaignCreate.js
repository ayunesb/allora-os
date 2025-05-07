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
import { getAdPlatformConnections } from "@/services/adPlatformService";
import CampaignCreateForm from "@/components/campaigns/CampaignCreateForm";
import ConnectPlatformsCard from "@/components/adplatforms/ConnectPlatformsCard";
import { motion } from "framer-motion";
export default function CampaignCreate() {
    const [metaConnected, setMetaConnected] = useState(false);
    const [tiktokConnected, setTiktokConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
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
        checkConnections();
    }, []);
    const handleConnectAccounts = () => {
        navigate("/dashboard/ad-accounts");
    };
    // If no ad accounts are connected, show the connect platforms card
    if (isLoading) {
        return (_jsx("div", { className: "container mx-auto px-4 py-12 flex justify-center", children: _jsxs("div", { className: "w-full max-w-2xl animate-pulse", children: [_jsx("div", { className: "h-8 bg-muted rounded mb-4 w-1/2 mx-auto" }), _jsx("div", { className: "h-4 bg-muted rounded mb-8 w-2/3 mx-auto" }), _jsx("div", { className: "h-96 bg-muted rounded" })] }) }));
    }
    if (!metaConnected && !tiktokConnected) {
        return (_jsx("div", { className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Connect an Ad Account First" }), _jsx("p", { className: "text-muted-foreground", children: "To create campaigns, you need to connect at least one ad platform account" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "w-full max-w-2xl", children: _jsx(ConnectPlatformsCard, { metaConnected: metaConnected, tiktokConnected: tiktokConnected, isLoading: false, onProceed: handleConnectAccounts }) })] }) }));
    }
    return (_jsx("div", { className: "container mx-auto px-4 py-12", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Create a New Campaign" }), _jsx("p", { className: "text-muted-foreground", children: "Set up your campaign details, targeting, and budget" })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "w-full", children: _jsx(CampaignCreateForm, {}) })] }) }));
}
