import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Facebook } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
export function CampaignStats({ campaigns }) {
    const formatCurrency = (value) => {
        return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };
    // Helper function to safely access nested properties
    const getMetricValue = (campaign, metricPath, defaultValue = 0) => {
        if (!campaign.performance_metrics)
            return defaultValue;
        const parts = metricPath.split(".");
        let current = campaign.performance_metrics;
        for (const part of parts) {
            if (current === undefined || current === null)
                return defaultValue;
            current = current[part];
        }
        // Convert string to number if needed
        if (typeof current === "string") {
            const parsed = parseFloat(current);
            return isNaN(parsed) ? defaultValue : parsed;
        }
        return typeof current === "number" ? current : defaultValue;
    };
    const totalBudget = campaigns.reduce((sum, campaign) => sum + (campaign.budget || 0), 0);
    const totalActiveSpend = campaigns
        .filter((c) => c.deployment_status === "deployed" && c.payment_status === "paid")
        .reduce((sum, campaign) => {
        const spend = getMetricValue(campaign, "spend");
        return sum + spend;
    }, 0);
    const totalImpressions = campaigns
        .filter((c) => c.deployment_status === "deployed" && c.payment_status === "paid")
        .reduce((sum, campaign) => {
        const impressions = getMetricValue(campaign, "impressions");
        return sum + impressions;
    }, 0);
    const totalClicks = campaigns
        .filter((c) => c.deployment_status === "deployed" && c.payment_status === "paid")
        .reduce((sum, campaign) => {
        const clicks = getMetricValue(campaign, "clicks");
        return sum + clicks;
    }, 0);
    // Handle counting platforms safely
    const countPlatforms = () => {
        const metaCount = campaigns.filter((c) => (c.ad_platform || c.platform) === "meta").length;
        const tiktokCount = campaigns.filter((c) => (c.ad_platform || c.platform) === "tiktok").length;
        return {
            hasMeta: metaCount > 0,
            hasTiktok: tiktokCount > 0,
            metaCount,
            tiktokCount,
        };
    };
    const platforms = countPlatforms();
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "Total Campaigns" }), _jsx(CardTitle, { className: "text-3xl", children: campaigns.length })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-muted-foreground", children: [campaigns.filter((c) => c.deployment_status === "deployed").length, " ", "active"] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "Total Budget" }), _jsx(CardTitle, { className: "text-3xl", children: formatCurrency(totalBudget) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-muted-foreground", children: [formatCurrency(totalActiveSpend), " spent"] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "Total Impressions" }), _jsx(CardTitle, { className: "text-3xl", children: totalImpressions.toLocaleString() })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-muted-foreground", children: [totalClicks.toLocaleString(), " clicks"] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsx(CardDescription, { children: "Platforms" }), _jsxs(CardTitle, { className: "text-3xl flex gap-2", children: [platforms.hasMeta && (_jsx(Facebook, { className: "h-8 w-8 text-blue-600" })), platforms.hasTiktok && _jsx(TikTokIcon, { className: "h-8 w-8" }), !platforms.hasMeta && !platforms.hasTiktok && "None"] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-muted-foreground", children: [platforms.metaCount, " Meta,\u00A0", platforms.tiktokCount, " TikTok"] }) })] })] }));
}
