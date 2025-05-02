
// Expanded SignupForm hook
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '@/types/fixed/User';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define the signup form validation schema
const signupFormSchema = z.object({
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
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
    path: ["acceptTerms"],
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

// Extract the inferred type from the schema
export type SignupValues = z.infer<typeof signupFormSchema>;

// Props for useSignupForm
interface UseSignupFormProps {
  onSubmitSuccess?: (user: User) => void;
}

export function useSignupForm({ onSubmitSuccess }: UseSignupFormProps = {}) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Initialize react-hook-form with zod resolver
  const form = useForm<SignupValues>({
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

  const onSubmit = async (formData: SignupValues) => {
    setLoading(true);
    setFormError(null);
    
    try {
      // This mock implementation ensures the user object has all required fields
      const user: User = {
        id: '123',
        email: formData.email,
        name: formData.name,
        company: formData.company || '',
        company_id: 'default-company-id',
        industry: formData.industry || '',
        created_at: new Date().toISOString(),
        role: 'user'
      };
      
      // In a real implementation, this would call an API to create the user
      console.log('Created user:', user);
      
      toast.success('Account created successfully');
      
      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(user);
      } else {
        navigate('/dashboard');
      }
      
      return { success: true, user };
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred';
      setFormError(errorMessage);
      
      toast.error('Failed to create account', {
        description: errorMessage
      });
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    isLoading: loading, // Alias for compatibility
    form,
    onSubmit,
    navigate,
    formError,
    handleSignup: async (formData: any) => {
      setLoading(true);
      
      try {
        // This mock implementation ensures the user object has all required fields
        const user: User = {
          id: '123',
          email: formData.email,
          name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
          company: formData.company || '',
          company_id: formData.company_id || 'default-company-id',
          industry: formData.industry || '',
          created_at: new Date().toISOString(),
          role: 'user'
        };
        
        // In a real implementation, this would call an API to create the user
        console.log('Created user:', user);
        
        toast.success('Account created successfully');
        navigate('/dashboard');
        return { success: true, user };
      } catch (error: any) {
        toast.error('Failed to create account', {
          description: error.message || 'An unexpected error occurred'
        });
        return { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    }
  };
}

export default useSignupForm;
