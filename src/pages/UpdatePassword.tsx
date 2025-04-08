
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { RocketIcon, ShieldCheck, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/backend/supabase";
import PasswordStrengthMeter, { calculatePasswordStrength } from "@/components/auth/PasswordStrengthMeter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const passwordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .refine(
      (password) => calculatePasswordStrength(password) >= 60,
      "Password must meet strength requirements"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  
  useEffect(() => {
    // Check if the URL contains hash parameters from Supabase
    const checkSession = async () => {
      setIsVerifying(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setIsTokenValid(false);
          return;
        }
        
        // If we have a session and we're on this page, we're likely in the reset flow
        setIsTokenValid(!!data.session);
      } catch (err) {
        console.error("Failed to verify token:", err);
        setIsTokenValid(false);
      } finally {
        setIsVerifying(false);
      }
    };
    
    checkSession();
    
    // Parse hash parameters if they exist
    const hasHashParams = window.location.hash && 
                         (window.location.hash.includes('type=recovery') || 
                          window.location.hash.includes('type=signup'));
    
    if (hasHashParams) {
      // Hash params exist, let supabase handle it
      const handleHashChange = async () => {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data.session) {
            toast.success("Authentication successful");
            setIsTokenValid(true);
          }
        } catch (err) {
          console.error("Error handling hash params:", err);
        }
      };
      
      handleHashChange();
    }
  }, []);
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password for strength meter
  const password = form.watch("password");

  async function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    setUpdateError(null);
    
    try {
      const { success, error } = await updatePassword(data.password);
      
      if (!success) {
        throw new Error(error);
      }
      
      setIsSuccess(true);
      toast.success("Password updated successfully");
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      console.error("Update password error:", error);
      
      setUpdateError(error.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <RocketIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Allora AI</span>
          </div>
        </div>
        
        <div className="flex-1 container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-center text-muted-foreground">Verifying your request...</p>
        </div>
      </div>
    );
  }

  if (isTokenValid === false) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <RocketIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Allora AI</span>
          </div>
        </div>
        
        <div className="flex-1 container max-w-md mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="w-full border-primary/10 shadow-lg">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-bold">Invalid or Expired Link</CardTitle>
              <CardDescription>
                The password reset link is invalid or has expired
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Link Not Valid</AlertTitle>
                  <AlertDescription>
                    This link may have expired or already been used.
                  </AlertDescription>
                </Alert>
                <p className="text-muted-foreground text-sm">
                  Please request a new password reset link
                </p>
                <div className="flex flex-col space-y-2 mt-4">
                  <Button onClick={() => navigate("/reset-password")} className="w-full">
                    Request New Link
                  </Button>
                  <Button onClick={() => navigate("/login")} variant="outline" className="w-full">
                    Return to Login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Allora AI</span>
        </div>
      </div>
      
      <div className="flex-1 container max-w-md mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full border-primary/10 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
              {isSuccess ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <ShieldCheck className="h-8 w-8 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold">
              {isSuccess ? "Password Updated!" : "Create New Password"}
            </CardTitle>
            <CardDescription>
              {isSuccess 
                ? "Your password has been successfully updated" 
                : "Enter your new password below"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {updateError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{updateError}</AlertDescription>
              </Alert>
            )}
            
            {isSuccess ? (
              <div className="text-center space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-700">Success!</AlertTitle>
                  <AlertDescription className="text-green-600">
                    Your password has been updated. You will be redirected to the login page shortly.
                  </AlertDescription>
                </Alert>
                <div className="mt-4">
                  <Button onClick={() => navigate("/login")} className="w-full">
                    Go to Login
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                        </FormControl>
                        <PasswordStrengthMeter password={password} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                      </>
                    ) : "Update Password"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
