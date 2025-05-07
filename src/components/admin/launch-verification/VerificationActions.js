import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Database, Table2, Lock, Code, } from "lucide-react";
export function VerificationActions({ isChecking, isAddingDemo, isVerifyingTables, isCheckingIndexes, isVerifyingRLS, isVerifyingFunctions, onRunChecks, onAddDemoData, onVerifyTables, onCheckIndexes, onVerifyRLS, onVerifyFunctions, hasResults, hasVerifiedTables, hasVerifiedIndexes, hasVerifiedRLS, hasVerifiedFunctions, }) {
    return (_jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs(Button, { onClick: onRunChecks, disabled: isChecking, variant: hasResults ? "outline" : "default", size: "sm", children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isChecking ? "animate-spin" : ""}` }), isChecking
                        ? "Running Checks..."
                        : hasResults
                            ? "Re-run Checks"
                            : "Run All Checks"] }), onAddDemoData && (_jsxs(Button, { onClick: onAddDemoData, disabled: isAddingDemo, variant: "outline", size: "sm", children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), isAddingDemo ? "Adding Data..." : "Add Demo Data"] })), onVerifyTables && (_jsxs(Button, { onClick: onVerifyTables, disabled: isVerifyingTables, variant: "outline", size: "sm", className: hasVerifiedTables
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "", children: [_jsx(Table2, { className: "mr-2 h-4 w-4" }), isVerifyingTables ? "Checking Tables..." : "Verify Tables"] })), onCheckIndexes && (_jsxs(Button, { onClick: onCheckIndexes, disabled: isCheckingIndexes, variant: "outline", size: "sm", className: hasVerifiedIndexes
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "", children: [_jsx(Database, { className: "mr-2 h-4 w-4" }), isCheckingIndexes ? "Checking Indexes..." : "Check Indexes"] })), onVerifyRLS && (_jsxs(Button, { onClick: onVerifyRLS, disabled: isVerifyingRLS, variant: "outline", size: "sm", className: hasVerifiedRLS
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "", children: [_jsx(Lock, { className: "mr-2 h-4 w-4" }), isVerifyingRLS ? "Checking RLS..." : "Verify RLS"] })), onVerifyFunctions && (_jsxs(Button, { onClick: onVerifyFunctions, disabled: isVerifyingFunctions, variant: "outline", size: "sm", className: hasVerifiedFunctions
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "", children: [_jsx(Code, { className: "mr-2 h-4 w-4" }), isVerifyingFunctions ? "Checking Functions..." : "Verify Functions"] }))] }));
}
