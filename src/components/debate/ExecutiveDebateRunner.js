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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { runDebateSession } from "@/agents/debate/debateSession";
import { toast } from "sonner";
import { Loader2, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
export default function ExecutiveDebateRunner() {
    const [task, setTask] = useState("");
    const [riskAppetite, setRiskAppetite] = useState("medium");
    const [businessPriority, setBusinessPriority] = useState("growth");
    const [isLoading, setIsLoading] = useState(false);
    const [debateResult, setDebateResult] = useState(null);
    const runDebate = () => __awaiter(this, void 0, void 0, function* () {
        if (!task) {
            toast.error("Please enter a task to debate");
            return;
        }
        setIsLoading(true);
        try {
            const result = yield runDebateSession(task, riskAppetite, businessPriority);
            setDebateResult(result);
            toast.success("Executive debate completed");
        }
        catch (error) {
            console.error("Error running debate:", error);
            toast.error("Failed to run executive debate");
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Executive Debate" }), _jsx(CardDescription, { children: "Have your AI executive team debate a strategic decision" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "task", children: "Task or Decision to Debate" }), _jsx(Textarea, { id: "task", placeholder: "e.g., Launch a new product line in Q3", value: task, onChange: (e) => setTask(e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "risk-appetite", children: "Risk Appetite" }), _jsxs(Select, { value: riskAppetite, onValueChange: setRiskAppetite, children: [_jsx(SelectTrigger, { id: "risk-appetite", children: _jsx(SelectValue, { placeholder: "Select risk appetite" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "low", children: "Low Risk" }), _jsx(SelectItem, { value: "medium", children: "Medium Risk" }), _jsx(SelectItem, { value: "high", children: "High Risk" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "business-priority", children: "Business Priority" }), _jsxs(Select, { value: businessPriority, onValueChange: setBusinessPriority, children: [_jsx(SelectTrigger, { id: "business-priority", children: _jsx(SelectValue, { placeholder: "Select priority" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "growth", children: "Growth" }), _jsx(SelectItem, { value: "profit", children: "Profit" }), _jsx(SelectItem, { value: "innovation", children: "Innovation" }), _jsx(SelectItem, { value: "stability", children: "Stability" })] })] })] })] })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: runDebate, disabled: isLoading || !task, className: "w-full", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Running Debate..."] })) : ("Run Executive Debate") }) })] }), debateResult && (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center justify-between", children: ["Debate Results", debateResult.summary.majority === "For" ? (_jsxs("div", { className: "flex items-center text-green-500", children: [_jsx(ThumbsUp, { className: "h-5 w-5 mr-1" }), _jsx("span", { children: "Approved" })] })) : debateResult.summary.majority === "Against" ? (_jsxs("div", { className: "flex items-center text-red-500", children: [_jsx(ThumbsDown, { className: "h-5 w-5 mr-1" }), _jsx("span", { children: "Rejected" })] })) : (_jsxs("div", { className: "flex items-center text-yellow-500", children: [_jsx(AlertTriangle, { className: "h-5 w-5 mr-1" }), _jsx("span", { children: "Tie" })] }))] }), _jsxs(CardDescription, { children: ["Task: ", debateResult.task] })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap gap-2 justify-center", children: [_jsxs("div", { className: "bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: debateResult.summary.totalExecutives }), _jsx("div", { className: "text-sm", children: "Executives" })] }), _jsxs("div", { className: "bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: debateResult.summary.forVotes }), _jsx("div", { className: "text-sm", children: "For" })] }), _jsxs("div", { className: "bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: debateResult.summary.againstVotes }), _jsx("div", { className: "text-sm", children: "Against" })] }), _jsxs("div", { className: "bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold", children: `${(debateResult.summary.confidenceScore * 100).toFixed()}%` }), _jsx("div", { className: "text-sm", children: "Confidence" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: "Top Risks" }), _jsx("ul", { className: "list-disc list-inside space-y-1", children: debateResult.summary.topRisks.map((risk, i) => (_jsx("li", { className: "text-sm", children: risk }, i))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: "Top Opportunities" }), _jsx("ul", { className: "list-disc list-inside space-y-1", children: debateResult.summary.topOpportunities.map((opp, i) => (_jsx("li", { className: "text-sm", children: opp }, i))) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium", children: "Executive Opinions" }), debateResult.debates.map((debate, i) => (_jsxs("div", { className: "border rounded-lg p-3 bg-muted/20", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsxs("div", { className: "font-medium", children: [debate.executiveName, " (", debate.role, ")"] }), _jsx("div", { className: `px-2 py-0.5 rounded text-xs font-medium ${debate.stance === "For"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                            : debate.stance === "Against"
                                                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"}`, children: debate.stance })] }), _jsx("div", { className: "text-sm max-h-20 overflow-y-auto", children: debate.opinion.split("\n").map((line, i) => line.trim() ? (_jsx("p", { className: "mb-1", children: line }, i)) : null) })] }, i)))] })] })] }))] }));
}
