import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Check, Rocket, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Launch = ({ title, description }) => {
    return (_jsxs("div", { children: [_jsx("h1", { children: title }), _jsx("p", { children: description })] }));
};
const features = [
    "AI CEO Strategy Generator",
    "Campaign Deployment: WhatsApp, TikTok, Meta, Email",
    "Plugin ROI Tracking",
    "Public Vault + Strategy Remix",
    "Agent Wins + Tweet Automation",
    "Visual Campaign Builder",
    "Conversational AI Shopping Assistant",
];
export default function LaunchPage() {
    const { user } = useUser();
    const [stats, setStats] = useState(null);
    useEffect(() => {
        if (user) {
            fetch("/api/galaxy/usage") // 👈 Replace with real endpoint
                .then((res) => res.json())
                .then((data) => setStats(data));
        }
    }, [user]);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-background via-black/60 to-background text-white px-6 py-12 flex flex-col items-center", children: [_jsx(Rocket, { className: "h-12 w-12 text-primary mb-4 animate-pulse" }), _jsx("h1", { className: "text-4xl font-bold tracking-tight text-center mb-2", children: "Allora OS Galaxy v2.5 is Live" }), _jsx("p", { className: "text-lg text-muted-foreground text-center max-w-xl mb-6", children: "The 90% AI business operating system \u2014 strategy, execution, and analytics, all in one." }), _jsx("div", { className: "aspect-video w-full max-w-3xl rounded-xl overflow-hidden shadow-xl mb-6", children: _jsx("iframe", { width: "100%", height: "100%", src: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE", title: "Allora OS Launch Video", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }), _jsx("div", { className: "mb-6 text-left space-y-2 w-full max-w-md", children: features.map((f) => (_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Check, { className: "text-green-400 h-4 w-4" }), f] }, f))) }), _jsx(Link, { to: "/onboarding", children: _jsx(Button, { size: "lg", className: "text-white text-lg px-6 py-4 font-semibold", children: "Get Started" }) }), user && stats && (_jsxs("div", { className: "mt-8 w-full max-w-2xl border border-white/10 bg-white/5 rounded-xl p-6 space-y-4", children: [_jsxs("h3", { className: "text-xl font-semibold flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-5 h-5" }), " Galaxy Usage Stats"] }), _jsxs("ul", { className: "text-sm text-muted-foreground", children: [_jsxs("li", { children: ["\uD83E\uDDE0 AI Strategies Run: ", stats.totalStrategies] }), _jsxs("li", { children: ["\uD83D\uDCE6 Plugins Installed: ", stats.totalPlugins] }), _jsxs("li", { children: ["\uD83D\uDE80 Campaigns Launched: ", stats.totalCampaigns] }), _jsxs("li", { children: ["\uD83C\uDFC6 Agent Wins Published: ", stats.totalAgentWins] })] })] })), _jsxs("div", { className: "mt-10", children: [_jsx("script", { async: true, defer: true, src: "https://buttons.github.io/buttons.tsx" }), _jsx("iframe", { src: "https://www.producthunt.com/widgets/embed.tsx", width: "100%", height: "70", style: { border: "none", overflow: "hidden" }, title: "Product Hunt Widget" })] }), _jsx("p", { className: "mt-10 text-xs text-muted-foreground text-center", children: "Built with Supabase, Vite, OpenAI, ShadCN, and pure vision." })] }));
}
