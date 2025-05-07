var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useParams, Navigate } from "react-router-dom";
import BotDetailComponent from "@/components/BotDetail";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function BotDetailPage() {
    const { botId } = useParams();
    const [isValidBot, setIsValidBot] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Validate the bot ID, in a real app this would check against your API
        const validateBotId = () => __awaiter(this, void 0, void 0, function* () {
            try {
                setIsLoading(true);
                // This is a simplified check - in a real app, you would verify
                // the botId exists in your database
                const valid = botId && botId.length > 0;
                if (!valid) {
                    toast.error("Invalid advisor ID");
                }
                setIsValidBot(valid);
            }
            catch (error) {
                console.error("Error validating bot ID:", error);
                toast.error("Failed to validate advisor");
                setIsValidBot(false);
            }
            finally {
                setIsLoading(false);
            }
        });
        validateBotId();
    }, [botId]);
    // Show loading state
    if (isLoading) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    // Redirect to bots listing page if invalid ID
    if (isValidBot === false) {
        return _jsx(Navigate, { to: "/dashboard/ai-bots", replace: true });
    }
    // If valid, render the bot detail component
    return _jsx(BotDetailComponent, {});
}
