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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/utils/api/apiClient";
import { Card } from "@/components/ui/card";
export default function TwitterConnectPage() {
    const { user } = useAuth();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [lastTweet, setLastTweet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [autoPostSettings, setAutoPostSettings] = useState({
        post_wins: true,
        post_strategies: true,
    });
    const [state, setState] = useState(null);
    setState("some-string");
    // Load connection status
    useEffect(() => {
        if (!user)
            return;
        const loadTwitterStatus = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // For now, we're using the simulation approach
                // In the future this will call a real endpoint
                setTimeout(() => {
                    // Simulate loaded data for development
                    const hasConnection = localStorage.getItem("twitter_connected") === "true";
                    if (hasConnection) {
                        setConnected(true);
                        setUsername("allora_ai");
                        setLastTweet(new Date().toISOString());
                    }
                }, 500);
                // Actual implementation would be:
                // const res = await fetchApi(`/api/twitter/status?tenant_id=${user.tenant_id}`);
                // setConnected(!!res.connected);
                // setUsername(res.username || '');
                // setLastTweet(res.last_tweet_at || null);
                // setAutoPostSettings({
                //   post_wins: res.settings?.post_wins ?? true,
                //   post_strategies: res.settings?.post_strategies ?? true
                // });
            }
            catch (err) {
                console.error("Failed to load Twitter status", err);
                toast.error("Failed to load Twitter connection status");
            }
        });
        loadTwitterStatus();
    }, [user]);
    const handleConnect = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            // Simulated placeholder while Twitter dev access is blocked
            toast.success("Simulating Twitter Connect...");
            setTimeout(() => {
                setConnected(true);
                setUsername("allora_ai");
                setLastTweet(new Date().toISOString());
                localStorage.setItem("twitter_connected", "true");
                toast.success("Twitter Connected! (mock)");
            }, 1000);
            // 🔒 Real version (uncomment once working):
            // const res = await fetchApi('/api/twitter/request-token');
            // window.location.href = res.url;
        }
        catch (err) {
            toast.error("Failed to connect Twitter.");
            console.error("Twitter connection error:", err);
        }
        finally {
            setLoading(false);
        }
    });
    const handleDisconnect = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // Simulated disconnect
            toast.success("Disconnecting Twitter...");
            setTimeout(() => {
                setConnected(false);
                setUsername("");
                setLastTweet(null);
                localStorage.removeItem("twitter_connected");
                toast.success("Twitter disconnected successfully");
            }, 1000);
            // 🔒 Real version (uncomment once working):
            // await fetchApi('/api/twitter/disconnect', {
            //   method: 'POST',
            //   body: JSON.stringify({ tenant_id: user?.tenant_id })
            // });
        }
        catch (err) {
            toast.error("Failed to disconnect Twitter.");
            console.error("Twitter disconnection error:", err);
        }
    });
    const handleSettingChange = (setting, value) => __awaiter(this, void 0, void 0, function* () {
        setAutoPostSettings((prev) => (Object.assign(Object.assign({}, prev), { [setting]: value })));
        // In a real implementation, save the settings to the backend
        // await fetchApi('/api/twitter/settings', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     tenant_id: user?.tenant_id,
        //     settings: { ...autoPostSettings, [setting]: value }
        //   })
        // });
        toast.success("Settings updated");
    });
    const handleTestTweet = () => __awaiter(this, void 0, void 0, function* () {
        try {
            toast.success("Sending test tweet to queue...");
            // This would actually call the real API in production
            yield fetchApi("/api/twitter-post", {
                method: "POST",
                body: JSON.stringify({
                    tenant_id: (user === null || user === void 0 ? void 0 : user.tenant_id) || "test-tenant",
                    message: `This is a test tweet from Allora AI at ${new Date().toLocaleTimeString()}! #AlloraAI #TestTweet`,
                    queue: true,
                }),
            });
            toast.success("Test tweet sent to approval queue!");
        }
        catch (err) {
            toast.error("Failed to send test tweet");
            console.error("Test tweet error:", err);
        }
    });
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "\uD83D\uDD17 Twitter Integration" }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Connect your Twitter account to let Allora automatically publish your agent wins, strategy launches, and more." }), _jsx(Card, { className: "p-6 border border-border", children: connected ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "rounded-lg border p-4 bg-muted/30 space-y-2", children: [_jsxs("p", { className: "text-sm flex items-center gap-2", children: [_jsx("span", { className: "h-4 w-4 bg-green-500 rounded-full" }), "Connected as ", _jsxs("strong", { children: ["@", username] })] }), lastTweet && (_jsxs("p", { className: "text-xs text-muted-foreground", children: ["Last tweet sent: ", new Date(lastTweet).toLocaleString()] }))] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Auto-posting preferences" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", id: "post-wins", checked: autoPostSettings.post_wins, onChange: (e) => handleSettingChange("post_wins", e.target.checked) }), _jsx("label", { htmlFor: "post-wins", className: "text-sm", children: "Post agent wins" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", id: "post-strategies", checked: autoPostSettings.post_strategies, onChange: (e) => handleSettingChange("post_strategies", e.target.checked) }), _jsx("label", { htmlFor: "post-strategies", className: "text-sm", children: "Post new strategies" })] })] })] }), _jsxs("div", { className: "pt-2 space-y-4", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: handleTestTweet, className: "w-full", children: "Send Test Tweet" }), _jsx(Button, { variant: "destructive", size: "sm", onClick: handleDisconnect, className: "w-full", children: "Disconnect Twitter" })] })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm mb-4", children: "Connect your Twitter account to automatically share updates about your business strategies and agent wins. This helps showcase your business growth and Allora's impact." }), _jsx(Button, { onClick: handleConnect, disabled: loading, className: "w-full", children: loading ? "Connecting..." : "Connect Twitter" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Note: You'll be redirected to Twitter to authorize this connection. No tweets will be posted without your permission." })] })) })] }));
}
