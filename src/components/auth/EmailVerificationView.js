import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Mail } from "lucide-react";
import { resendVerificationEmail } from "@/utils/authHelpers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function EmailVerificationView({ email, onTryAgain, isNewSignup = false, userId }) {
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // If this is a new signup, we'll set a flag to redirect to onboarding
        if (isNewSignup && userId) {
            console.log("New signup detected in EmailVerificationView, will redirect to onboarding");
            sessionStorage.setItem('newUserSignup', 'true');
            sessionStorage.setItem('pendingOnboardingUserId', userId);
        }
    }, [isNewSignup, userId]);
    const handleResendEmail = async () => {
        if (!email) {
            toast.error("No email address available");
            return;
        }
        setIsResending(true);
        try {
            const result = await resendVerificationEmail(email);
            if (result.success) {
                toast.success("Verification email resent. Please check your inbox.");
            }
            else {
                toast.error(result.error || "Failed to resend verification email");
            }
        }
        catch (error) {
            console.error("Resend verification error:", error);
            toast.error("An unexpected error occurred");
        }
        finally {
            setIsResending(false);
        }
    };
    const handleSignIn = () => {
        navigate("/login");
    };
    const handleGoToOnboarding = () => {
        console.log("Redirecting to onboarding from EmailVerificationView");
        navigate("/onboarding");
    };
    return (<Card className="w-full max-w-lg border-primary/10 shadow-lg">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-primary"/>
        </div>
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a verification email to <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md space-y-3">
          <div className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5"/>
            <div>
              <p className="font-medium">Check your inbox</p>
              <p className="text-sm text-muted-foreground">
                Click the verification link in the email we just sent you
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5"/>
            <div>
              <p className="font-medium">After verification</p>
              <p className="text-sm text-muted-foreground">
                Return here and sign in to continue to your account
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="w-full flex space-x-2">
          <Button variant="outline" className="flex-1" onClick={handleResendEmail} disabled={isResending}>
            {isResending ? "Sending..." : "Resend Email"}
          </Button>
          <Button className="flex-1" onClick={handleSignIn}>
            Sign In
          </Button>
        </div>
        {isNewSignup && (<div className="w-full">
            <Button variant="link" className="w-full text-muted-foreground" onClick={handleGoToOnboarding}>
              Skip verification for now
            </Button>
          </div>)}
        
        {onTryAgain && (<Button variant="ghost" className="w-full mt-4 text-sm" onClick={onTryAgain}>
            Use a different email
          </Button>)}
      </CardFooter>
    </Card>);
}
