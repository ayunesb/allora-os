import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, } from "@/components/ui/card";
export default function SettingsSection({ title, description, icon, children, }) {
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [icon && _jsx("div", { children: icon }), _jsxs("div", { children: [_jsx(CardTitle, { children: title }), description && _jsx(CardDescription, { children: description })] })] }) }), _jsx(CardContent, { children: children })] }));
}
