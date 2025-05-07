import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { ArrowLeft, RefreshCw, AlertCircle, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SystemHealthHeader() {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", onClick: () => navigate("/admin"), className: "h-8 w-8", children: _jsx(ArrowLeft, { className: "h-4 w-4" }) }), _jsx(TypographyH1, { children: "System Health" })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "gap-1", onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Refresh Status"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "gap-1", onClick: () => navigate("/admin/diagnostics"), children: [_jsx(AlertCircle, { className: "h-4 w-4" }), "Run Diagnostics"] }), _jsxs(Button, { variant: "default", size: "sm", className: "gap-1", onClick: () => {
                            const data = {
                                timestamp: new Date().toISOString(),
                                status: "healthy",
                                services: {
                                    database: "operational",
                                    api: "operational",
                                    storage: "operational",
                                },
                            };
                            const blob = new Blob([JSON.stringify(data, null, 2)], {
                                type: "application/json",
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `system-health-report-${new Date().toISOString().split("T")[0]}.json`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }, children: [_jsx(Download, { className: "h-4 w-4" }), "Export Report"] })] })] }));
}
