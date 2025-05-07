import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
const ImplementationTabContent = ({ strategyId, activeTab }) => {
    // Content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case "overview":
                return _jsx(OverviewTab, { strategyId: strategyId });
            case "timeline":
                return _jsx(TimelineTab, { strategyId: strategyId });
            case "roi":
                return _jsx(RoiTab, { strategyId: strategyId });
            case "resources":
                return _jsx(ResourcesTab, { strategyId: strategyId });
            default:
                return _jsx("div", { children: "Select a tab to view implementation details" });
        }
    };
    return _jsx("div", { className: "mt-4", children: renderContent() });
};
// Tab components
const OverviewTab = ({ strategyId }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Implementation Overview" }), _jsx("p", { className: "text-muted-foreground", children: "This section provides a high-level overview of the strategy implementation plan." })] }) }));
const TimelineTab = ({ strategyId }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Implementation Timeline" }), _jsx("p", { className: "text-muted-foreground", children: "View the timeline and milestones for this strategy implementation." })] }) }));
const RoiTab = ({ strategyId }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "ROI Tracking" }), _jsx("p", { className: "text-muted-foreground", children: "Track the return on investment for this strategy." })] }) }));
const ResourcesTab = ({ strategyId }) => (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Resources & Documents" }), _jsx("p", { className: "text-muted-foreground", children: "Access resources and documents related to this strategy." })] }) }));
export default ImplementationTabContent;
