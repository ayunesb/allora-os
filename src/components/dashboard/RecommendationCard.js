import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, AlertTriangle, TrendingUp, } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
const RecommendationCard = ({ recommendation, onImplement, onDismiss }) => {
    const { toast } = useToast();
    const handleImplement = () => {
        if (onImplement) {
            onImplement(recommendation.id);
            toast({
                title: "Recommendation implemented",
                description: "The recommended action has been implemented successfully.",
                action: (_jsx(Button, { variant: "outline", size: "sm", children: "Undo" })),
            });
        }
    };
    const handleDismiss = () => {
        if (onDismiss) {
            onDismiss(recommendation.id);
            toast({
                title: "Recommendation dismissed",
                description: "The recommendation has been dismissed.",
            });
        }
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case "high":
                return "text-red-500 bg-red-50 dark:bg-red-900/20";
            case "medium":
                return "text-amber-500 bg-amber-50 dark:bg-amber-900/20";
            case "low":
                return "text-green-500 bg-green-50 dark:bg-green-900/20";
            default:
                return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case "strategy":
                return _jsx(TrendingUp, { className: "h-5 w-5" });
            case "marketing":
                return _jsx(AlertTriangle, { className: "h-5 w-5" });
            case "sales":
                return _jsx(ArrowRight, { className: "h-5 w-5" });
            case "operations":
                return _jsx(CheckCircle, { className: "h-5 w-5" });
            default:
                return _jsx(TrendingUp, { className: "h-5 w-5" });
        }
    };
    return (_jsxs(Card, { className: "overflow-hidden transition-all hover:shadow-md", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: `p-1.5 rounded-full ${getImpactColor(recommendation.impact)}`, children: getCategoryIcon(recommendation.category) }), _jsx(CardTitle, { className: "text-lg", children: recommendation.title })] }), recommendation.isImplemented && (_jsx("span", { className: "text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full font-medium", children: "Implemented" }))] }), _jsxs(CardDescription, { children: [recommendation.aiGenerated && (_jsx("span", { className: "text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full mr-2", children: "AI Generated" })), _jsx("span", { className: "text-xs capitalize", children: recommendation.category })] })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm", children: recommendation.description }) }), !recommendation.isImplemented && (_jsxs(CardFooter, { className: "flex justify-between pt-2 border-t", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: handleDismiss, children: "Dismiss" }), _jsx(Button, { variant: "default", size: "sm", onClick: handleImplement, children: "Implement" })] }))] }));
};
export default RecommendationCard;
