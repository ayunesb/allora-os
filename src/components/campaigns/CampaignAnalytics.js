import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const CampaignAnalytics = ({ campaign }) => {
    // Format ROI as a percentage string
    const formatRoi = (roi) => {
        if (roi === undefined)
            return "N/A";
        // Convert number to percentage string
        return `${(roi * 100).toFixed(1)}%`;
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Campaign Analytics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-white rounded-lg shadow p-4", children: [_jsx("h3", { className: "text-sm text-gray-500", children: "ROI" }), _jsx("p", { className: "text-2xl font-bold", children: formatRoi(campaign.roi) })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-4", children: [_jsx("h3", { className: "text-sm text-gray-500", children: "Budget" }), _jsxs("p", { className: "text-2xl font-bold", children: ["$", campaign.budget.toLocaleString()] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-4", children: [_jsx("h3", { className: "text-sm text-gray-500", children: "Health Score" }), _jsx("p", { className: "text-2xl font-bold", children: campaign.healthScore || "N/A" })] })] })] }));
};
export default CampaignAnalytics;
