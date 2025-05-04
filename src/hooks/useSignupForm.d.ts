import { User } from '@/types/fixed/User';
import * as z from "zod";
declare const signupFormSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    company: z.ZodString;
    industry: z.ZodOptional<z.ZodString>;
    companySize: z.ZodOptional<z.ZodString>;
    websiteUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    acceptTerms: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    password?: string;
    company?: string;
    industry?: string;
    companySize?: string;
    confirmPassword?: string;
    websiteUrl?: string;
    acceptTerms?: boolean;
}, {
    name?: string;
    email?: string;
    password?: string;
    company?: string;
    industry?: string;
    companySize?: string;
    confirmPassword?: string;
    websiteUrl?: string;
    acceptTerms?: boolean;
}>, {
    name?: string;
    email?: string;
    password?: string;
    company?: string;
    industry?: string;
    companySize?: string;
    confirmPassword?: string;
    websiteUrl?: string;
    acceptTerms?: boolean;
}, {
    name?: string;
    email?: string;
    password?: string;
    company?: string;
    industry?: string;
    companySize?: string;
    confirmPassword?: string;
    websiteUrl?: string;
    acceptTerms?: boolean;
}>;
export type SignupValues = z.infer<typeof signupFormSchema>;
interface UseSignupFormProps {
    onSubmitSuccess?: (user: User) => void;
}
export declare function useSignupForm({ onSubmitSuccess }?: UseSignupFormProps): {
    loading: boolean;
    isLoading: boolean;
    form: import("react-hook-form").UseFormReturn<{
        name?: string;
        email?: string;
        password?: string;
        company?: string;
        industry?: string;
        companySize?: string;
        confirmPassword?: string;
        websiteUrl?: string;
        acceptTerms?: boolean;
    }, any, {
        name?: string;
        email?: string;
        password?: string;
        company?: string;
        industry?: string;
        companySize?: string;
        confirmPassword?: string;
        websiteUrl?: string;
        acceptTerms?: boolean;
    }>;
    onSubmit: (formData: SignupValues) => Promise<{
        success: boolean;
        user: User;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        user?: undefined;
    }>;
    navigate: import("react-router-dom").NavigateFunction;
    formError: string;
};
export default useSignupForm;
