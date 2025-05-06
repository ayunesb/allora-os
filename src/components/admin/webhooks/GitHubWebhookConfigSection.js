var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Github, AlertCircle, Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWebhookValidation } from "./useWebhookValidation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
const GitHubWebhookConfigSection = ({ onConfigureWebhook }) => {
    const [githubWebhook, setGithubWebhook] = useState(localStorage.getItem("github_webhook_url") || "");
    const [isTestLoading, setIsTestLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(!!localStorage.getItem("github_webhook_url"));
    const [isConnecting, setIsConnecting] = useState(false);
    const { isValid, validationMessage, validateUrl } = useWebhookValidation("github");
    useEffect(() => {
        // Validate the URL when component mounts
        if (githubWebhook) {
            validateUrl(githubWebhook);
        }
    }, []);
    const handleInputChange = (e) => {
        const value = e.target.value;
        setGithubWebhook(value);
        validateUrl(value);
    };
    const testGitHubWebhook = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!githubWebhook) {
            toast.error("Please enter a GitHub webhook URL first");
            return;
        }
        if (isValid !== true) {
            toast.error("Please enter a valid GitHub webhook URL");
            return;
        }
        setIsTestLoading(true);
        // Simulate webhook testing
        setTimeout(() => {
            localStorage.setItem("github_webhook_url", githubWebhook);
            setIsConnected(true);
            setIsTestLoading(false);
            toast.success("GitHub webhook connection successful!");
        }, 1500);
    });
    const handleDirectGitHubConnect = () => {
        setIsConnecting(true);
        // Simulate GitHub OAuth flow and webhook setup
        toast.success("GitHub connection initiated");
        // Simulate the OAuth process with a timeout
        setTimeout(() => {
            const mockGitHubWebhookUrl = "https://api.github.com/repos/allora-ai/platform/hooks/12345678";
            setGithubWebhook(mockGitHubWebhookUrl);
            validateUrl(mockGitHubWebhookUrl);
            localStorage.setItem("github_webhook_url", mockGitHubWebhookUrl);
            setIsConnected(true);
            setIsConnecting(false);
            toast.success("GitHub repository connected successfully!");
        }, 2000);
    };
    return (_jsxs("div", { className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Github, { className: `h-5 w-5 ${isConnected ? "text-green-500" : "text-muted-foreground"}` }), _jsx("h3", { className: "font-medium", children: "GitHub Webhooks" })] }), isConnected ? (_jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: "Connected" })) : (_jsx(Badge, { variant: "outline", className: "bg-red-50 text-red-700 border-red-200", children: "Not Connected" }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "github-webhook-url", children: "GitHub Webhook URL" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { id: "github-webhook-url", placeholder: "https://api.github.com/repos/username/repo/hooks/...", value: githubWebhook, onChange: handleInputChange, className: !isValid && githubWebhook ? "border-red-500" : "" }), _jsx(Button, { type: "button", variant: "outline", onClick: testGitHubWebhook, disabled: isTestLoading || !githubWebhook || isValid !== true, children: isTestLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Testing"] })) : ("Test") })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your GitHub webhook URL to receive repository events like pushes, pull requests, etc." })] }), !isValid && githubWebhook && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: validationMessage || "Invalid GitHub webhook URL format" })] })), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 justify-between items-center pt-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => window.open("https://docs.github.com/en/developers/webhooks-and-events/webhooks", "_blank"), children: "GitHub Docs" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "default", size: "sm", onClick: handleDirectGitHubConnect, disabled: isConnecting, className: "gap-2", children: isConnecting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Connecting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Link2, { className: "h-4 w-4" }), "Connect GitHub"] })) }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => onConfigureWebhook("github"), children: "Advanced Config" })] })] })] }));
};
export default GitHubWebhookConfigSection;
