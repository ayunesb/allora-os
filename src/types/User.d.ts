export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    company_id: string;
    created_at: string;
    company?: string;
    industry?: string;
    avatar_url?: string;
    app_metadata?: {
        is_admin?: boolean;
        [key: string]: any;
    };
}
