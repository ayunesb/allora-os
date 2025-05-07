import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { DatabaseTablesCheck, RlsPoliciesCheck, DatabaseFunctionsCheck, } from "@/components/admin/database-verification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
export default function DatabaseVerificationPage() {
    const [activeTab, setActiveTab] = useState("tables");
    // Initialize with loading state
    const [verificationData, setVerificationData] = useState({
        tables: [],
        policies: [],
        functions: [],
        isVerifying: false,
    });
    const [verificationStatus, setVerificationStatus] = useState({
        tables: "idle",
        functions: "idle",
        policies: "idle",
    });
    const runVerification = () => {
        setVerificationData((prev) => (Object.assign(Object.assign({}, prev), { isVerifying: true })));
        // Simulate API call to get verification data
        setTimeout(() => {
            setVerificationData({
                tables: [
                    {
                        name: "profiles",
                        exists: true,
                        hasRLS: true,
                        status: "success",
                        message: "Table exists and has proper structure",
                    },
                    {
                        name: "companies",
                        exists: true,
                        hasRLS: true,
                        status: "success",
                        message: "Table exists and has proper structure",
                    },
                    {
                        name: "strategies",
                        exists: true,
                        hasRLS: true,
                        status: "success",
                        message: "Table exists and has proper structure",
                    },
                ],
                policies: [
                    {
                        table: "profiles",
                        name: "auth_policy",
                        exists: true,
                        isSecure: true,
                        status: "success",
                        message: "RLS policies are configured correctly",
                    },
                    {
                        table: "companies",
                        name: "auth_policy",
                        exists: true,
                        isSecure: true,
                        status: "success",
                        message: "RLS policies are configured correctly",
                    },
                    {
                        table: "strategies",
                        name: "auth_policy",
                        exists: true,
                        isSecure: true,
                        status: "success",
                        message: "RLS policies are configured correctly",
                    },
                ],
                functions: [
                    {
                        name: "handle_new_user",
                        exists: true,
                        isSecure: true,
                        status: "success",
                        message: "Function exists and is secure",
                    },
                    {
                        name: "get_user_companies",
                        exists: true,
                        isSecure: true,
                        status: "success",
                        message: "Function exists and is secure",
                    },
                ],
                isVerifying: false,
            });
            setVerificationStatus({
                tables: "success",
                functions: "success",
                policies: "success",
            });
        }, 1500);
    };
    useEffect(() => {
        runVerification();
    }, []);
    // Derived status counts
    const tableSuccessCount = verificationData.tables.filter((t) => t.exists).length;
    const policySuccessCount = verificationData.policies.filter((p) => p.exists).length;
    const functionSuccessCount = verificationData.functions.filter((f) => f.exists && f.isSecure).length;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Database Verification" }), _jsx("p", { className: "text-muted-foreground", children: "Verify your database structure, RLS policies, and functions" })] }), _jsxs(Button, { onClick: runVerification, disabled: verificationData.isVerifying, variant: "outline", children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${verificationData.isVerifying ? "animate-spin" : ""}` }), verificationData.isVerifying ? "Verifying..." : "Run Verification"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-lg", children: "Tables" }), _jsxs(Badge, { variant: verificationStatus.tables === "success"
                                                ? "success"
                                                : "secondary", children: [tableSuccessCount, "/", verificationData.tables.length] })] }) }), _jsx(CardContent, { children: verificationData.isVerifying ? (_jsx("div", { className: "flex justify-center py-4", children: _jsx(RefreshCw, { className: "animate-spin h-8 w-8 text-primary/70" }) })) : (_jsxs("div", { className: "flex items-center gap-2", children: [verificationStatus.tables === "success" ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500" })), _jsx("span", { children: verificationStatus.tables === "success"
                                                ? "All tables verified successfully"
                                                : "Table verification incomplete" })] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-lg", children: "RLS Policies" }), _jsxs(Badge, { variant: verificationStatus.policies === "success"
                                                ? "success"
                                                : "secondary", children: [policySuccessCount, "/", verificationData.policies.length] })] }) }), _jsx(CardContent, { children: verificationData.isVerifying ? (_jsx("div", { className: "flex justify-center py-4", children: _jsx(RefreshCw, { className: "animate-spin h-8 w-8 text-primary/70" }) })) : (_jsxs("div", { className: "flex items-center gap-2", children: [verificationStatus.policies === "success" ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500" })), _jsx("span", { children: verificationStatus.policies === "success"
                                                ? "All RLS policies configured properly"
                                                : "RLS policy verification incomplete" })] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-lg", children: "Functions" }), _jsxs(Badge, { variant: verificationStatus.functions === "success"
                                                ? "success"
                                                : "secondary", children: [functionSuccessCount, "/", verificationData.functions.length] })] }) }), _jsx(CardContent, { children: verificationData.isVerifying ? (_jsx("div", { className: "flex justify-center py-4", children: _jsx(RefreshCw, { className: "animate-spin h-8 w-8 text-primary/70" }) })) : (_jsxs("div", { className: "flex items-center gap-2", children: [verificationStatus.functions === "success" ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(AlertCircle, { className: "h-5 w-5 text-amber-500" })), _jsx("span", { children: verificationStatus.functions === "success"
                                                ? "All functions verified successfully"
                                                : "Function verification incomplete" })] })) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(Tabs, { value: activeTab, onValueChange: setActiveTab, children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "tables", children: "Tables" }), _jsx(TabsTrigger, { value: "policies", children: "RLS Policies" }), _jsx(TabsTrigger, { value: "functions", children: "Functions" })] }) }) }), _jsxs(CardContent, { children: [_jsx(TabsContent, { value: "tables", className: "mt-0", children: _jsx(DatabaseTablesCheck, { tables: verificationData.tables }) }), _jsx(TabsContent, { value: "policies", className: "mt-0", children: _jsx(RlsPoliciesCheck, { policies: verificationData.policies }) }), _jsx(TabsContent, { value: "functions", className: "mt-0", children: _jsx(DatabaseFunctionsCheck, { functions: verificationData.functions }) })] })] })] }));
}
