import { useState } from "react";
import { toast } from "sonner";
import { resendVerificationEmail } from "@/utils/authHelpers";
export const VerificationHandler = ({ user, children }) => {
    const [isResending, setIsResending] = useState(false);
    const handleResendVerificationEmail = async () => {
        if (!user?.email) {
            toast.error("Email address is missing", {
                description: "We couldn't find your email address. Please try logging in again."
            });
            return;
        }
        setIsResending(true);
        try {
            const result = await resendVerificationEmail(user.email);
            if (result.success) {
                toast.success("Verification email sent successfully", {
                    description: "Please check your inbox and spam folder."
                });
            }
            else {
                toast.error(result.error || "Failed to send verification email", {
                    description: "Please try again in a few minutes."
                });
            }
        }
        catch (error) {
            console.error("Error sending verification email:", error);
            toast.error("An error occurred while sending verification email", {
                description: "Please try again later or contact support."
            });
        }
        finally {
            setIsResending(false);
        }
    };
    return <>{children(isResending, handleResendVerificationEmail)}</>;
};
