import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stars, Award, BarChart3 } from "lucide-react";
import FeatureBlock from "@/components/home/FeatureBlock";
import { useBreakpoint } from "@/hooks/use-mobile";
// Feature data
const features = [
    {
        emoji: "🚀",
        title: "AI Strategy Generation",
        description: "Get personalized business strategies created by our AI executive team.",
        icon: _jsx(Stars, { className: "h-6 w-6 text-primary" }),
    },
    {
        emoji: "💼",
        title: "Virtual Executive Team",
        description: "Access the expertise of AI personas modeled after top executives.",
        icon: _jsx(Award, { className: "h-6 w-6 text-primary" }),
    },
    {
        emoji: "📊",
        title: "Lead Management",
        description: "Track and nurture leads with our AI-powered CRM tools.",
        icon: _jsx(BarChart3, { className: "h-6 w-6 text-primary" }),
    },
];
const Features = () => {
    const breakpoint = useBreakpoint();
    return (_jsxs("div", { className: "container mx-auto px-4 py-12 md:py-24", children: [_jsx("h2", { className: "text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center", children: "Powerful AI Business Tools" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto", children: features.map((feature, index) => (_jsx(FeatureBlock, { emoji: feature.emoji, title: feature.title, description: feature.description, icon: feature.icon, delay: index * 0.2 }, index))) })] }));
};
export default Features;
