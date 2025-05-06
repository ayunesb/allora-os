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
import { fetchApi } from "@/utils/api/apiClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import AdminOnly from "@/components/AdminOnly";
import { Badge } from "@/components/ui/badge";
export default function PublishStrategyTemplates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publishingId, setPublishingId] = useState(null);
    const loadTemplates = () => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        try {
            const data = yield fetchApi("/api/vault/templates/drafts");
            setTemplates(data || []);
        }
        catch (error) {
            console.error("Error loading templates:", error);
            toast.error("Failed to load strategy templates");
        }
        finally {
            setLoading(false);
        }
    });
    const handlePublish = (id) => __awaiter(this, void 0, void 0, function* () {
        setPublishingId(id);
        try {
            yield fetchApi(`/api/vault/templates/publish?id=${id}`, {
                method: "POST",
            });
            toast.success("Strategy template published successfully");
            loadTemplates();
        }
        catch (error) {
            console.error("Error publishing template:", error);
            toast.error("Failed to publish strategy template");
        }
        finally {
            setPublishingId(null);
        }
    });
    useEffect(() => {
        loadTemplates();
    }, []);
    return (_jsx(AdminOnly, { children: _jsxs("div", { className: "container py-8", children: [_jsx(DashboardBreadcrumb, {}), _jsxs("div", { className: "flex items-center justify-between gap-2 mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "\uD83D\uDE80 Publish Strategy Templates" }), _jsx("p", { className: "text-muted-foreground", children: "Review and publish tenant-created strategies to the public Vault." })] }), _jsx(Button, { onClick: loadTemplates, disabled: loading, children: loading ? "Loading..." : "Refresh" })] }), loading ? (_jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => (_jsx(Card, { className: "animate-pulse", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "h-6 w-1/3 bg-muted rounded mb-2" }), _jsx("div", { className: "h-4 w-full bg-muted rounded-sm mb-2" }), _jsx("div", { className: "h-4 w-2/3 bg-muted rounded-sm" })] }) }, i))) })) : templates.length > 0 ? (_jsx("ul", { className: "space-y-4", children: templates.map((tpl) => (_jsx(Card, { className: `border ${tpl.is_public ? "border-green-500/30" : "border-border"}`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h2", { className: "font-semibold text-lg", children: tpl.title }), tpl.is_public && (_jsx(Badge, { variant: "success", className: "text-xs", children: "Published" }))] }), _jsx("p", { className: "text-sm text-muted-foreground", children: tpl.industry }), _jsx("p", { className: "mt-2", children: tpl.summary })] }), _jsxs("div", { className: "ml-4", children: [_jsxs("p", { className: "text-xs text-muted-foreground text-right mb-2", children: ["Created: ", new Date(tpl.created_at).toLocaleDateString()] }), _jsxs("p", { className: "text-xs text-muted-foreground text-right", children: ["Used by ", tpl.used_by || 0, " teams"] }), !tpl.is_public && (_jsx(Button, { className: "mt-2 w-full", size: "sm", onClick: () => handlePublish(tpl.id), disabled: publishingId === tpl.id, children: publishingId === tpl.id
                                                    ? "Publishing..."
                                                    : "📢 Publish" }))] })] }) }) }, tpl.id))) })) : (_jsx(Card, { children: _jsx(CardContent, { className: "p-6 text-center", children: _jsx("p", { className: "text-muted-foreground", children: "No strategy templates found to review" }) }) }))] }) }));
}
