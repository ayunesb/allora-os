var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
import { Building2, Users, Cog, Shapes } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useCompanyManagement } from "@/hooks/admin/useCompanyManagement";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";
import { BrandIdentityForm } from "@/components/onboarding/BrandIdentityForm";
export default function CompanySettings() {
    const { companies, isLoading, loadCompanies, updateCompany } = useCompanyManagement();
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const [companyDetails, setCompanyDetails] = useState({
        primaryColor: "#4F46E5",
        secondaryColor: "#10B981",
        brandTone: "friendly",
        logoUrl: "",
    });
    const form = useForm({
        defaultValues: {
            name: "",
            industry: "",
            description: "",
            mission: "",
            vision: "",
            headquarters: "",
            phone: "",
        },
    });
    useEffect(() => {
        loadCompanies();
    }, [loadCompanies]);
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (companies && companies.length > 0) {
            const company = companies[0];
            form.reset({
                name: company.name || "",
                industry: company.industry || "",
                description: ((_a = company.details) === null || _a === void 0 ? void 0 : _a.description) || "",
                mission: ((_b = company.details) === null || _b === void 0 ? void 0 : _b.mission) || "",
                vision: ((_c = company.details) === null || _c === void 0 ? void 0 : _c.vision) || "",
                headquarters: ((_d = company.details) === null || _d === void 0 ? void 0 : _d.headquarters) || "",
                phone: ((_e = company.details) === null || _e === void 0 ? void 0 : _e.phone) || "",
            });
            // Load branding details if available
            if (company.details) {
                setCompanyDetails({
                    primaryColor: company.details.primaryColor || "#4F46E5",
                    secondaryColor: company.details.secondaryColor || "#10B981",
                    brandTone: company.details.brandTone || "friendly",
                    logoUrl: company.details.logoUrl || "",
                });
            }
        }
    }, [companies, form]);
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        if (!companies || companies.length === 0) {
            toast.error("No company found to update");
            return;
        }
        setIsSaving(true);
        try {
            const companyId = companies[0].id;
            const updatedData = {
                name: data.name,
                industry: data.industry,
                details: Object.assign({ description: data.description, mission: data.mission, vision: data.vision, headquarters: data.headquarters, phone: data.phone }, (companies[0].details || {})),
            };
            yield updateCompany(companyId, updatedData);
            toast.success("Company settings updated successfully");
        }
        catch (error) {
            console.error("Error updating company:", error);
            toast.error("Failed to update company settings");
        }
        finally {
            setIsSaving(false);
        }
    });
    const updateBrandingDetails = (details) => {
        if (!companies || companies.length === 0) {
            toast.error("No company found to update");
            return;
        }
        setIsSaving(true);
        const companyId = companies[0].id;
        // Update the state
        setCompanyDetails(Object.assign(Object.assign({}, companyDetails), details));
        // Update the company in the database
        updateCompany(companyId, {
            details: Object.assign(Object.assign({}, companies[0].details), details),
        })
            .then(() => {
            toast.success("Brand identity updated successfully");
        })
            .catch((error) => {
            console.error("Error updating brand identity:", error);
            toast.error("Failed to update brand identity");
        })
            .finally(() => {
            setIsSaving(false);
        });
    };
    const industries = [
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "Manufacturing",
        "Retail",
        "Media",
        "Transportation",
        "Energy",
        "Consulting",
        "Other",
    ];
    // Explicitly type 'field' parameter
    const renderField = (field) => (_jsxs("div", { children: [_jsx("label", { children: field.label }), _jsx("input", { value: field.value })] }));
    // Ensure 'children' is used correctly and define CustomComponent properly
    const CustomComponent = ({ children, }) => _jsx("div", { children: children });
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Company Settings | Allora AI" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Company Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Manage company-wide settings and configurations." })] }), _jsxs(Tabs, { defaultValue: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: `grid w-full ${isMobileView ? "grid-cols-2" : "grid-cols-4"}`, children: [_jsxs(TabsTrigger, { value: "general", children: [_jsx(Building2, { className: "h-4 w-4 mr-2" }), _jsx("span", { children: "General" })] }), _jsxs(TabsTrigger, { value: "branding", children: [_jsx(Shapes, { className: "h-4 w-4 mr-2" }), _jsx("span", { children: "Branding" })] }), _jsxs(TabsTrigger, { value: "team", children: [_jsx(Users, { className: "h-4 w-4 mr-2" }), _jsx("span", { children: "Team" })] }), _jsxs(TabsTrigger, { value: "preferences", children: [_jsx(Cog, { className: "h-4 w-4 mr-2" }), _jsx("span", { children: "Preferences" })] })] }), _jsx(TabsContent, { value: "general", className: "space-y-4 mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Building2, { className: "h-5 w-5 mr-2" }), "Company Information"] }), _jsx(CardDescription, { children: "Update your company's basic information and profile" })] }), _jsx(CardContent, { children: _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Company Name" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Enter company name" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "industry", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Industry" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, value: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select industry" }) }) }), _jsx(SelectContent, { children: industries.map((industry) => (_jsx(SelectItem, { value: industry, children: industry }, industry))) })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "headquarters", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Headquarters" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Enter headquarters location" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "phone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Contact Phone" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Enter contact phone" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Company Description" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Enter a description of your company", className: "min-h-[120px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "mission", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Mission Statement" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Enter your company's mission", className: "min-h-[100px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "vision", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Vision Statement" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Enter your company's vision", className: "min-h-[100px]" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => form.reset(), disabled: isSaving, children: "Reset" }), _jsx(Button, { type: "submit", disabled: isSaving, children: isSaving ? "Saving..." : "Save Changes" })] })] }) })) })] }) }), _jsx(TabsContent, { value: "branding", className: "space-y-4 mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Shapes, { className: "h-5 w-5 mr-2" }), "Brand Identity"] }), _jsx(CardDescription, { children: "Configure your company's branding elements and visual identity" })] }), _jsx(CardContent, { children: _jsx(BrandIdentityForm, { companyDetails: companyDetails, updateCompanyDetails: updateBrandingDetails }) }), _jsx(CardFooter, { className: "flex justify-end", children: _jsx(Button, { variant: "outline", className: "mr-2", onClick: () => setCompanyDetails({
                                                    primaryColor: "#4F46E5",
                                                    secondaryColor: "#10B981",
                                                    brandTone: "friendly",
                                                    logoUrl: "",
                                                }), disabled: isSaving, children: "Reset" }) })] }) }), _jsx(TabsContent, { value: "team", className: "space-y-4 mt-6", children: _jsxs(Card, { className: "p-6", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Users, { className: "h-5 w-5 mr-2" }), "Team Management"] }), _jsx(CardDescription, { children: "Manage your company team and departments" })] }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20", children: _jsx("p", { className: "text-center text-muted-foreground", children: "Team management settings will be implemented in a future update" }) }) })] }) }), _jsx(TabsContent, { value: "preferences", className: "space-y-4 mt-6", children: _jsxs(Card, { className: "p-6", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Cog, { className: "h-5 w-5 mr-2" }), "System Preferences"] }), _jsx(CardDescription, { children: "Configure system-wide preferences for your company" })] }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20", children: _jsx("p", { className: "text-center text-muted-foreground", children: "System preference settings will be implemented in a future update" }) }) })] }) })] })] })] }));
}
