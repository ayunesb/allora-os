import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
const mockEntities = [
    {
        id: "1",
        name: "User",
        type: "Core",
        createdAt: "2023-03-15",
        status: "active",
    },
    {
        id: "2",
        name: "Company",
        type: "Core",
        createdAt: "2023-03-15",
        status: "active",
    },
    {
        id: "3",
        name: "Strategy",
        type: "Business",
        createdAt: "2023-04-20",
        status: "active",
    },
    {
        id: "4",
        name: "Executive",
        type: "AI",
        createdAt: "2023-05-10",
        status: "active",
    },
];
export default function AdminEntities() {
    const columns = [
        {
            key: "name",
            title: "Entity Name",
            render: (item) => _jsx("span", { className: "font-medium", children: item.name }),
        },
        {
            key: "type",
            title: "Type",
            render: (item) => _jsx("span", { children: item.type }),
        },
        {
            key: "createdAt",
            title: "Created",
            hideOnMobile: true,
            render: (item) => _jsx("span", { children: item.createdAt }),
        },
        {
            key: "status",
            title: "Status",
            render: (item) => (_jsx("span", { className: `inline-flex px-2 py-1 text-xs rounded-full ${item.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : item.status === "inactive"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`, children: item.status })),
        },
    ];
    const mobileColumns = [
        {
            key: "name",
            title: "Entity Name",
            render: (item) => _jsx("span", { className: "font-medium", children: item.name }),
        },
        {
            key: "type",
            title: "Type",
            render: (item) => _jsx("span", { children: item.type }),
        },
        {
            key: "status",
            title: "Status",
            render: (item) => (_jsx("span", { className: `inline-flex px-2 py-1 text-xs rounded-full ${item.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : item.status === "inactive"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`, children: item.status })),
        },
    ];
    const actions = (item) => (_jsxs("div", { className: "flex gap-2 justify-end", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Edit" }), _jsx(Button, { variant: "outline", size: "sm", className: "text-destructive hover:text-destructive", children: "Delete" })] }));
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsx(TypographyH1, { children: "Entity Management" }), _jsxs(Button, { className: "w-full sm:w-auto", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Entity"] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "System Entities" }) }), _jsx(CardContent, { children: _jsx(ResponsiveTable, { data: mockEntities, columns: columns, mobileColumns: mobileColumns, actions: actions, emptyState: _jsxs("div", { className: "text-center py-8", children: [_jsx(TypographyP, { children: "No entities found. Create your first entity to get started." }), _jsxs(Button, { className: "mt-4", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Entity"] })] }) }) })] })] }));
}
