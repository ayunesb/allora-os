export declare function handleSignIn(email: string, password: string, rememberMe?: boolean): Promise<{
    success: boolean;
    user: import("@supabase/auth-js").User;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    user?: undefined;
}>;
export declare function handleSignUp(email: string, password: string): Promise<{
    success: boolean;
    user: import("@supabase/auth-js").User;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    user?: undefined;
}>;
export declare function handleSignOut(): Promise<{
    success: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: any;
}>;
export declare function refreshSession(): Promise<{
    session: import("@supabase/auth-js").Session;
    user: import("@supabase/auth-js").User;
}>;
export declare function sendPasswordResetEmail(email: string): Promise<{
    success: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: any;
}>;
export declare function verifyOtpCode(email: string, token: string): Promise<{
    success: boolean;
    session: import("@supabase/auth-js").Session;
    error?: undefined;
} | {
    success: boolean;
    error: any;
    session?: undefined;
}>;
export declare function updateUserPassword(password: string): Promise<{
    success: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: any;
}>;
