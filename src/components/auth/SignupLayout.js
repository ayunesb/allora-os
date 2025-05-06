import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { RocketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SignupLayout({ children }) {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(RocketIcon, { className: "h-6 w-6 text-primary" }), _jsx("span", { className: "text-xl font-bold", children: "Allora AI" })] }), _jsx("div", { children: _jsx(Button, { variant: "ghost", onClick: () => navigate("/login"), children: "Login" }) })] }), _jsx("div", { className: "flex-1 container max-w-4xl mx-auto px-4 py-12 flex items-center justify-center", children: children })] }));
}
