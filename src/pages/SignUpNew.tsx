
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";
import EmailVerificationView from "@/components/auth/EmailVerificationView";
import SignupLayout from "@/components/auth/SignupLayout";
import { LegalAcceptanceModal } from "@/components/auth/LegalAcceptanceModal";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [newUser, setNewUser] = useState<User | null>(null);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve email from sessionStorage when component mounts or isSubmitted changes
    if (isSubmitted) {
      const email = sessionStorage.getItem('signupEmail') || "";
      setUserEmail(email);
    }

    // Check if user was redirected from email verification
    const emailVerified = new URLSearchParams(window.location.search).get('emailVerified');
    if (emailVerified === 'true') {
      toast.success("Email verified successfully! Please log in.");
      navigate('/login');
    }
  }, [isSubmitted, navigate]);

  const handleSubmitSuccess = (user: User) => {
    if (!user) {
      setSignupError("Failed to retrieve user information after signup.");
      return;
    }
    
    console.log("Signup success, user:", user.id);
    setNewUser(user);
    setShowLegalModal(true);
    setSignupError(null);
  };
  
  const handleTryAgain = () => {
    setIsSubmitted(false);
    setSignupError(null);
  };

  const handleLegalAcceptance = () => {
    setShowLegalModal(false);
    setIsSubmitted(true);
    
    // Store a flag that this is a new user that needs onboarding
    sessionStorage.setItem('newUserSignup', 'true');
    
    // After legal acceptance, show verification screen but also prepare for onboarding
    console.log("Legal acceptance completed. User will be redirected to onboarding after verification.");
  };

  if (isSubmitted) {
    return (
      <SignupLayout>
        <EmailVerificationView 
          email={userEmail} 
          onTryAgain={handleTryAgain}
          isNewSignup={true}
          userId={newUser?.id}
        />
      </SignupLayout>
    );
  }

  return (
    <SignupLayout>
      <Card className="w-full max-w-lg border-primary/10 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <RocketIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Join Allora AI</CardTitle>
          <CardDescription>
            Create your account to access AI-powered business strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          {signupError && (
            <div className="bg-destructive/10 border border-destructive rounded-md p-3 mb-4 text-sm text-destructive">
              <p>{signupError}</p>
              <button 
                onClick={handleTryAgain}
                className="text-primary hover:underline mt-1 text-sm"
              >
                Try again
              </button>
            </div>
          )}
          
          <SignupForm 
            onSubmitSuccess={handleSubmitSuccess} 
          />
        </CardContent>
      </Card>

      {showLegalModal && newUser && (
        <LegalAcceptanceModal
          isOpen={showLegalModal}
          userId={newUser.id}
          onClose={() => setShowLegalModal(false)}
          onAccept={handleLegalAcceptance}
        />
      )}
    </SignupLayout>
  );
}
