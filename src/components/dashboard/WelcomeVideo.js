import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Play, Volume2, VolumeX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
export function WelcomeVideo() {
    const [dismissed, setDismissed] = useState(false);
    const [muted, setMuted] = useState(true);
    const { profile } = useAuth();
    // Check if this is the user's first visit
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    useEffect(() => {
        // Check local storage to see if this is the first dashboard visit
        const hasVisitedBefore = localStorage.getItem("hasVisitedDashboard");
        if (!hasVisitedBefore) {
            setIsFirstVisit(true);
            localStorage.setItem("hasVisitedDashboard", "true");
        }
    }, []);
    // Don't show if not first visit or already dismissed
    if (!isFirstVisit || dismissed) {
        return null;
    }
    return (_jsxs(Card, { className: "border-primary/10 overflow-hidden", children: [_jsxs(CardHeader, { className: "pb-0 flex flex-row justify-between items-start space-y-0", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl mb-1", children: "Welcome to Allora AI" }), _jsx(CardDescription, { children: "Watch this quick intro to get started with your AI executive team" })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "mt-0", onClick: () => setDismissed(true), children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "relative rounded-md overflow-hidden bg-black aspect-video", children: [_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Play, { className: "h-16 w-16 text-white opacity-80" }) }), _jsx("div", { className: "absolute bottom-4 right-4 flex gap-2", children: _jsx(Button, { size: "icon", variant: "ghost", className: "bg-black/50 text-white h-8 w-8 rounded-full", onClick: () => setMuted(!muted), children: muted ? (_jsx(VolumeX, { className: "h-4 w-4" })) : (_jsx(Volume2, { className: "h-4 w-4" })) }) }), _jsx("div", { className: "w-full h-full bg-gradient-to-r from-gray-900 to-gray-800", children: _jsx("div", { className: "flex items-center justify-center h-full text-white text-opacity-70 text-sm", children: "Welcome video placeholder" }) })] }) })] }));
}
export default WelcomeVideo;
