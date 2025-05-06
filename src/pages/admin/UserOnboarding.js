import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function UserOnboarding() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "User Onboarding" }), _jsx(CardDescription, { children: "Configure the onboarding process for new users" })] }), _jsx(CardContent, { children: _jsx("p", { children: "User onboarding configuration content will be displayed here." }) })] }) }));
}
