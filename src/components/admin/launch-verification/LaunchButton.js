var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";
import { useLaunchProcess } from "@/components/admin/launch-verification/useLaunchProcess";
import { useProductionData } from "@/hooks/useProductionData";
export function LaunchButton() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLaunching, launchStep, isComplete, launchFirstCustomerFlow } = useLaunchProcess();
    const { forceProductionMode } = useProductionData();
    const handleLaunch = () => __awaiter(this, void 0, void 0, function* () {
        if (isLaunching)
            return;
        // Show confirmation dialog
        if (confirm("This will initialize real company data and create core business entities for your platform. Continue?")) {
            setIsOpen(true);
            try {
                yield launchFirstCustomerFlow();
                // Force production mode after successful launch
                forceProductionMode(true);
                localStorage.setItem("production-alert-dismissed", "true");
            }
            catch (error) {
                console.error("Launch failed:", error);
            }
        }
    });
    return (_jsx(_Fragment, { children: _jsx(Button, { onClick: handleLaunch, size: "lg", className: "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium px-6", disabled: isLaunching, children: isLaunching ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Launching..."] })) : (_jsxs(_Fragment, { children: [_jsx(Rocket, { className: "mr-2 h-4 w-4" }), "Initialize Real Data"] })) }) }));
}
