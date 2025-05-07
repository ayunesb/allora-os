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
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { File, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
export default function VaultTemplatesPage() {
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const { user } = useAuth();
    useEffect(() => {
        setIsLoading(true);
        function fetchTemplates() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { data, error } = yield supabase.functions.invoke("strategy-templates");
                    if (error) {
                        console.error("Error loading strategy templates:", error);
                        setTemplates([]);
                    }
                    else {
                        // Sort by is_public DESC to show public/featured templates first
                        const sortedData = (data || []).sort((a, b) => {
                            // First sort by public status (public first)
                            if (a.is_public && !b.is_public)
                                return -1;
                            if (!a.is_public && b.is_public)
                                return 1;
                            // Then sort by used_by count
                            return b.used_by - a.used_by;
                        });
                        setTemplates(sortedData);
                    }
                }
                catch (err) {
                    console.error("Failed to fetch strategy templates:", err);
                    setTemplates([]);
                }
                finally {
                    setIsLoading(false);
                }
            });
        }
        fetchTemplates();
    }, []);
    const industries = [...new Set(templates.map((t) => t.industry))];
    const filteredTemplates = selectedIndustry
        ? templates.filter((t) => t.industry === selectedIndustry)
        : templates;
    const handleRemix = (templateId, templateTitle) => __awaiter(this, void 0, void 0, function* () {
        try {
            const tenant_id = (user === null || user === void 0 ? void 0 : user.tenant_id) || (user === null || user === void 0 ? void 0 : user.id); // Fallback to user id if tenant_id is not available
            if (!tenant_id) {
                toast.error("You must be logged in to remix templates");
                return;
            }
            toast.info(`Starting remix of "${templateTitle}"...`);
            const { data, error } = yield supabase.functions.invoke("strategy-remix", {
                body: { template_id: templateId, tenant_id },
            });
            if (error) {
                throw new Error(error.message);
            }
            toast.success(`Successfully remixed "${templateTitle}"`, {
                description: "Template will be added to your strategy board",
            });
        }
        catch (err) {
            console.error("Error remixing template:", err);
            toast.error("Failed to remix template");
        }
    });
    return (_jsxs("div", { className: "container py-8", children: [_jsx(DashboardBreadcrumb, {}), _jsxs("div", { className: "flex items-center gap-2 mb-6", children: [_jsx(File, { className: "h-6 w-6 text-primary" }), _jsx("h1", { className: "text-3xl font-bold", children: "Strategy Vault" })] }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Explore and remix top-performing strategies from across the platform." }), industries.length > 0 && (_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: selectedIndustry === null ? "default" : "outline", size: "sm", onClick: () => setSelectedIndustry(null), children: "All Industries" }), industries.map((industry) => (_jsx(Button, { variant: selectedIndustry === industry ? "default" : "outline", size: "sm", onClick: () => setSelectedIndustry(industry), children: industry }, industry)))] }) })), isLoading ? (_jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => (_jsx(Card, { className: "animate-pulse", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "h-6 w-1/3 bg-muted rounded mb-2" }), _jsx("div", { className: "h-4 w-full bg-muted rounded-sm mb-2" }), _jsx("div", { className: "h-4 w-2/3 bg-muted rounded-sm" })] }) }, i))) })) : filteredTemplates.length > 0 ? (_jsx("ul", { className: "space-y-4", children: filteredTemplates.map((tpl) => (_jsxs(Card, { className: "border border-border hover:border-primary/50 transition-colors relative", children: [tpl.is_public && (_jsxs("div", { className: "absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded-md flex items-center gap-1", children: [_jsx(Star, { className: "h-3 w-3" }), " Public"] })), _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [tpl.is_public && (_jsx("span", { className: "text-xs text-green-500 font-semibold inline-block mb-1", children: "\uD83C\uDF1F Featured" })), _jsx("h2", { className: "font-semibold text-lg", children: tpl.title }), _jsx("p", { className: "text-sm text-muted-foreground", children: tpl.industry }), _jsx("p", { className: "mt-2", children: tpl.summary })] }), _jsxs("div", { className: "ml-4", children: [_jsxs("p", { className: "text-xs text-muted-foreground text-right", children: ["Used by ", tpl.used_by, "+ teams"] }), _jsx(Button, { className: "mt-2 text-xs", size: "sm", onClick: () => handleRemix(tpl.id, tpl.title), children: "Remix \u2192" })] })] }) })] }, tpl.id))) })) : (_jsx(Card, { children: _jsx(CardContent, { className: "p-6 text-center", children: _jsx("p", { className: "text-muted-foreground", children: selectedIndustry
                            ? `No templates found for ${selectedIndustry}`
                            : "No strategy templates available" }) }) }))] }));
}
