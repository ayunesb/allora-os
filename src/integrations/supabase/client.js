import { createClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseAnonKey } from '@/utils/env';
const SUPABASE_URL = getSupabaseUrl();
const SUPABASE_ANON_KEY = getSupabaseAnonKey();
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
});
/**
 * Check if the Supabase connection is working
 * @returns Connection status object
 */
export const checkSupabaseConnection = async () => {
    try {
        // Try a simple query to test the connection
        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .limit(1);
        if (error) {
            throw error;
        }
        return {
            connected: true,
            message: 'Successfully connected to Supabase'
        };
    }
    catch (err) {
        console.error('Supabase connection error:', err);
        return {
            connected: false,
            message: err instanceof Error ? err.message : 'Unknown connection error'
        };
    }
};
/**
 * Get the current session
 */
export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    return error ? null : data.session;
};
/**
 * Get the current user
 */
export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    return error ? null : data.user;
};
