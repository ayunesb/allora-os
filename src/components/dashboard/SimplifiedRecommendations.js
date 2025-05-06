import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Lightbulb, ThumbsUp, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimplifiedCard } from "@/components/ui/SimplifiedCard";
import { useToast } from "@/hooks/use-toast";
export default function SimplifiedRecommendations({ recommendations = [], onApprove, isLoading = false, error = null, onRetry, }) {
    const { toast } = useToast();
    const handleApprove = (index) => {
        toast({
            title: "Recommendation approved",
            description: "The AI recommendation will be implemented.",
        });
        onApprove(index);
    };
    const getImpactIcon = (impact) => {
        switch (impact) {
            case "high":
                return (_jsx("span", { className: "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium", children: "High Impact" }));
            case "medium":
                return (_jsx("span", { className: "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium", children: "Medium Impact" }));
            case "low":
                return (_jsx("span", { className: "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium", children: "Low Impact" }));
            default:
                return null;
        }
    };
    return (_jsx(SimplifiedCard, { title: "AI Business Recommendations", description: "Simple, actionable insights to help your business grow", icon: _jsx(Sparkles, { className: "h-5 w-5 text-purple-500" }), isLoading: isLoading, error: error, onRetry: onRetry, variant: "default", className: "border-purple-200", contentClassName: "space-y-4", children: recommendations.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Lightbulb, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3" }), _jsx("p", { className: "text-muted-foreground", children: "No recommendations available at the moment." }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Check back later or update your business profile to get personalized suggestions." })] })) : (_jsx("div", { className: "space-y-4", children: recommendations.map((recommendation, index) => (_jsxs("div", { className: "bg-background border rounded-lg p-4 flex flex-col gap-3", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "font-medium text-lg", children: recommendation.title }), getImpactIcon(recommendation.impact)] }), _jsx("p", { className: "text-muted-foreground", children: recommendation.description }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx(User, { className: "h-3 w-3 mr-1" }), _jsx("span", { children: recommendation.category })] }), _jsxs(Button, { size: "sm", onClick: () => handleApprove(index), className: "flex items-center gap-1", children: [_jsx(ThumbsUp, { className: "h-4 w-4" }), _jsx("span", { children: "Approve" }), _jsx(ArrowRight, { className: "h-3 w-3 ml-1" })] })] })] }, recommendation.id))) })) }));
}
