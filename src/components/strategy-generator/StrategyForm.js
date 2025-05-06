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
import * as z from "zod";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import AlertMessage from "@/components/ui/AlertMessage";
import { Wand2 } from "lucide-react";
const formSchema = z.object({
    industry: z.string().min(1, { message: "Industry is required" }),
    companySize: z.number().min(1, { message: "Company size is required" }),
    revenue: z.number().min(0, { message: "Revenue must be a positive number" }),
    goals: z
        .string()
        .min(10, { message: "Business goals must be at least 10 characters" }),
    riskTolerance: z.number().min(1).max(10),
    timeHorizon: z.string().min(1, { message: "Time horizon is required" }),
    challenges: z.string().optional(),
});
const StrategyForm = ({ children, variant = "default", size = "large", }) => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [strategies, setStrategies] = useState([]);
    const [error, setError] = useState(null);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            industry: (user === null || user === void 0 ? void 0 : user.industry) || "",
            companySize: 5,
            revenue: 0,
            goals: "",
            riskTolerance: 5,
            timeHorizon: "medium",
            challenges: "",
        },
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user) {
            toast.error("You must be logged in to generate strategies");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const { data: strategies, error } = yield generateStrategies(Object.assign(Object.assign({}, data), { userId: user.id, companyId: user.company_id, companyName: user.company }));
            if (error)
                throw new Error(error);
            setStrategies(strategies || []);
            toast.success("Strategies generated successfully!");
        }
        catch (err) {
            setError(err.message || "Failed to generate strategies");
            toast.error("Failed to generate strategies");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Executive Strategy Generator" }) }), _jsx(CardContent, { children: _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormField, { control: form.control, name: "industry", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Industry" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select industry" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "technology", children: "Technology" }), _jsx(SelectItem, { value: "healthcare", children: "Healthcare" }), _jsx(SelectItem, { value: "finance", children: "Finance" }), _jsx(SelectItem, { value: "education", children: "Education" }), _jsx(SelectItem, { value: "retail", children: "Retail" }), _jsx(SelectItem, { value: "manufacturing", children: "Manufacturing" }), _jsx(SelectItem, { value: "services", children: "Services" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "timeHorizon", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Time Horizon" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select time horizon" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "short", children: "Short-term (3-6 months)" }), _jsx(SelectItem, { value: "medium", children: "Medium-term (6-12 months)" }), _jsx(SelectItem, { value: "long", children: "Long-term (1-3 years)" })] })] }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormField, { control: form.control, name: "companySize", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Company Size (Employees)" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "number" }, field, { onChange: (e) => field.onChange(parseInt(e.target.value) || 0) })) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "revenue", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Annual Revenue ($)" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "number" }, field, { onChange: (e) => field.onChange(parseInt(e.target.value) || 0) })) }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "goals", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Business Goals" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Describe your primary business goals and targets...", className: "min-h-[100px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "challenges", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Current Challenges (Optional)" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Describe any current challenges or obstacles...", className: "min-h-[100px]" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "riskTolerance", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Risk Tolerance (1-10)" }), _jsx(FormControl, { children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("span", { children: "Conservative (1)" }), _jsx(Slider, { min: 1, max: 10, step: 1, defaultValue: [field.value], onValueChange: (values) => field.onChange(values[0]), className: "w-full" }), _jsx("span", { children: "Aggressive (10)" })] }) }), _jsx(FormMessage, {})] })) }), error && _jsx(AlertMessage, { description: error }), _jsxs(Button, { type: "submit", disabled: isLoading, className: "w-full", children: [isLoading ? "Generating..." : "Generate Strategies", !isLoading && _jsx(Wand2, { className: "ml-2 h-4 w-4" })] })] }) })) })] }), strategies.length > 0 && _jsx(StrategyResults, { strategies: strategies })] }));
};
function StrategyResults({ strategies }) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Strategic Options" }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: `strategy-0`, children: [_jsx(TabsList, { className: "mb-4", children: strategies.map((strategy, index) => (_jsxs(TabsTrigger, { value: `strategy-${index}`, children: ["Option ", index + 1] }, index))) }), strategies.map((strategy, index) => (_jsxs(TabsContent, { value: `strategy-${index}`, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: strategy.title }), _jsx("p", { className: "text-muted-foreground mt-2", children: strategy.description })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Pros" }), _jsx("ul", { className: "list-disc pl-5 space-y-1", children: strategy.pros.map((pro, i) => (_jsx("li", { children: pro }, i))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Cons" }), _jsx("ul", { className: "list-disc pl-5 space-y-1", children: strategy.cons.map((con, i) => (_jsx("li", { children: con }, i))) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Estimated ROI" }), _jsx("p", { className: "mt-1", children: strategy.estimatedRoi })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Risk Level" }), _jsx("p", { className: "mt-1", children: strategy.riskLevel })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Timeline" }), _jsxs("p", { className: "mt-1", children: [strategy.timelineMonths, " months"] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold", children: "Implementation Steps" }), _jsx("ol", { className: "list-decimal pl-5 space-y-1 mt-2", children: strategy.implementationSteps.map((step, i) => (_jsx("li", { children: step }, i))) })] })] }, index)))] }) })] }));
}
// Fix the supabase client reference
import { supabase } from "@/integrations/supabase/client";
// Function to call the Supabase Edge Function
function generateStrategies(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.functions.invoke("generate-strategies", {
                body: params,
            });
            if (error) {
                throw new Error(error.message);
            }
            return { data, error: null };
        }
        catch (err) {
            console.error("Error generating strategies:", err);
            return {
                data: null,
                error: err.message || "Failed to generate strategies",
            };
        }
    });
}
