var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseAnonKey } from "@/utils/env";
const SUPABASE_URL = getSupabaseUrl();
const SUPABASE_ANON_KEY = getSupabaseAnonKey();
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
    },
});
/**
 * Check if the Supabase connection is working
 * @returns Connection status object
 */
export const checkSupabaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Try a simple query to test the connection
        const { data, error } = yield supabase
            .from("profiles")
            .select("id")
            .limit(1);
        if (error) {
            throw error;
        }
        return {
            connected: true,
            message: "Successfully connected to Supabase",
        };
    }
    catch (err) {
        console.error("Supabase connection error:", err);
        return {
            connected: false,
            message: err instanceof Error ? err.message : "Unknown connection error",
        };
    }
});
/**
 * Get the current session
 */
export const getSession = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.auth.getSession();
    return error ? null : data.session;
});
/**
 * Get the current user
 */
export const getCurrentUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.auth.getUser();
    return error ? null : data.user;
});
