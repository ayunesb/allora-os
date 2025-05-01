import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { User } from '@/types/fixed/User';

// Validation schema
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
  confirmPassword: z.string(),
  company: z.string().min(1, { message: 'Company name is required' }),
  industry: z.string().optional(),
  terms: z.boolean().refine(val => val === true, { message: 'You must accept the terms and conditions' })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

// Type for form values
export type SignupValues = z.infer<typeof signupSchema>;

// Props for the hook
interface UseSignupFormProps {
  onSubmitSuccess?: (user: User) => void;
}

// Return type for the hook
interface SignupResponse {
  success: boolean;
  error?: string;
  user?: User;
}

export const useSignupForm = (props?: UseSignupFormProps) => {
  const { onSubmitSuccess } = props || {};
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: '',
      industry: '',
      terms: false
    }
  });

  const handleSignup = async (data: SignupValues): Promise<SignupResponse> => {
    // This is a mock implementation that would be replaced with actual API calls
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock user data
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        company: data.company,
        industry: data.industry,
        created_at: new Date().toISOString(),
        role: 'user'
      };
      
      return {
        success: true,
        user: mockUser
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  };

  const onSubmit = useCallback(async (values: SignupValues) => {
    setFormError(null);
    setIsLoading(true);

    try {
      const result = await handleSignup(values);
      
      if (result.success && result.user) {
        toast.success('Account created successfully!');
        
        // Call the success callback if provided
        if (onSubmitSuccess && result.user) {
          onSubmitSuccess(result.user);
        } else {
          // Otherwise redirect to the dashboard
          navigate('/dashboard');
        }
      } else {
        setFormError(result.error || 'Failed to create account');
        toast.error(result.error || 'Failed to create account');
      }
    } catch (error) {
      console.error('Signup form error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, onSubmitSuccess]);

  return {
    form,
    isLoading,
    onSubmit,
    formError,
    navigate
  };
};

export default useSignupForm;
