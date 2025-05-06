var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationContent } from "@/components/admin/launch-verification/VerificationContent";
import { LaunchInfoBox } from "@/components/admin/launch-verification/LaunchInfoBox";
import { LaunchProgress } from "@/components/admin/launch-verification/LaunchProgress";
import { useLaunchVerification } from "@/hooks/admin/useLaunchVerification";
import { useLaunchProcess } from "@/components/admin/launch-verification/useLaunchProcess";
import { toast } from "sonner";
export default function LaunchCheck() {
    const [activeTab, setActiveTab] = useState("verification");
    const { runValidation, validationResults, isChecking, lastCheckTime, validationStatus, } = useLaunchVerification();
    const { isLaunching, launchStep, isComplete, launchFirstCustomerFlow } = useLaunchProcess();
    // Fix the missing argument issue
    const handleRunValidation = () => {
        runValidation({ type: "full" });
    };
    const handleLaunch = () => __awaiter(this, void 0, void 0, function* () {
        if (!validationResults || validationStatus !== "passed") {
            toast.error("Cannot launch until all verification checks pass");
            return;
        }
        const success = yield launchFirstCustomerFlow();
        if (success) {
            toast.success("Launch successful! Your system is now live.");
        }
        else {
            toast.error("Launch failed. Please check the logs and try again.");
        }
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Launch Verification" }), _jsx("p", { className: "text-muted-foreground", children: "Verify your system is ready for production" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", onClick: handleRunValidation, disabled: isChecking, children: "Run Validation" }), _jsx(Button, { onClick: handleLaunch, disabled: isLaunching || validationStatus !== "passed", children: isLaunching ? "Launching..." : "Launch System" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx("div", { className: "md:col-span-2", children: _jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { children: "System Verification" }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "verification", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "verification", children: "Verification" }), _jsx(TabsTrigger, { value: "launch", children: "Launch Process" })] }), _jsx(TabsContent, { value: "verification", children: _jsx(VerificationContent, { results: validationResults, isChecking: isChecking }) }), _jsx(TabsContent, { value: "launch", children: _jsx(LaunchProgress, { isLaunching: isLaunching, currentStep: launchStep, isComplete: isComplete }) })] }) })] }) }), _jsx("div", { children: _jsx(LaunchInfoBox, { lastCheckTime: lastCheckTime, status: validationStatus, onRunCheck: handleRunValidation, isChecking: isChecking }) })] })] }));
}
