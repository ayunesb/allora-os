export interface User {
    id: string;
    email: string;
    name: string;
    company_id: string;
    role: "user" | "admin";
    created_at: string;
    avatar_url?: string;
    company?: string;
    industry?: string;
    app_metadata?: {
        is_admin?: boolean;
        [key: string]: any;
    };
}
