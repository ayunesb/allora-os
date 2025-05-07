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
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageTitle } from "@/components/ui/page-title";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Medal, Award, TrendingUp, Brain, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
const SomeComponent = ({ children, }) => {
    return _jsx("div", { children: children });
};
export default function ExecutiveLeaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        function fetchLeaderboardData() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    setLoading(true);
                    const { data, error } = yield supabase
                        .from("executive_decisions")
                        .select("executive_name, executive_role, priority, risk_assessment");
                    if (error) {
                        throw error;
                    }
                    // Process the data to create leaderboard entries
                    const executiveMap = new Map();
                    data.forEach((decision) => {
                        const name = decision.executive_name;
                        const riskValue = decision.risk_assessment
                            ? parseFloat(decision.risk_assessment)
                            : 0;
                        // Calculate priority score: High = 3, Medium = 2, Low = 1
                        let priorityValue = 0;
                        if (decision.priority === "high")
                            priorityValue = 3;
                        else if (decision.priority === "medium")
                            priorityValue = 2;
                        else if (decision.priority === "low")
                            priorityValue = 1;
                        if (!executiveMap.has(name)) {
                            executiveMap.set(name, {
                                name,
                                role: decision.executive_role,
                                decisions: 1,
                                totalRisk: riskValue,
                                priorityTotal: priorityValue,
                            });
                        }
                        else {
                            const entry = executiveMap.get(name);
                            entry.decisions += 1;
                            entry.totalRisk += riskValue;
                            entry.priorityTotal += priorityValue;
                        }
                    });
                    // Convert map to array and calculate averages
                    const leaderboardData = Array.from(executiveMap.entries()).map(([_, value]) => ({
                        executiveName: value.name,
                        executiveRole: value.role,
                        decisionCount: value.decisions,
                        averageRisk: value.decisions > 0 ? value.totalRisk / value.decisions : 0,
                        priorityScore: value.decisions > 0 ? value.priorityTotal / value.decisions : 0,
                    }));
                    setLeaderboard(leaderboardData);
                    setError(null);
                }
                catch (err) {
                    console.error("Failed to load leaderboard data:", err);
                    setError("Could not load leaderboard data. Please try again later.");
                }
                finally {
                    setLoading(false);
                }
            });
        }
        fetchLeaderboardData();
    }, []);
    // Render a medal based on position
    const getMedal = (position) => {
        switch (position) {
            case 0:
                return _jsx(Medal, { className: "h-5 w-5 text-yellow-500" });
            case 1:
                return _jsx(Medal, { className: "h-5 w-5 text-gray-400" });
            case 2:
                return _jsx(Medal, { className: "h-5 w-5 text-amber-700" });
            default:
                return null;
        }
    };
    // Function to get color based on risk score
    const getRiskColor = (score) => {
        if (score >= 4)
            return "text-red-500";
        if (score >= 3)
            return "text-orange-500";
        if (score >= 2)
            return "text-yellow-500";
        return "text-green-500";
    };
    // Function to get color based on priority score
    const getPriorityColor = (score) => {
        if (score >= 2.5)
            return "text-purple-500";
        if (score >= 1.5)
            return "text-blue-500";
        return "text-gray-500";
    };
    if (loading) {
        return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsx(PageTitle, { title: "Executive Leaderboard", description: "Top performing AI executives by decisions, risk, and priorities" }), _jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsx(PageTitle, { title: "Executive Leaderboard", description: "Top performing AI executives by decisions, risk, and priorities" }), _jsx(Card, { className: "p-6 bg-red-50 border border-red-200 text-red-800", children: _jsx("p", { children: error }) })] }));
    }
    // Sort leaderboards by different metrics
    const byDecisions = [...leaderboard].sort((a, b) => b.decisionCount - a.decisionCount);
    const byRisk = [...leaderboard].sort((a, b) => b.averageRisk - a.averageRisk);
    const byPriority = [...leaderboard].sort((a, b) => b.priorityScore - a.priorityScore);
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx(PageTitle, { title: "Executive Leaderboard", description: "Performance metrics for your AI executive team", children: "Executive Leaderboard" }), _jsxs(Tabs, { defaultValue: "decisions", className: "w-full mb-8", children: [_jsxs(TabsList, { className: "mb-6", children: [_jsxs(TabsTrigger, { value: "decisions", children: [_jsx(Brain, { className: "mr-2 h-4 w-4" }), " Most Decisions"] }), _jsxs(TabsTrigger, { value: "risk", children: [_jsx(ShieldAlert, { className: "mr-2 h-4 w-4" }), " Risk Takers"] }), _jsxs(TabsTrigger, { value: "priority", children: [_jsx(TrendingUp, { className: "mr-2 h-4 w-4" }), " Priority Focused"] })] }), _jsx(TabsContent, { value: "decisions", children: _jsx(Card, { className: "p-0 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Rank" }), _jsx(TableHead, { children: "Executive" }), _jsx(TableHead, { className: "text-right", children: "Decisions Made" }), _jsx(TableHead, { className: "text-right", children: "Avg. Risk Score" }), _jsx(TableHead, { className: "text-right", children: "Avg. Priority" })] }) }), _jsx(TableBody, { children: byDecisions.map((entry, index) => (_jsxs(TableRow, { className: index < 3 ? "bg-muted/20" : "", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center", children: [getMedal(index), _jsxs("span", { className: "ml-2", children: ["#", index + 1] })] }) }), _jsxs(TableCell, { children: [_jsx(Link, { to: `/dashboard/executives/${encodeURIComponent(entry.executiveName)}`, className: "hover:underline hover:text-primary font-medium", children: entry.executiveName }), _jsx("div", { className: "text-xs text-muted-foreground", children: entry.executiveRole })] }), _jsx(TableCell, { className: "text-right font-bold", children: entry.decisionCount }), _jsx(TableCell, { className: `text-right ${getRiskColor(entry.averageRisk)}`, children: entry.averageRisk.toFixed(1) }), _jsx(TableCell, { className: `text-right ${getPriorityColor(entry.priorityScore)}`, children: entry.priorityScore.toFixed(1) })] }, entry.executiveName))) })] }) }) }), _jsx(TabsContent, { value: "risk", children: _jsx(Card, { className: "p-0 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Rank" }), _jsx(TableHead, { children: "Executive" }), _jsx(TableHead, { className: "text-right", children: "Avg. Risk Score" }), _jsx(TableHead, { className: "text-right", children: "Decisions Made" }), _jsx(TableHead, { className: "text-right", children: "Avg. Priority" })] }) }), _jsx(TableBody, { children: byRisk.map((entry, index) => (_jsxs(TableRow, { className: index < 3 ? "bg-muted/20" : "", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center", children: [getMedal(index), _jsxs("span", { className: "ml-2", children: ["#", index + 1] })] }) }), _jsxs(TableCell, { children: [_jsx(Link, { to: `/dashboard/executives/${encodeURIComponent(entry.executiveName)}`, className: "hover:underline hover:text-primary font-medium", children: entry.executiveName }), _jsx("div", { className: "text-xs text-muted-foreground", children: entry.executiveRole })] }), _jsx(TableCell, { className: `text-right font-bold ${getRiskColor(entry.averageRisk)}`, children: entry.averageRisk.toFixed(1) }), _jsx(TableCell, { className: "text-right", children: entry.decisionCount }), _jsx(TableCell, { className: `text-right ${getPriorityColor(entry.priorityScore)}`, children: entry.priorityScore.toFixed(1) })] }, entry.executiveName))) })] }) }) }), _jsx(TabsContent, { value: "priority", children: _jsx(Card, { className: "p-0 overflow-hidden", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Rank" }), _jsx(TableHead, { children: "Executive" }), _jsx(TableHead, { className: "text-right", children: "Avg. Priority" }), _jsx(TableHead, { className: "text-right", children: "Decisions Made" }), _jsx(TableHead, { className: "text-right", children: "Avg. Risk Score" })] }) }), _jsx(TableBody, { children: byPriority.map((entry, index) => (_jsxs(TableRow, { className: index < 3 ? "bg-muted/20" : "", children: [_jsx(TableCell, { className: "font-medium", children: _jsxs("div", { className: "flex items-center", children: [getMedal(index), _jsxs("span", { className: "ml-2", children: ["#", index + 1] })] }) }), _jsxs(TableCell, { children: [_jsx(Link, { to: `/dashboard/executives/${encodeURIComponent(entry.executiveName)}`, className: "hover:underline hover:text-primary font-medium", children: entry.executiveName }), _jsx("div", { className: "text-xs text-muted-foreground", children: entry.executiveRole })] }), _jsx(TableCell, { className: `text-right font-bold ${getPriorityColor(entry.priorityScore)}`, children: entry.priorityScore.toFixed(1) }), _jsx(TableCell, { className: "text-right", children: entry.decisionCount }), _jsx(TableCell, { className: `text-right ${getRiskColor(entry.averageRisk)}`, children: entry.averageRisk.toFixed(1) })] }, entry.executiveName))) })] }) }) })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Award, { className: "h-5 w-5 text-primary" }), _jsx("h2", { className: "text-xl font-semibold", children: "Executive Leadership Stats" })] }), _jsx("p", { className: "text-muted-foreground mb-4", children: "View performance metrics for your AI executive team. The leadership board ranks executives based on decision volume, risk tolerance, and priority levels." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-6", children: [_jsxs("div", { className: "bg-muted/30 p-4 rounded-lg", children: [_jsxs("h3", { className: "font-medium flex items-center", children: [_jsx(Brain, { className: "h-4 w-4 mr-2 text-blue-500" }), " Decision Score"] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Total number of decisions made by each executive" })] }), _jsxs("div", { className: "bg-muted/30 p-4 rounded-lg", children: [_jsxs("h3", { className: "font-medium flex items-center", children: [_jsx(ShieldAlert, { className: "h-4 w-4 mr-2 text-orange-500" }), " Risk Score"] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Average risk level of decisions (higher = more risky)" })] }), _jsxs("div", { className: "bg-muted/30 p-4 rounded-lg", children: [_jsxs("h3", { className: "font-medium flex items-center", children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-2 text-purple-500" }), " Priority Score"] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Average priority level (High = 3, Medium = 2, Low = 1)" })] })] })] })] }));
}
