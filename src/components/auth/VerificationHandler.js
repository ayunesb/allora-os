var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "sonner";
import { resendVerificationEmail } from "@/utils/authHelpers";
export const VerificationHandler = ({ user, children, }) => {
    const [isResending, setIsResending] = useState(false);
    const handleResendVerificationEmail = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            toast.error("Email address is missing", {
                description: "We couldn't find your email address. Please try logging in again.",
            });
            return;
        }
        setIsResending(true);
        try {
            const result = yield resendVerificationEmail(user.email);
            if (result.success) {
                toast.success("Verification email sent successfully", {
                    description: "Please check your inbox and spam folder.",
                });
            }
            else {
                toast.error(result.error || "Failed to send verification email", {
                    description: "Please try again in a few minutes.",
                });
            }
        }
        catch (error) {
            console.error("Error sending verification email:", error);
            toast.error("An error occurred while sending verification email", {
                description: "Please try again later or contact support.",
            });
        }
        finally {
            setIsResending(false);
        }
    });
    return _jsx(_Fragment, { children: children(isResending, handleResendVerificationEmail) });
};
