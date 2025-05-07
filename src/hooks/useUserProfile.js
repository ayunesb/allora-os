var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { supabase } from "@/backend/supabase";
export function useUserProfile() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [authError, setAuthError] = useState(null);
    const updateEmailVerification = useCallback((user) => {
        if ((user === null || user === void 0 ? void 0 : user.email_confirmed_at) || (user === null || user === void 0 ? void 0 : user.confirmed_at)) {
            setIsEmailVerified(true);
        }
        else {
            setIsEmailVerified(false);
        }
    }, []);
    const loadUserProfile = useCallback((userId) => __awaiter(this, void 0, void 0, function* () {
        if (!userId)
            return;
        setIsProfileLoading(true);
        try {
            const { data, error } = yield supabase
                .from("profiles")
                .select("*")
                .eq("id", userId)
                .single();
            if (error) {
                console.error("Error loading user profile:", error);
                return;
            }
            if (data) {
                setProfile(data);
            }
        }
        catch (error) {
            console.error("Unexpected error loading profile:", error);
        }
        finally {
            setIsProfileLoading(false);
        }
    }), []);
    return {
        user,
        setUser,
        profile,
        setProfile,
        isProfileLoading,
        isEmailVerified,
        authError,
        setAuthError,
        loadUserProfile,
        updateEmailVerification,
    };
}
