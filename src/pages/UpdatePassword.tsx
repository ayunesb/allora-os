
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { RocketIcon, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { updatePassword } from "@/utils/authHelpers";
import { supabase } from "@/backend/supabase";

const passwordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the URL contains hash parameters from Supabase
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Session error:", error);
        setIsTokenValid(false);
        return;
      }
      
      // If we have a session and we're on this page, we're likely in the reset flow
      setIsTokenValid(!!data.session);
    };
    
    checkSession();
  }, []);
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    
    try {
      const { success, error } = await updatePassword(data.password);
      
      if (!success) {
        throw new Error(error);
      }
      
      toast.success("Password updated successfully");
      navigate("/login");
    } catch (error: any) {
      console.error("Update password error:", error);
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
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
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Create New Password</CardTitle>
            <CardDescription>
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
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
                        <Input type="password" placeholder="••••••••" {...field} />
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
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
