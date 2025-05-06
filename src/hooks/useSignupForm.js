var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Define the signup form validation schema
const signupFormSchema = z
    .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string(),
    company: z.string().min(2, "Company name must be at least 2 characters."),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    websiteUrl: z.string().url().optional().or(z.literal("")),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
        path: ["acceptTerms"],
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});
export function useSignupForm({ onSubmitSuccess } = {}) {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const navigate = useNavigate();
    // Initialize react-hook-form with zod resolver
    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            company: "",
            industry: "",
            companySize: "",
            websiteUrl: "",
            acceptTerms: false,
        },
    });
    const onSubmit = (formData) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setFormError(null);
        try {
            // Mock user creation for now
            const user = {
                id: "123",
                email: formData.email,
                name: formData.name,
                company: formData.company || "",
                company_id: "default-company-id",
                industry: formData.industry || "",
                created_at: new Date().toISOString(),
                role: "user",
            };
            toast.success("Account created successfully");
            // Call success callback if provided
            if (onSubmitSuccess) {
                onSubmitSuccess(user);
            }
            else {
                navigate("/dashboard");
            }
            return { success: true, user };
        }
        catch (error) {
            const errorMessage = error.message || "An unexpected error occurred";
            setFormError(errorMessage);
            toast.error("Failed to create account", {
                description: errorMessage,
            });
            return { success: false, error: errorMessage };
        }
        finally {
            setLoading(false);
        }
    });
    return {
        loading,
        isLoading: loading, // Alias for compatibility
        form,
        onSubmit,
        navigate,
        formError,
    };
}
export default useSignupForm;
