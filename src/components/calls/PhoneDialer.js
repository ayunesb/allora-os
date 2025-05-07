var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { PhoneCall, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { makeCall } from "@/utils/callHelpers";
import { toast } from "sonner";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAuthState } from "@/hooks/useAuthState";
export default function PhoneDialer({ phoneNumber, onPhoneNumberChange }) {
    const [isCallingLoading, setIsCallingLoading] = useState(false);
    const { user } = useAuthState();
    const { trackAction } = useSelfLearning();
    const handleCall = () => __awaiter(this, void 0, void 0, function* () {
        if (!phoneNumber.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        setIsCallingLoading(true);
        try {
            if (user === null || user === void 0 ? void 0 : user.id) {
                trackAction("initiate_call", "call_initiate", phoneNumber, "phone_call", { phoneNumber });
            }
            yield makeCall(phoneNumber, user === null || user === void 0 ? void 0 : user.id);
            toast.success("Call initiated successfully");
        }
        catch (error) {
            console.error("Call error:", error);
            toast.error("Failed to initiate call");
        }
        finally {
            setIsCallingLoading(false);
        }
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Make a Call" }), _jsx(CardDescription, { children: "Call potential customers or leads" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "call-phone", children: "Phone Number" }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { id: "call-phone", placeholder: "+1 (555) 123-4567", value: phoneNumber, onChange: (e) => onPhoneNumberChange(e.target.value) }), _jsx(Button, { onClick: handleCall, disabled: isCallingLoading, children: isCallingLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Calling..."] })) : (_jsxs(_Fragment, { children: [_jsx(PhoneCall, { className: "mr-2 h-4 w-4" }), "Call"] })) })] })] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [_jsx("p", { children: "Calls are made using your connected Twilio account." }), _jsx("p", { children: "Standard rates apply based on your Twilio plan." })] })] })] }));
}
