
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { RocketIcon, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { sendPasswordReset } = useAuth();
  
  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ResetFormValues) {
    setIsLoading(true);
    
    try {
      const { success, error } = await sendPasswordReset(data.email);
      
      if (!success) {
        throw new Error(error);
      }
      
      setIsSubmitted(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Failed to send reset instructions");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <RocketIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Allora AI</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="ghost" onClick={() => navigate("/signup")}>
            Signup
          </Button>
        </div>
      </div>
      
      <div className="flex-1 container max-w-md mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full border-primary/10 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "Check your email for reset instructions" 
                : "Enter your email to receive reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  We've sent instructions to reset your password. Please check your email inbox and spam folder.
                </p>
                <div className="flex flex-col space-y-2 mt-4">
                  <Button onClick={() => navigate("/login")} variant="outline">
                    Return to Login
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      form.reset();
                    }}
                    variant="ghost"
                  >
                    Try another email
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
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
                    {isLoading ? "Sending..." : "Send Reset Instructions"}
                  </Button>

                  <div className="text-center mt-4">
                    <Button 
                      variant="link" 
                      className="p-0" 
                      onClick={() => navigate("/login")}
                      type="button"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to login
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
