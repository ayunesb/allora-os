import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
const campaignSchema = z.object({
    name: z.string().min(3, "Campaign name must be at least 3 characters"),
    description: z.string().optional(),
    platform: z.enum(["meta", "tiktok", "email", "whatsapp", "Google"]),
    budget: z.coerce.number().min(1, "Budget must be greater than 0"),
    goal: z.string().optional(),
    audience: z.string().optional(),
    adCopy: z.string().optional(),
});
export function CampaignWizard({ onSubmit, initialValues }) {
    const [activeTab, setActiveTab] = useState("details");
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            name: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.name) || "",
            description: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.description) || "",
            platform: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.platform) || "meta",
            budget: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.budget) || 1000,
            goal: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.goal) || "",
            audience: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.audience) || "",
            adCopy: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.adCopy) || "",
        },
    });
    const handleSubmit = (values) => {
        try {
            onSubmit(Object.assign(Object.assign({}, values), { status: "draft", createdAt: new Date().toISOString() }));
            toast({
                title: "Campaign created",
                description: "Your campaign has been created successfully.",
            });
        }
        catch (error) {
            console.error("Error creating campaign:", error);
            toast({
                title: "Error",
                description: "There was an error creating your campaign.",
                variant: "destructive",
            });
        }
    };
    const handlePlatformChange = (newPlatform) => {
        form.setValue("platform", newPlatform);
    };
    const goToNextTab = () => {
        if (activeTab === "details") {
            setActiveTab("audience");
        }
        else if (activeTab === "audience") {
            setActiveTab("creative");
        }
    };
    const goToPreviousTab = () => {
        if (activeTab === "creative") {
            setActiveTab("audience");
        }
        else if (activeTab === "audience") {
            setActiveTab("details");
        }
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create New Campaign" }) }), _jsx(Form, Object.assign({}, form, { children: _jsx("form", { onSubmit: form.handleSubmit(handleSubmit), children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "details", children: "Campaign Details" }), _jsx(TabsTrigger, { value: "audience", children: "Target Audience" }), _jsx(TabsTrigger, { value: "creative", children: "Creative" })] }), _jsxs(CardContent, { className: "pt-6", children: [_jsxs(TabsContent, { value: "details", className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Campaign Name" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Summer Sale 2023" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Brief description of your campaign" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "platform", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Platform" }), _jsxs(Select, { onValueChange: (value) => handlePlatformChange(value), defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select platform" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "meta", children: "Meta (Facebook/Instagram)" }), _jsx(SelectItem, { value: "tiktok", children: "TikTok" }), _jsx(SelectItem, { value: "email", children: "Email" }), _jsx(SelectItem, { value: "whatsapp", children: "WhatsApp" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "budget", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Budget ($)" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "number", min: "1", step: "1" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsxs(TabsContent, { value: "audience", className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "audience", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Target Audience" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Describe your target audience", className: "min-h-[150px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "goal", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Campaign Goal" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "What do you want to achieve with this campaign?" }, field)) }), _jsx(FormMessage, {})] })) })] }), _jsx(TabsContent, { value: "creative", className: "space-y-4", children: _jsx(FormField, { control: form.control, name: "adCopy", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Ad Copy" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Enter your ad copy here", className: "min-h-[200px]" }, field)) }), _jsx(FormMessage, {})] })) }) })] }), _jsxs(CardFooter, { className: "flex justify-between", children: [activeTab !== "details" ? (_jsx(Button, { type: "button", variant: "outline", onClick: goToPreviousTab, children: "Previous" })) : (_jsx("div", {})), activeTab !== "creative" ? (_jsx(Button, { type: "button", onClick: goToNextTab, children: "Next" })) : (_jsx(Button, { type: "submit", children: "Create Campaign" }))] })] }) }) }))] }));
}
export default CampaignWizard;
