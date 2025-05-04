import { vi } from 'vitest';
// Create a type-safe mock for the Supabase client
export const createSupabaseMock = () => ({
    from: vi.fn().mockImplementation((table) => ({
        select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn(),
                    limit: vi.fn()
                }),
                single: vi.fn()
            })
        }),
        insert: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    })),
    rpc: vi.fn(),
    auth: {
        getUser: vi.fn(),
        getSession: vi.fn(),
        signUp: vi.fn(),
        signIn: vi.fn(),
        signOut: vi.fn(),
    },
    storage: {
        from: vi.fn(),
    },
});
