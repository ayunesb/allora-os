import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, CheckCircle2 } from "lucide-react";
export default function ReportCard({ report }) {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(CardTitle, { className: "text-lg", children: report.title }), report.status === "completed" ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(Calendar, { className: "h-5 w-5 text-blue-500" }))] }), _jsx("p", { className: "text-sm text-muted-foreground", children: new Date(report.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }) })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium", children: "Status: " }), _jsx("span", { className: `text-sm ${report.status === "completed"
                                        ? "text-green-500"
                                        : "text-blue-500"}`, children: report.status === "completed" ? "Completed" : "Scheduled" })] }), report.status === "completed" ? (_jsxs(Button, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Download"] })) : (_jsx(Button, { size: "sm", variant: "outline", disabled: true, children: "Pending" }))] }) })] }));
}
