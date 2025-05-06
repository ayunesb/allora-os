import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
const CampaignTable = ({ campaigns, isLoading, error, onRetry, }) => {
    // Loading state with skeletons
    if (isLoading) {
        return (_jsx("div", { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Company" }), _jsx(TableHead, { children: "Platform" }), _jsx(TableHead, { children: "Budget" })] }) }), _jsx(TableBody, { children: [1, 2, 3, 4].map((i) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-5 w-[150px]" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-5 w-[120px]" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-6 w-[100px]" }) }), _jsx(TableCell, { children: _jsx(Skeleton, { className: "h-5 w-[80px]" }) })] }, i))) })] }) }));
    }
    // Error state
    if (error) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-md my-4", children: [_jsx(AlertCircle, { className: "h-8 w-8 text-red-500 mb-2" }), _jsx("h3", { className: "text-lg font-medium text-red-800", children: "Failed to load campaigns" }), _jsx("p", { className: "text-red-600 mb-4", children: error }), onRetry && (_jsx("button", { onClick: onRetry, className: "px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors", children: "Try Again" }))] }));
    }
    // Empty state
    if (campaigns.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center p-6 bg-muted/40 border border-border rounded-md my-4", children: [_jsx("h3", { className: "text-lg font-medium mb-1", children: "No campaigns found" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Create your first campaign to get started." })] }));
    }
    // Data table
    return (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Company" }), _jsx(TableHead, { children: "Platform" }), _jsx(TableHead, { children: "Budget" })] }) }), _jsx(TableBody, { children: campaigns.map((campaign) => {
                    var _a;
                    // Type cast to handle potential companies property
                    const campaignWithCompany = campaign;
                    return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: campaign.name }), _jsx(TableCell, { children: ((_a = campaignWithCompany.companies) === null || _a === void 0 ? void 0 : _a.name) || "-" }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: "bg-primary/10 text-primary", children: campaign.platform }) }), _jsx(TableCell, { children: formatCurrency(campaign.budget || 0) })] }, campaign.id));
                }) })] }));
};
export default CampaignTable;
