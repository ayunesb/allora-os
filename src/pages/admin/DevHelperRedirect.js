import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Shield, Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AdminCheckHandler } from "@/components/auth/AdminCheckHandler";
const DevHelperRedirect = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    // Define hasInitialized based on user presence
    const hasInitialized = user !== undefined;
    return (_jsx("div", { className: "container mx-auto py-10", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-5 w-5 text-primary" }), "Admin Verification"] }), _jsx(CardDescription, { children: "Verifying your admin access level..." })] }), _jsx(CardContent, { children: _jsx(AdminCheckHandler, { user: user, roleRequired: "admin", adminOnly: true, hasInitialized: hasInitialized, children: (isUserAdmin, adminCheckDone) => (_jsx("div", { className: "space-y-4", children: !adminCheckDone ? (_jsxs("div", { className: "flex items-center justify-center py-6", children: [_jsx(Loader, { className: "h-8 w-8 animate-spin text-primary" }), _jsx("span", { className: "ml-2 text-muted-foreground", children: "Verifying admin access..." })] })) : isUserAdmin ? (_jsxs("div", { className: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Shield, { className: "h-5 w-5 mr-2" }), _jsx("h3", { className: "font-medium", children: "Admin Access Verified" })] }), _jsx("p", { className: "mt-1 text-sm", children: "You have admin access to the system." })] })) : (_jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Shield, { className: "h-5 w-5 mr-2" }), _jsx("h3", { className: "font-medium", children: "Admin Access Required" })] }), _jsx("p", { className: "mt-1 text-sm", children: "You do not have the required admin privileges." })] })) })) }) }), _jsxs(CardFooter, { className: "flex flex-col gap-2", children: [_jsx(Button, { onClick: () => navigate("/dev-admin-helper"), className: "w-full", children: "Go to Admin Helper" }), _jsx(Button, { variant: "outline", onClick: () => navigate("/"), className: "w-full", children: "Return to Dashboard" })] })] }) }) }));
};
export default DevHelperRedirect;
