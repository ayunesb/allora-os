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
export const SessionRefreshHandler = ({ user, refreshSession, children, }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const handleSessionRefresh = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsRefreshing(true);
        try {
            yield refreshSession();
            toast.success("Session refreshed successfully");
        }
        catch (error) {
            console.error("Error refreshing session:", error);
            toast.error("An unexpected error occurred", {
                description: "Unable to refresh your session. Please try logging in again.",
            });
        }
        finally {
            setIsRefreshing(false);
        }
    });
    return _jsx(_Fragment, { children: children(isRefreshing, handleSessionRefresh) });
};
