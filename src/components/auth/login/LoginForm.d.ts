import { z } from "zod";
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    password?: string;
    rememberMe?: boolean;
}, {
    email?: string;
    password?: string;
    rememberMe?: boolean;
}>;
export type LoginFormValues = z.infer<typeof loginSchema>;
interface LoginFormProps {
    onSubmit: (data: LoginFormValues) => Promise<void>;
    isLoading: boolean;
}
export declare function LoginForm({ onSubmit, isLoading }: LoginFormProps): import("react").JSX.Element;
export {};
