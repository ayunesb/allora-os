import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Zap, BarChart3 } from "lucide-react";
const CaseStudy = ({ title, industry, challenge, solution, results }) => {
    return (_jsxs(Card, { className: "h-full flex flex-col", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "flex justify-between items-start mb-2", children: _jsx(Badge, { variant: "outline", className: "px-2 py-0.5 bg-primary/10 text-primary font-normal text-xs", children: industry }) }), _jsx(CardTitle, { className: "text-xl", children: title })] }), _jsxs(CardContent, { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "space-y-4 flex-1", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Challenge:" }), _jsx("p", { className: "text-sm", children: challenge })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Solution:" }), _jsx("p", { className: "text-sm", children: solution })] })] }), _jsxs("div", { className: "mt-6 pt-4 border-t", children: [_jsx("p", { className: "text-sm font-medium mb-3", children: "Results:" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: results.map((result, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(result.icon, { className: "h-4 w-4 text-primary" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium", children: result.value }), _jsx("p", { className: "text-xs text-muted-foreground", children: result.label })] })] }, index))) })] })] })] }));
};
const OutcomeShowcase = () => {
    const caseStudies = [
        {
            title: "SaaS Startup Accelerated Growth",
            industry: "Software",
            challenge: "Early-stage SaaS startup struggling with low conversion rates and unclear market positioning.",
            solution: "AI executive team identified ideal customer profile and created targeted marketing strategy with optimized pricing model.",
            results: [
                { icon: TrendingUp, label: "Revenue Growth", value: "+156%" },
                { icon: BarChart3, label: "Conversion Rate", value: "+43%" },
                { icon: Clock, label: "Time to Market", value: "-65%" },
                { icon: Zap, label: "Customer Acq. Cost", value: "-38%" },
            ],
        },
        {
            title: "Retail Brand Expansion",
            industry: "E-commerce",
            challenge: "Mid-market retailer facing increasing competition and plateauing growth in primary market.",
            solution: "AI identified new market segments and created targeted expansion strategy with optimized logistics plan.",
            results: [
                { icon: TrendingUp, label: "Market Share", value: "+12%" },
                { icon: BarChart3, label: "New Markets", value: "3" },
                { icon: Clock, label: "Strategy Dev. Time", value: "5 days" },
                { icon: Zap, label: "Implementation", value: "8 weeks" },
            ],
        },
        {
            title: "Professional Services Transformation",
            industry: "Consulting",
            challenge: "Established consulting firm facing declining margins and difficulty adapting to changing client needs.",
            solution: "AI executive debate resulted in strategic pivot to specialized service offerings with value-based pricing.",
            results: [
                { icon: TrendingUp, label: "Profit Margin", value: "+22%" },
                { icon: BarChart3, label: "Client Retention", value: "95%" },
                { icon: Clock, label: "Decision Time", value: "-78%" },
                { icon: Zap, label: "Team Utilization", value: "+31%" },
            ],
        },
    ];
    return (_jsx("div", { className: "bg-gradient-to-b from-background to-primary/5 py-12 md:py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Real Results, Real Businesses" }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "See how businesses like yours achieved measurable growth with Allora AI's executive advisory platform." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: caseStudies.map((study, index) => (_jsx(CaseStudy, Object.assign({}, study), index))) })] }) }));
};
export default OutcomeShowcase;
