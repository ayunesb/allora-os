
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { calculatePasswordStrength } from "@/components/auth/PasswordStrengthMeter";
import { useAuth } from "@/context/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { User } from "@supabase/supabase-js";
import { sanitizeInput } from "@/utils/sanitizers";
import { generateCsrfToken } from "@/utils/csrfProtection";
import { logger } from "@/utils/loggingService";

// Schema definition for signup form validation
export const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .transform(val => sanitizeInput(val)),
  email: z.string()
    .email("Please enter a valid email address")
    .transform(val => sanitizeInput(val)),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number"
    )
    .refine(
      (password) => /[^A-Za-z0-9]/.test(password),
      "Password must contain at least one special character"
    )
    .refine(
      (password) => calculatePasswordStrength(password) >= 60,
      "Password must meet strength requirements"
    ),
  confirmPassword: z.string(),
  company: z.string()
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  industry: z.string()
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  csrfToken: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupValues = z.infer<typeof signupSchema>;

interface UseSignupFormProps {
  onSubmitSuccess: (user: User) => void;
}

export function useSignupForm({ onSubmitSuccess }: UseSignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
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
      csrfToken: generateCsrfToken(),
    },
    mode: "onBlur", // Validate fields when they lose focus
  });

  async function onSubmit(data: SignupValues) {
    setIsLoading(true);
    setFormError(null);
    
    try {
      // Check for suspicious signup attempt patterns (e.g., many rapid signups)
      const recentAttempt = sessionStorage.getItem('lastSignupAttempt');
      const now = Date.now();
      if (recentAttempt && now - parseInt(recentAttempt) < 2000) {
        logger.warn("Rapid signup attempts detected", { email: data.email });
        // Add a small delay to prevent brute force attempts
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      sessionStorage.setItem('lastSignupAttempt', now.toString());
      
      // Store the email in sessionStorage for verification page access
      sessionStorage.setItem('signupEmail', data.email);
      logger.info("Starting signup process for: " + data.email);
      
      // Sign up the user with Supabase Auth
      const signUpResult = await signUp(data.email, data.password);
      
      if (!signUpResult.success) {
        if (signUpResult.error?.includes("already registered")) {
          setFormError("This email is already registered. Try logging in instead.");
          form.setError("email", { 
            type: "manual", 
            message: "Email already in use" 
          });
          setIsLoading(false);
          return;
        }
        throw new Error(signUpResult.error);
      }

      // Store user metadata for profile creation
      if (signUpResult.user) {
        logger.info("User created successfully: " + signUpResult.user.id);
        
        // Create sanitized data to avoid empty strings
        const userData = {
          name: data.name,
          company: data.company || null,
          industry: data.industry || null
        };
        
        // Update user metadata with name and company info
        const { error: updateError } = await supabase.auth.updateUser({
          data: userData
        });

        if (updateError) {
          logger.error("Error updating user metadata: " + updateError);
        }

        // Once the user is created, save company information to profiles table
        if (data.company || data.industry) {
          const { saveCompanyInfo } = await import('@/utils/profileHelpers');
          await saveCompanyInfo(
            signUpResult.user.id, 
            data.company || '', 
            data.industry || ''
          );
        }
        
        // Set a flag in sessionStorage to indicate this is a new user for onboarding
        sessionStorage.setItem('newUserSignup', 'true');
        sessionStorage.setItem('pendingOnboardingUserId', signUpResult.user.id);
        
        toast.success("Account created successfully!");
        
        // Regenerate CSRF token after signup
        generateCsrfToken();
        
        // Call onSubmitSuccess to trigger the parent component's success handler
        onSubmitSuccess(signUpResult.user);
        return;
      }
      
      throw new Error("Failed to retrieve user information after signup.");
    } catch (error: any) {
      logger.error("Signup error: " + error);
      setFormError(error.message || "Failed to create account");
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  }

  return { form, isLoading, onSubmit, navigate, formError };
}
