import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function Home() {
    return (_jsx("div", { className: "min-h-screen", children: _jsxs("div", { className: "container mx-auto px-4 py-24 flex flex-col items-center text-center", children: [_jsx("h1", { className: "text-4xl md:text-6xl font-bold tracking-tight", children: "Allora AI" }), _jsx("p", { className: "mt-6 text-xl text-muted-foreground max-w-2xl", children: "AI-powered executive advisory platform to help businesses make strategic decisions and develop growth strategies." }), _jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-4", children: [_jsx(Button, { asChild: true, size: "lg", children: _jsx(Link, { to: "/signup", children: "Get Started" }) }), _jsx(Button, { variant: "outline", size: "lg", asChild: true, children: _jsx(Link, { to: "/features", children: "Learn More" }) })] })] }) }));
}
