import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { VerificationContent } from "./launch-verification/VerificationContent";
import { VerificationActions } from "./launch-verification/VerificationActions";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useVerification } from "@/hooks/admin/useVerification";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export default function LaunchVerification() {
    var _a;
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const companyId = ((_a = auth.user) === null || _a === void 0 ? void 0 : _a.company_id) || null;
    const { isChecking, results, isReady, isAddingDemo, isVerifyingTables, isCheckingIndexes, isVerifyingRLS, isVerifyingFunctions, runChecks, handleAddDemoData, verifyRequiredTables, checkDatabaseIndexes, verifyRLSPolicies, verifyDatabaseFunctions, } = useVerification(companyId);
    return (_jsx(ErrorBoundary, { children: _jsxs(Card, { className: "border-border/50 shadow-sm", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center justify-between", children: ["Launch Readiness Verification", isReady === true && (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })), isReady === false && (_jsx(AlertCircle, { className: "h-5 w-5 text-red-500" }))] }), _jsx(CardDescription, { children: "Verify that all critical systems are working correctly before launch" })] }), _jsx(CardContent, { children: _jsx(VerificationContent, { results: results, isChecking: isChecking }) }), _jsx(CardFooter, { children: _jsx(VerificationActions, { isChecking: isChecking, isAddingDemo: isAddingDemo, isVerifyingTables: isVerifyingTables, isCheckingIndexes: isCheckingIndexes, isVerifyingRLS: isVerifyingRLS, isVerifyingFunctions: isVerifyingFunctions, onRunChecks: runChecks, onAddDemoData: handleAddDemoData, onVerifyTables: verifyRequiredTables, onCheckIndexes: checkDatabaseIndexes, onVerifyRLS: verifyRLSPolicies, onVerifyFunctions: verifyDatabaseFunctions, hasResults: results !== null }) })] }) }));
}
