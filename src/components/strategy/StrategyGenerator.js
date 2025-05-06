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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { AlertCircle, BarChart2, CheckCircle, ChevronRight, Clock, DollarSign, TrendingUp, } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/integrations/supabase/client";
// Define the schema for the form
const formSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    industry: z.string().min(1, "Industry is required"),
    companySize: z.string().min(1, "Company size is required"),
    revenue: z.string().min(1, "Annual revenue is required"),
    goals: z.string().min(10, "Business goals must be at least 10 characters"),
    riskTolerance: z.string().min(1, "Risk tolerance is required"),
    timeHorizon: z.string().min(1, "Time horizon is required"),
    challenges: z.string().optional(),
});
export function StrategyGenerator() {
    const { user } = useUser();
    const [strategies, setStrategies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState("strategy-1");
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: (user === null || user === void 0 ? void 0 : user.company) || "",
            industry: (user === null || user === void 0 ? void 0 : user.industry) || "",
            companySize: "",
            revenue: "",
            goals: "",
            riskTolerance: "5",
            timeHorizon: "Medium term (6-12 months)",
            challenges: "",
        },
    });
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const { data: strategiesData, error: strategiesError } = yield supabase.functions.invoke("generate-strategies", {
                body: Object.assign(Object.assign({}, data), { userId: user === null || user === void 0 ? void 0 : user.id, companyId: user === null || user === void 0 ? void 0 : user.company_id }),
            });
            if (strategiesError) {
                throw new Error(strategiesError.message);
            }
            setStrategies(strategiesData);
            toast.success("Strategies generated successfully!");
            setSelectedTab("strategy-1");
        }
        catch (err) {
            setError(err.message || "Failed to generate strategies");
            toast.error("Strategy generation failed. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    });
    const getRiskColor = (risk) => {
        switch (risk) {
            case "Low":
                return "bg-green-100 text-green-800";
            case "Medium":
                return "bg-yellow-100 text-yellow-800";
            case "High":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsxs("div", { className: "space-y-6 p-4 md:p-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Executive Strategy Generator" }), _jsx("p", { className: "text-muted-foreground", children: "Generate custom business strategies powered by AI based on your company profile and goals." })] }), !strategies ? (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Business Strategy Input" }), _jsx(CardDescription, { children: "Fill in the details below to generate tailored strategies for your business" })] }), _jsx(CardContent, { children: _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormField, { control: form.control, name: "companyName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Company Name" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Your Company" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "industry", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Industry" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select your industry" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Software & Technology", children: "Software & Technology" }), _jsx(SelectItem, { value: "E-commerce & Retail", children: "E-commerce & Retail" }), _jsx(SelectItem, { value: "Healthcare", children: "Healthcare" }), _jsx(SelectItem, { value: "Finance & Insurance", children: "Finance & Insurance" }), _jsx(SelectItem, { value: "Education & EdTech", children: "Education & EdTech" }), _jsx(SelectItem, { value: "Manufacturing", children: "Manufacturing" }), _jsx(SelectItem, { value: "Media & Entertainment", children: "Media & Entertainment" }), _jsx(SelectItem, { value: "Food & Beverage", children: "Food & Beverage" }), _jsx(SelectItem, { value: "Professional Services", children: "Professional Services" }), _jsx(SelectItem, { value: "Real Estate", children: "Real Estate" }), _jsx(SelectItem, { value: "Transportation & Logistics", children: "Transportation & Logistics" }), _jsx(SelectItem, { value: "Energy & Utilities", children: "Energy & Utilities" }), _jsx(SelectItem, { value: "Travel & Hospitality", children: "Travel & Hospitality" }), _jsx(SelectItem, { value: "Agriculture", children: "Agriculture" }), _jsx(SelectItem, { value: "Non-profit", children: "Non-profit" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "companySize", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Company Size" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Number of employees" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1-10", children: "1-10 employees" }), _jsx(SelectItem, { value: "11-50", children: "11-50 employees" }), _jsx(SelectItem, { value: "51-200", children: "51-200 employees" }), _jsx(SelectItem, { value: "201-500", children: "201-500 employees" }), _jsx(SelectItem, { value: "501-1000", children: "501-1000 employees" }), _jsx(SelectItem, { value: "1000+", children: "1000+ employees" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "revenue", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Annual Revenue" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select your annual revenue" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Pre-revenue", children: "Pre-revenue" }), _jsx(SelectItem, { value: "Under $100K", children: "Under $100K" }), _jsx(SelectItem, { value: "$100K - $500K", children: "$100K - $500K" }), _jsx(SelectItem, { value: "$500K - $1M", children: "$500K - $1M" }), _jsx(SelectItem, { value: "$1M - $5M", children: "$1M - $5M" }), _jsx(SelectItem, { value: "$5M - $10M", children: "$5M - $10M" }), _jsx(SelectItem, { value: "$10M - $50M", children: "$10M - $50M" }), _jsx(SelectItem, { value: "$50M+", children: "$50M+" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "timeHorizon", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Time Horizon" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select time horizon" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Short term (3-6 months)", children: "Short term (3-6 months)" }), _jsx(SelectItem, { value: "Medium term (6-12 months)", children: "Medium term (6-12 months)" }), _jsx(SelectItem, { value: "Long term (1-3 years)", children: "Long term (1-3 years)" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "riskTolerance", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Risk Tolerance (1-10)" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { className: "text-sm", children: "Low" }), _jsx(FormControl, { children: _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select risk level" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1", children: "1 - Very Conservative" }), _jsx(SelectItem, { value: "2", children: "2" }), _jsx(SelectItem, { value: "3", children: "3" }), _jsx(SelectItem, { value: "4", children: "4" }), _jsx(SelectItem, { value: "5", children: "5 - Moderate" }), _jsx(SelectItem, { value: "6", children: "6" }), _jsx(SelectItem, { value: "7", children: "7" }), _jsx(SelectItem, { value: "8", children: "8" }), _jsx(SelectItem, { value: "9", children: "9" }), _jsx(SelectItem, { value: "10", children: "10 - Very Aggressive" })] })] }) }), _jsx("span", { className: "text-sm", children: "High" })] }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "goals", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Business Goals" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Describe your primary business goals and what you want to achieve...", className: "min-h-[80px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "challenges", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Current Challenges (Optional)" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Describe any obstacles or challenges you're facing...", className: "min-h-[80px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Generating..." : "Generate Strategies" }) }), error && (_jsxs("div", { className: "p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), _jsx("span", { children: error })] }))] }) })) })] })) : (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-bold", children: "Generated Strategies" }), _jsx(Button, { variant: "outline", onClick: () => setStrategies(null), children: "Create New Strategies" })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "strategy-1", children: "Strategy 1" }), _jsx(TabsTrigger, { value: "strategy-2", children: "Strategy 2" }), _jsx(TabsTrigger, { value: "strategy-3", children: "Strategy 3" })] }), strategies.map((strategy, index) => (_jsx(TabsContent, { value: `strategy-${index + 1}`, className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-xl", children: strategy.title }), _jsxs(Badge, { className: getRiskColor(strategy.riskLevel), children: [strategy.riskLevel, " Risk"] })] }), _jsx(CardDescription, { className: "text-md", children: strategy.description })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" }), "Advantages"] }), _jsx("ul", { className: "list-disc list-inside text-sm space-y-1", children: strategy.pros.map((pro, idx) => (_jsx("li", { children: pro }, idx))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500" }), "Challenges"] }), _jsx("ul", { className: "list-disc list-inside text-sm space-y-1", children: strategy.cons.map((con, idx) => (_jsx("li", { children: con }, idx))) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "p-4", children: _jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(DollarSign, { className: "h-4 w-4 text-green-500" }), "Estimated ROI"] }) }), _jsx(CardContent, { className: "p-4 pt-0", children: _jsx("p", { className: "text-sm", children: strategy.estimatedROI }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "p-4", children: _jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4 text-blue-500" }), "Timeline"] }) }), _jsx(CardContent, { className: "p-4 pt-0", children: _jsx("p", { className: "text-sm", children: strategy.timeline }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "p-4", children: _jsxs(CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [_jsx(BarChart2, { className: "h-4 w-4 text-purple-500" }), "Implementation Complexity"] }) }), _jsx(CardContent, { className: "p-4 pt-0", children: _jsx("p", { className: "text-sm", children: strategy.riskLevel === "Low"
                                                                            ? "Simple"
                                                                            : strategy.riskLevel === "Medium"
                                                                                ? "Moderate"
                                                                                : "Complex" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-blue-500" }), "Implementation Plan"] }), _jsx("ol", { className: "list-decimal list-inside text-sm space-y-2", children: strategy.implementationSteps.map((step, idx) => (_jsx("li", { className: "pl-2", children: step }, idx))) })] })] }), _jsx(CardFooter, { className: "border-t pt-4", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Save Strategy" }), _jsxs(Button, { variant: "default", size: "sm", children: ["Implement Now", _jsx(ChevronRight, { className: "ml-1 h-4 w-4" })] })] }) })] }) }, index)))] })] })), isLoading && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Skeleton, { className: "h-8 w-48" }), _jsx(Skeleton, { className: "h-8 w-36" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full" }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(Skeleton, { className: "h-8 w-3/4" }), _jsx(Skeleton, { className: "h-6 w-full" }), _jsx(Skeleton, { className: "h-6 w-5/6" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-6 w-24" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsx(Skeleton, { className: "h-4 w-4/5" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-6 w-24" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsx(Skeleton, { className: "h-4 w-4/5" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-6 w-40" }), _jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsx(Skeleton, { className: "h-4 w-4/5" })] })] })] })] })] }))] }));
}
