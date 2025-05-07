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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, } from "lucide-react";
import { toast } from "sonner";
const TONE_OPTIONS = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "authoritative", label: "Authoritative" },
    { value: "persuasive", label: "Persuasive" },
    { value: "humorous", label: "Humorous" },
];
export function AIContentGenerator() {
    const [activeTab, setActiveTab] = useState("adCopy");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generations, setGenerations] = useState([]);
    // Form state
    const [contentRequest, setContentRequest] = useState({
        contentType: "adCopy",
        toneOption: "professional",
        industry: "",
        targetAudience: "",
        keyPoints: "",
        length: 150,
        isCreative: true,
    });
    const handleInputChange = (field, value) => {
        setContentRequest((prev) => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    const handleGenerate = () => __awaiter(this, void 0, void 0, function* () {
        setIsGenerating(true);
        // Simulate API call for now
        try {
            // This would be replaced with a real API call to an AI service
            yield new Promise((resolve) => setTimeout(resolve, 2000));
            const newContent = {
                id: Date.now().toString(),
                content: generateSampleContent(contentRequest),
            };
            setGenerations([newContent, ...generations]);
            toast.success("Content generated successfully!");
        }
        catch (error) {
            toast.error("Failed to generate content. Please try again.");
            console.error("Error generating content:", error);
        }
        finally {
            setIsGenerating(false);
        }
    });
    const handleCopy = (content) => {
        navigator.clipboard
            .writeText(content)
            .then(() => toast.success("Copied to clipboard!"))
            .catch(() => toast.error("Failed to copy content"));
    };
    const handleFeedback = (id, feedback) => {
        setGenerations((prev) => prev.map((item) => (item.id === id ? Object.assign(Object.assign({}, item), { feedback }) : item)));
        // In a real implementation, you'd send this feedback to your backend
        toast.success(`Feedback recorded. Thank you!`);
    };
    const handleTabChange = (value) => {
        setActiveTab(value);
        setContentRequest((prev) => (Object.assign(Object.assign({}, prev), { contentType: value })));
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-5 w-5 text-primary" }), "AI Content Generator"] }), _jsx(CardDescription, { children: "Create marketing content with AI assistance" })] }), _jsxs(CardContent, { children: [_jsxs(Tabs, { value: activeTab, onValueChange: handleTabChange, children: [_jsxs(TabsList, { className: "grid grid-cols-5 mb-4", children: [_jsx(TabsTrigger, { value: "adCopy", children: "Ad Copy" }), _jsx(TabsTrigger, { value: "emailTemplate", children: "Email" }), _jsx(TabsTrigger, { value: "socialPost", children: "Social Posts" }), _jsx(TabsTrigger, { value: "productDescription", children: "Product Desc" }), _jsx(TabsTrigger, { value: "landingPage", children: "Landing Page" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "industry", children: "Industry" }), _jsx(Input, { id: "industry", placeholder: "e.g. Technology, Healthcare", value: contentRequest.industry, onChange: (e) => handleInputChange("industry", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tone", children: "Tone of Voice" }), _jsxs(Select, { value: contentRequest.toneOption, onValueChange: (value) => handleInputChange("toneOption", value), children: [_jsx(SelectTrigger, { id: "tone", children: _jsx(SelectValue, { placeholder: "Select tone" }) }), _jsx(SelectContent, { children: TONE_OPTIONS.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "targetAudience", children: "Target Audience" }), _jsx(Input, { id: "targetAudience", placeholder: "e.g. Professionals aged 25-45, Small business owners", value: contentRequest.targetAudience, onChange: (e) => handleInputChange("targetAudience", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "keyPoints", children: "Key Points to Include" }), _jsx(Textarea, { id: "keyPoints", placeholder: "Enter key messages, product features, or specific points to highlight", className: "min-h-[100px]", value: contentRequest.keyPoints, onChange: (e) => handleInputChange("keyPoints", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(Label, { htmlFor: "length", children: "Content Length (words)" }), _jsx("span", { className: "text-sm text-muted-foreground", children: contentRequest.length })] }), _jsx(Slider, { id: "length", min: 50, max: 500, step: 25, value: [contentRequest.length], onValueChange: (value) => handleInputChange("length", value[0]) })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "creative", checked: contentRequest.isCreative, onCheckedChange: (checked) => handleInputChange("isCreative", checked) }), _jsx(Label, { htmlFor: "creative", children: "Use creative language and metaphors" })] })] })] }), _jsx(Button, { className: "w-full mt-6", onClick: handleGenerate, disabled: isGenerating, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), "Generate Content"] })) })] }), generations.length > 0 && (_jsxs(CardFooter, { className: "flex flex-col border-t pt-6", children: [_jsx("h3", { className: "text-sm font-medium mb-4", children: "Generated Content" }), _jsxs("div", { className: "space-y-4 w-full", children: [generations.map((item) => (_jsx(Card, { className: "w-full", children: _jsxs(CardContent, { className: "pt-4", children: [_jsx("div", { className: "whitespace-pre-wrap text-sm mb-4", children: item.content }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleFeedback(item.id, "positive"), className: item.feedback === "positive" ? "bg-primary/10" : "", children: [_jsx(ThumbsUp, { className: "h-4 w-4 mr-1" }), "Like"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleFeedback(item.id, "negative"), className: item.feedback === "negative" ? "bg-primary/10" : "", children: [_jsx(ThumbsDown, { className: "h-4 w-4 mr-1" }), "Improve"] })] }), _jsx("div", { className: "space-x-2", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleCopy(item.content), children: [_jsx(Copy, { className: "h-4 w-4 mr-1" }), "Copy"] }) })] })] }) }, item.id))), generations.length > 1 && (_jsxs(Button, { variant: "ghost", className: "mt-2", onClick: () => setGenerations([]), children: [_jsx(RotateCcw, { className: "h-4 w-4 mr-1" }), "Clear All"] }))] })] }))] }));
}
// Helper function to generate sample content (would be replaced with AI API call)
function generateSampleContent(request) {
    const contentTypes = {
        adCopy: `Introducing our revolutionary solution for ${request.industry} professionals!

Are you a ${request.targetAudience} looking to improve your results? Our product delivers exceptional performance with industry-leading features.

${request.keyPoints}

Act now and experience the difference!`,
        emailTemplate: `Subject: Special Offer for ${request.targetAudience}

Hello [Customer Name],

We hope this email finds you well. As a valued customer in the ${request.industry} industry, we wanted to share some exciting news with you.

${request.keyPoints}

Best regards,
[Your Company] Team`,
        socialPost: `📣 Attention ${request.targetAudience}! 

Looking to solve your biggest challenges in the ${request.industry} space?

${request.keyPoints}

Click the link in our bio to learn more!
#IndustryTrends #Solution #Innovation`,
        productDescription: `Our premium solution for ${request.industry} professionals delivers unmatched performance and value.

Designed specifically for ${request.targetAudience}, this product addresses your most pressing needs with innovative features.

Key Benefits:
${request.keyPoints}

Available now with special introductory pricing.`,
        landingPage: `# Transform Your ${request.industry} Business

## The Ultimate Solution for ${request.targetAudience}

Are you facing challenges with efficiency, costs, or performance? Our comprehensive platform is designed to help you excel.

### Why Choose Us
${request.keyPoints}

### Ready to get started?
Book a demo today or start your free trial!`,
    };
    return contentTypes[request.contentType];
}
export default AIContentGenerator;
