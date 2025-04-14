
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar"; // Changed from { Navbar } to default import
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoginForm, LoginFormValues } from "@/components/auth/login/LoginForm";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, isLoading: authLoading } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";
  const isSessionExpired = location.state?.expired || false;

  useEffect(() => {
    if (user && !authLoading) {
      navigate(from, { replace: true });
    }
    
    // Show session expired message if redirected due to expired session
    if (isSessionExpired) {
      toast.error("Your session has expired", {
        description: "Please log in again to continue."
      });
    }
  }, [user, authLoading, navigate, from, isSessionExpired]);

  const onSubmit = async (data: LoginFormValues) => {
    setLoginError(null);
    setIsLoading(true);
    
    try {
      localStorage.setItem('supabase.auth.persistSession', data.rememberMe.toString());
      
      const { success, error } = await signIn(data.email, data.password);
      
      if (!success) {
        throw new Error(error);
      }
      
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message.includes("Invalid login credentials")) {
        setLoginError("Invalid email or password. Please try again.");
      } else if (error.message.includes("Email not confirmed")) {
        setLoginError("Please verify your email before logging in.");
      } else {
        setLoginError(error.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md bg-secondary/40 rounded-lg border border-border/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-center">Login to Allora AI</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            {loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            
            <LoginForm 
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
