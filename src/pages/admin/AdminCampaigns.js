import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Plus, Edit, Trash2, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const mockCampaigns = [
    {
        id: "1",
        name: "Q2 Product Launch",
        status: "active",
        startDate: "2025-04-01",
        endDate: "2025-06-30",
        budget: "$15,000",
        platform: "Multi-channel",
    },
    {
        id: "2",
        name: "Summer Promotion",
        status: "draft",
        startDate: "2025-06-15",
        endDate: "2025-08-15",
        budget: "$8,500",
        platform: "Facebook, Instagram",
    },
    {
        id: "3",
        name: "Black Friday Sale",
        status: "scheduled",
        startDate: "2025-11-20",
        endDate: "2025-11-30",
        budget: "$25,000",
        platform: "All platforms",
    },
    {
        id: "4",
        name: "Spring Collection",
        status: "ended",
        startDate: "2025-03-01",
        endDate: "2025-03-31",
        budget: "$12,000",
        platform: "Meta Ads",
    },
];
export default function AdminCampaigns() {
    const renderStatusBadge = (status) => {
        switch (status) {
            case "active":
                return (_jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30", children: status }));
            case "draft":
                return _jsx(Badge, { variant: "outline", children: status });
            case "scheduled":
                return (_jsx(Badge, { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30", children: status }));
            case "ended":
                return _jsx(Badge, { variant: "secondary", children: status });
            default:
                return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    const columns = [
        {
            key: "name",
            title: "Campaign Name",
            render: (item) => _jsx("span", { className: "font-medium", children: item.name }),
        },
        {
            key: "status",
            title: "Status",
            render: (item) => renderStatusBadge(item.status),
        },
        {
            key: "dateRange",
            title: "Date Range",
            hideOnMobile: true,
            render: (item) => (_jsxs("span", { children: [item.startDate, " to ", item.endDate] })),
        },
        {
            key: "budget",
            title: "Budget",
            hideOnMobile: true,
            render: (item) => _jsx("span", { children: item.budget }),
        },
        {
            key: "platform",
            title: "Platform",
            hideOnMobile: true,
            render: (item) => _jsx("span", { children: item.platform }),
        },
    ];
    const mobileColumns = [
        {
            key: "name",
            title: "Campaign",
            render: (item) => _jsx("span", { className: "font-medium", children: item.name }),
        },
        {
            key: "status",
            title: "Status",
            render: (item) => renderStatusBadge(item.status),
        },
        {
            key: "budget",
            title: "Budget",
            render: (item) => _jsx("span", { children: item.budget }),
        },
    ];
    const actions = (item) => (_jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { size: "icon", variant: "ghost", children: _jsx(BarChart, { className: "h-4 w-4" }) }), _jsx(Button, { size: "icon", variant: "ghost", children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { size: "icon", variant: "ghost", className: "text-destructive hover:text-destructive", children: _jsx(Trash2, { className: "h-4 w-4" }) })] }));
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsx(TypographyH1, { children: "Campaign Management" }), _jsxs(Button, { className: "w-full sm:w-auto", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "New Campaign"] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "All Campaigns" }) }), _jsx(CardContent, { children: _jsx(ResponsiveTable, { data: mockCampaigns, columns: columns, mobileColumns: mobileColumns, actions: actions }) })] })] }));
}
