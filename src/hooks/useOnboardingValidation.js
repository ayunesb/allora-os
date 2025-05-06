var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { generateVideo } from "@/utils/heygenHelpers";
export function useOnboardingValidation() {
    const [isCompleting, setIsCompleting] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const { user, profile, refreshProfile } = useAuth();
    const handleComplete = () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!user) {
            setValidationError("You must be logged in to complete onboarding");
            return false;
        }
        setIsCompleting(true);
        setValidationError(null);
        try {
            // Refresh user profile to get the latest data
            yield refreshProfile();
            // Get the company name and username for the welcome video
            const companyName = (profile === null || profile === void 0 ? void 0 : profile.company) || "your company";
            const userName = ((_a = profile === null || profile === void 0 ? void 0 : profile.name) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) || "there";
            // Generate welcome video in background
            try {
                const welcomeText = `Hello ${userName}! Welcome to Allora AI's Executive Advisory for ${companyName}. I'm excited to be your AI CEO and help you grow your business with strategies from our team of AI executives. Check out our recommendations in the dashboard and let's start growing your business today!`;
                generateVideo(welcomeText, "avatar_twinsen", // Default avatar ID
                "voice_1", // Default voice ID
                companyName).then((result) => {
                    if (!result.success) {
                        console.error("Failed to generate welcome video:", result.error);
                    }
                });
            }
            catch (videoError) {
                // Don't fail the onboarding process if video generation fails
                console.error("Error generating welcome video:", videoError);
            }
            toast.success("Onboarding completed successfully!");
            return true;
        }
        catch (error) {
            console.error("Onboarding validation error:", error);
            setValidationError(error.message || "An unexpected error occurred");
            toast.error("Failed to complete onboarding");
            return false;
        }
        finally {
            setIsCompleting(false);
        }
    });
    return {
        isCompleting,
        validationError,
        handleComplete,
    };
}
