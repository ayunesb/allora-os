
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { calculatePasswordStrength } from "@/components/auth/PasswordStrengthMeter";
import { useAuth } from "@/context/AuthContext";

// Schema definition for signup form validation
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => calculatePasswordStrength(password) >= 60,
      "Password must meet strength requirements"
    ),
  confirmPassword: z.string(),
  company: z.string().optional(),
  industry: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupValues = z.infer<typeof signupSchema>;

interface UseSignupFormProps {
  onSubmitSuccess: () => void;
}

export function useSignupForm({ onSubmitSuccess }: UseSignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      industry: "",
    },
  });

  async function onSubmit(data: SignupValues) {
    setIsLoading(true);
    
    try {
      // Store the email in sessionStorage for verification page access
      sessionStorage.setItem('signupEmail', data.email);
      
      // Sign up the user with Supabase Auth
      const signUpResult = await signUp(data.email, data.password);
      
      if (!signUpResult.success) {
        throw new Error(signUpResult.error);
      }
      
      // Get the current user
      const { getCurrentUser } = await import('@/backend/supabase');
      const { user } = await getCurrentUser();
      
      if (user && data.company && data.industry) {
        // Save company information and update user profile
        const { saveCompanyInfo } = await import('@/utils/profileHelpers');
        await saveCompanyInfo(user.id, data.company, data.industry);
      }
      
      toast.success("Account created successfully!");
      
      // Check if email confirmation is required
      const { getSession } = await import('@/backend/supabase');
      const { session } = await getSession();
      
      if (!session) {
        onSubmitSuccess();
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  return { form, isLoading, onSubmit, navigate };
}
