import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
export default function AlertMessage({ title = "Something went wrong", description, variant = "destructive", }) {
    return (_jsxs(Alert, { variant: variant, className: "mt-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: title }), _jsx(AlertDescription, { children: description })] }));
}
