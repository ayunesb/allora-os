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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import WebhookHeader from "@/components/admin/webhooks/WebhookHeader";
import { useWebhookHistory } from "@/hooks/useWebhookHistory";
import WebhookHistoryTab from "@/components/admin/webhooks/WebhookHistoryTab";
import WebhookConfigTab from "@/components/admin/webhooks/config/WebhookConfigTab";
/**
 * Main component for managing webhooks in the admin section
 */
export default function WebhooksTab() {
    const [activeTab, setActiveTab] = useState("config");
    const { events, isLoading, error, 
    // Handle the missing refreshEvents by providing a fallback
    currentPage, setCurrentPage, searchTerm, setSearchTerm, statusFilter, setStatusFilter, typeFilter, setTypeFilter, } = useWebhookHistory();
    // Create a refreshEvents function if it doesn't exist
    const refreshEvents = () => {
        // This is a simple fallback that resets filters which will trigger a re-fetch
        setSearchTerm("");
        setStatusFilter("all");
        setTypeFilter("all");
        setCurrentPage(1);
    };
    // Handle tab changes
    const handleTabChange = (value) => {
        setActiveTab(value);
        // Refresh events when switching to history tab
        if (value === "history") {
            refreshEvents();
        }
    };
    // Configuration state for webhook validity
    const [webhookConfig, setWebhookConfig] = useState({
        stripeConfigValid: false,
        zapierConfigValid: false,
        githubConfigValid: false,
        slackConfigValid: false,
        customConfigValid: false,
    });
    // Update webhook configuration validity
    const handleConfigUpdate = () => {
        // This function signature needs to be updated in the real implementation
        // to match any parameters expected by calling code
    };
    // Set up initial validation
    useEffect(() => {
        // Validate configured webhooks on mount
        const validateWebhookConfigs = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // Simulate validation (replace with actual validation logic)
                setWebhookConfig({
                    stripeConfigValid: true,
                    zapierConfigValid: false,
                    githubConfigValid: false,
                    slackConfigValid: true,
                    customConfigValid: false,
                });
            }
            catch (error) {
                console.error("Error validating webhook configurations:", error);
            }
        });
        validateWebhookConfigs();
    }, []);
    return (_jsxs(Card, { className: "border-none shadow-none", children: [_jsx(CardHeader, { className: "px-0 pt-0", children: _jsx(WebhookHeader, { activeTab: activeTab, onTabChange: handleTabChange }) }), _jsx(CardContent, { className: "px-0 pb-0", children: activeTab === "config" ? (_jsx(WebhookConfigTab, { stripeWebhookId: "whsec_1234567890", stripeEndpointSecret: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", zapierWebhookUrl: "https://hooks.zapier.com/hooks/catch/123456/abcdef/", githubWebhookUrl: "https://api.github.com/repos/username/repo/hooks", githubSecret: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", slackWebhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX", customWebhookUrl: "", stripeValid: webhookConfig.stripeConfigValid, zapierValid: webhookConfig.zapierConfigValid, githubValid: webhookConfig.githubConfigValid, slackValid: webhookConfig.slackConfigValid, customValid: webhookConfig.customConfigValid, onSave: () => {
                        console.log(`Saved webhook config`);
                        handleConfigUpdate();
                    }, onDelete: () => {
                        console.log(`Deleted webhook config`);
                    }, onTest: () => {
                        console.log(`Testing webhook`);
                    }, onTypeChange: () => {
                        // Handle type change
                    } })) : (_jsx(WebhookHistoryTab, { isLoading: isLoading, events: events, onRefresh: refreshEvents })) })] }));
}
