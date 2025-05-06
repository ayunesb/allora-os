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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { createCampaign, createCampaignCheckout, } from "@/services/campaignService";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "../ui/label";
import { Facebook } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
// Form schema definition
const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Campaign name must be at least 2 characters" }),
    platform: z.enum(["meta", "tiktok"]),
    budget: z.coerce.number().min(100, { message: "Minimum budget is $100" }),
    targetingAudience: z
        .string()
        .min(5, { message: "Please describe your target audience" }),
    targetingLocation: z
        .string()
        .min(2, { message: "Please specify a location" }),
    adTitle: z
        .string()
        .min(5, { message: "Ad title must be at least 5 characters" }),
    adDescription: z
        .string()
        .min(10, { message: "Ad description must be at least 10 characters" }),
});
export default function CampaignCreateForm() {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [managementFee, setManagementFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            platform: "meta",
            budget: 1000,
            targetingAudience: "",
            targetingLocation: "",
            adTitle: "",
            adDescription: "",
        },
    });
    const watchBudget = form.watch("budget");
    // Calculate management fee and total amount when budget changes
    useState(() => {
        const calculatedFee = Math.round(watchBudget * 0.1);
        setManagementFee(calculatedFee);
        setTotalAmount(watchBudget + calculatedFee);
    });
    const handleNextStep = () => {
        const currentValues = form.getValues();
        // Validate different fields based on current step
        if (step === 1) {
            const result = z
                .object({
                name: formSchema.shape.name,
                platform: formSchema.shape.platform,
                budget: formSchema.shape.budget,
            })
                .safeParse({
                name: currentValues.name,
                platform: currentValues.platform,
                budget: currentValues.budget,
            });
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    form.setError(issue.path[0], {
                        type: "manual",
                        message: issue.message,
                    });
                });
                return;
            }
        }
        else if (step === 2) {
            const result = z
                .object({
                targetingAudience: formSchema.shape.targetingAudience,
                targetingLocation: formSchema.shape.targetingLocation,
            })
                .safeParse({
                targetingAudience: currentValues.targetingAudience,
                targetingLocation: currentValues.targetingLocation,
            });
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    form.setError(issue.path[0], {
                        type: "manual",
                        message: issue.message,
                    });
                });
                return;
            }
        }
        setStep(step + 1);
    };
    const handlePreviousStep = () => {
        setStep(step - 1);
    };
    const onSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
        setIsSubmitting(true);
        try {
            // Create the targeting and creatives objects
            const targeting = {
                audience: values.targetingAudience,
                location: values.targetingLocation,
            };
            const creatives = [
                {
                    title: values.adTitle,
                    description: values.adDescription,
                },
            ];
            // Create the campaign
            const campaignResult = yield createCampaign({
                name: values.name,
                platform: values.platform,
                budget: values.budget,
                targeting,
                creatives,
                company_id: profile === null || profile === void 0 ? void 0 : profile.company_id,
            });
            if (!campaignResult.success) {
                throw new Error(campaignResult.error || "Failed to create campaign");
            }
            const campaignId = campaignResult.campaignId;
            if (!campaignId) {
                throw new Error("No campaign ID returned");
            }
            // Create the checkout session
            const checkoutResult = yield createCampaignCheckout(campaignId, window.location.href);
            if (!checkoutResult.success) {
                throw new Error(checkoutResult.error || "Failed to create checkout");
            }
            // Redirect to Stripe Checkout
            if (checkoutResult.url) {
                window.location.href = checkoutResult.url;
            }
            else {
                throw new Error("No checkout URL returned");
            }
        }
        catch (error) {
            toast.error(`Failed to process campaign: ${error.message}`);
            setIsSubmitting(false);
        }
    });
    const renderFormStep = () => {
        switch (step) {
            case 1:
                return (_jsxs(_Fragment, { children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Campaign Name" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Summer Sale 2025" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "platform", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Ad Platform" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select an ad platform" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "meta", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Facebook, { className: "mr-2 h-4 w-4 text-blue-600" }), "Meta (Facebook/Instagram)"] }) }), _jsx(SelectItem, { value: "tiktok", children: _jsxs("div", { className: "flex items-center", children: [_jsx(TikTokIcon, { className: "mr-2 h-4 w-4" }), "TikTok"] }) })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "budget", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Ad Budget (USD)" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "number", min: "100", step: "100", placeholder: "1000" }, field, { onChange: (e) => {
                                                field.onChange(e);
                                                const value = parseFloat(e.target.value);
                                                if (!isNaN(value)) {
                                                    const fee = Math.round(value * 0.1);
                                                    setManagementFee(fee);
                                                    setTotalAmount(value + fee);
                                                }
                                            } })) }), _jsx(FormDescription, { children: "Minimum budget is $100" }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "bg-muted p-4 rounded-md space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Ad Budget:" }), _jsxs("span", { children: ["$", watchBudget] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Management Fee (10%):" }), _jsxs("span", { children: ["$", managementFee] })] }), _jsxs("div", { className: "flex justify-between font-medium", children: [_jsx("span", { children: "Total Amount:" }), _jsxs("span", { children: ["$", totalAmount] })] })] })] }));
            case 2:
                return (_jsxs(_Fragment, { children: [_jsx(FormField, { control: form.control, name: "targetingAudience", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Target Audience" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "E.g., Males and females, ages 25-45, interested in fitness and nutrition", className: "min-h-[100px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "targetingLocation", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Target Location" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "E.g., United States, Canada" }, field)) }), _jsx(FormMessage, {})] })) })] }));
            case 3:
                return (_jsxs(_Fragment, { children: [_jsx(FormField, { control: form.control, name: "adTitle", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Ad Title" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "E.g., Summer Sale - 50% Off" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "adDescription", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Ad Description" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "E.g., Don't miss our biggest sale of the year! Get 50% off all products until July 31.", className: "min-h-[100px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Campaign Summary" }), _jsx("div", { className: "bg-muted p-4 rounded-md space-y-2 mt-2", children: _jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [_jsx("span", { className: "font-medium", children: "Campaign Name:" }), _jsx("span", { children: form.getValues("name") }), _jsx("span", { className: "font-medium", children: "Platform:" }), _jsx("span", { children: form.getValues("platform") === "meta"
                                                            ? "Meta (Facebook/Instagram)"
                                                            : "TikTok" }), _jsx("span", { className: "font-medium", children: "Budget:" }), _jsxs("span", { children: ["$", form.getValues("budget")] }), _jsx("span", { className: "font-medium", children: "Management Fee:" }), _jsxs("span", { children: ["$", managementFee] }), _jsx("span", { className: "font-medium col-span-2 pt-2", children: "Location:" }), _jsx("span", { className: "col-span-2", children: form.getValues("targetingLocation") }), _jsx("span", { className: "font-medium col-span-2 pt-2", children: "Target Audience:" }), _jsx("span", { className: "col-span-2", children: form.getValues("targetingAudience") })] }) })] }), _jsx("div", { className: "bg-primary/10 p-4 rounded-md", children: _jsxs("p", { className: "text-sm", children: ["By clicking \"Create Campaign & Checkout\", you agree to pay the total amount of ", _jsxs("strong", { children: ["$", totalAmount] }), " which includes your ad budget ($", form.getValues("budget"), ") and the 10% management fee ($", managementFee, ")."] }) })] })] }));
            default:
                return null;
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-2xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Create New Ad Campaign" }), _jsxs(CardDescription, { children: [step === 1 && "Set up your campaign basics and budget", step === 2 && "Define your target audience", step === 3 && "Create your ad content and review"] })] }), _jsx(CardContent, { children: _jsx(Form, Object.assign({}, form, { children: _jsx("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: renderFormStep() }) })) }), _jsxs(CardFooter, { className: "flex justify-between", children: [step > 1 && (_jsx(Button, { type: "button", variant: "outline", onClick: handlePreviousStep, disabled: isSubmitting, children: "Previous" })), _jsx("div", { className: "ml-auto", children: step < 3 ? (_jsx(Button, { type: "button", onClick: handleNextStep, disabled: isSubmitting, children: "Next" })) : (_jsx(Button, { type: "submit", onClick: form.handleSubmit(onSubmit), disabled: isSubmitting, children: isSubmitting ? "Processing..." : "Create Campaign & Checkout" })) })] })] }));
}
