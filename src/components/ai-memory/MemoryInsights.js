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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { useAiMemory } from "@/hooks/useAiMemory";
import { Button } from "@/components/ui/button";
import { Database, Brain, BarChart, TrendingUp, Zap, ThumbsUp, ThumbsDown, } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAiModelPreferences } from "@/hooks/useAiModelPreferences";
export default function MemoryInsights() {
    const { getLearningInsights, recentMemories } = useAiMemory();
    const { user } = useAuth();
    const { preferences } = useAiModelPreferences();
    const [insights, setInsights] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchInsights = () => __awaiter(this, void 0, void 0, function* () {
        if (!user)
            return;
        setIsLoading(true);
        try {
            const data = yield getLearningInsights();
            setInsights(data);
        }
        catch (error) {
            console.error("Error fetching learning insights:", error);
        }
        finally {
            setIsLoading(false);
        }
    });
    useEffect(() => {
        fetchInsights();
    }, [user]);
    if (!user)
        return null;
    // Calculate learning effectiveness if data is available
    const learningEffectiveness = insights
        ? Math.min(100, Math.round((insights.positiveInteractions /
            (insights.positiveInteractions + insights.negativeInteractions ||
                1)) *
            100))
        : 0;
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [_jsx(Brain, { className: "h-4 w-4" }), "AI Memory Insights"] }), _jsx(CardDescription, { children: "How the AI system is learning from your interactions" })] }), (preferences === null || preferences === void 0 ? void 0 : preferences.enableLearning) ? (_jsxs(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), "Learning Active"] })) : (_jsx(Badge, { variant: "outline", className: "bg-amber-50 text-amber-700 border-amber-200", children: "Learning Disabled" }))] }) }), _jsx(CardContent, { className: "space-y-4", children: isLoading ? (_jsxs("div", { className: "space-y-3", children: [_jsx(Skeleton, { className: "h-20 w-full" }), _jsx(Skeleton, { className: "h-16 w-full" }), _jsx(Skeleton, { className: "h-16 w-full" })] })) : insights ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium mb-1", children: [_jsx(BarChart, { className: "h-4 w-4 text-blue-500" }), "Total Interactions"] }), _jsx("div", { className: "text-2xl font-bold", children: insights.positiveInteractions +
                                                insights.negativeInteractions || 0 })] }), _jsxs("div", { className: "p-3 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium mb-1", children: [_jsx(TrendingUp, { className: "h-4 w-4 text-green-500" }), "Learning Effectiveness"] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("span", { className: "text-xl font-bold", children: [learningEffectiveness, "%"] }), _jsx(Progress, { value: learningEffectiveness, className: "h-2" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "p-3 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium mb-1", children: [_jsx(ThumbsUp, { className: "h-4 w-4 text-green-500" }), "Positive Feedback"] }), _jsx("div", { className: "text-xl font-bold text-green-600", children: insights.positiveInteractions || 0 })] }), _jsxs("div", { className: "p-3 border rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium mb-1", children: [_jsx(ThumbsDown, { className: "h-4 w-4 text-red-500" }), "Areas for Improvement"] }), _jsx("div", { className: "text-xl font-bold text-red-600", children: insights.negativeInteractions || 0 })] })] }), insights.topTopics && insights.topTopics.length > 0 && (_jsxs("div", { className: "p-3 border rounded-md", children: [_jsx("div", { className: "text-sm font-medium mb-2", children: "Top Learning Topics" }), _jsx("div", { className: "flex flex-wrap gap-2", children: insights.topTopics.map((topic, i) => (_jsx(Badge, { variant: "secondary", className: "bg-blue-50 text-blue-700", children: topic }, i))) })] })), insights.positiveTopic && (_jsxs("div", { className: "p-3 border rounded-md bg-green-50", children: [_jsx("div", { className: "text-sm font-medium mb-1 text-green-700", children: "Strongest Knowledge Area" }), _jsx("div", { className: "text-base text-green-800", children: insights.positiveTopic })] })), insights.negativeTopic && (_jsxs("div", { className: "p-3 border rounded-md bg-amber-50", children: [_jsx("div", { className: "text-sm font-medium mb-1 text-amber-700", children: "Focus Area for Improvement" }), _jsx("div", { className: "text-base text-amber-800", children: insights.negativeTopic })] }))] })) : (_jsx("div", { className: "text-center py-3 text-muted-foreground", children: "No learning insights available yet. Continue interacting with the AI advisors to generate insights." })) }), _jsxs(CardFooter, { children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: fetchInsights, disabled: isLoading, className: "mr-2", children: [_jsx(Database, { className: "h-4 w-4 mr-2" }), "Refresh Insights"] }), _jsxs(Button, { variant: "outline", size: "sm", disabled: isLoading || !(preferences === null || preferences === void 0 ? void 0 : preferences.enableLearning), onClick: () => window.open("/dashboard/ai-settings", "_self"), children: [_jsx(Brain, { className: "h-4 w-4 mr-2" }), "Manage Learning"] })] })] }));
}
