/**
 * Supabase API wrapper
 * Provides helper functions to adapt Supabase queries to work with our apiClient
 */
/**
 * Wraps a Supabase query function to make it compatible with apiRequest
 * @param queryFunction The Supabase query function to wrap
 * @returns A function that returns a Promise with a Response-like structure
 */
export declare const wrapSupabaseQuery: <T>(queryFunction: () => Promise<{
    data: T;
    error: any;
}>) => (() => Promise<Response>);
