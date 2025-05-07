import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { DatabaseVerificationDashboard } from "@/components/admin/database-verification";
import { useDatabaseVerification } from "@/hooks/admin/useDatabaseVerification";
export default function DatabaseVerification() {
    const { verificationResult, verifyDatabaseConfiguration } = useDatabaseVerification();
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Database Verification" }), _jsx(CardDescription, { children: "Verify and manage your database configuration for Allora AI" })] }), _jsx(CardContent, { children: _jsx(DatabaseVerificationDashboard, { result: verificationResult, onVerify: verifyDatabaseConfiguration }) })] }) }));
}
