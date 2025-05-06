import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RocketIcon, AlertTriangle } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";
import EmailVerificationView from "@/components/auth/EmailVerificationView";
import SignupLayout from "@/components/auth/SignupLayout";
import { LegalAcceptanceModal } from "@/components/auth/LegalAcceptanceModal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export default function SignUpNew() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [newUser, setNewUser] = useState(null); // Using any here to bypass the incompatible types
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [legalError, setLegalError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve email from sessionStorage when component mounts or isSubmitted changes
    if (isSubmitted) {
      const email = sessionStorage.getItem("signupEmail") || "";
      setUserEmail(email);
    }
    // Check if user was redirected from email verification
    const emailVerified = new URLSearchParams(window.location.search).get(
      "emailVerified",
    );
    if (emailVerified === "true") {
      toast.success("Email verified successfully! Please log in.");
      navigate("/login");
    }
  }, [isSubmitted, navigate]);
  const handleUser = (user: { id: string; [key: string]: any }) => {
    if (!user.id) {
      setSignupError("Failed to retrieve user information after signup.");
      return;
    }
    console.log("Signup success, user:", user.id);
    setNewUser(user);
    setShowLegalModal(true);
    setSignupError(null);
  };
  const handleSubmitSuccess = (user) => {
    handleUser(user);
  };
  const handleTryAgain = () => {
    setIsSubmitted(false);
    setSignupError(null);
    setLegalError(null);
  };
  const handleLegalAcceptance = async () => {
    setLegalError(null);
    setRetryCount(0);
    // Store a flag that this is a new user that needs onboarding
    sessionStorage.setItem("newUserSignup", "true");
    // After legal acceptance, show verification screen but also prepare for onboarding
    console.log(
      "Legal acceptance completed. User will be redirected to onboarding after verification.",
    );
    setShowLegalModal(false);
    setIsSubmitted(true);
  };
  const handleModalClose = () => {
    // If the modal is closed without acceptance, sign the user out
    // as they need to accept the terms to use the platform
    supabase.auth.signOut().then(() => {
      toast.info(
        "Sign up cancelled. You must accept the terms to create an account.",
      );
      setShowLegalModal(false);
      setIsSubmitted(false);
      setNewUser(null);
    });
  };
  const handleRetryLegalAcceptance = () => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      setLegalError(null);
      setShowLegalModal(true);
    } else {
      // Too many retries, sign out and start over
      supabase.auth.signOut().then(() => {
        toast.error(
          "There seems to be an issue with legal acceptance. Please try signing up again.",
        );
        navigate("/signup");
      });
    }
  };
  if (isSubmitted) {
    const userId = newUser?.id ?? null; // Ensure `id` is properly typed
    return (
      <SignupLayout>
        <EmailVerificationView
          email={userEmail}
          onTryAgain={handleTryAgain}
          isNewSignup={true}
          userId={userId}
        />

        {legalError && (
          <Card className="mt-4 border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h3 className="font-medium text-destructive">
                    Legal Acceptance Error
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {legalError}
                  </p>
                  <button
                    onClick={handleRetryLegalAcceptance}
                    className="text-sm text-primary mt-2 hover:underline"
                  >
                    Retry Legal Acceptance
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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

          <SignupForm onSubmitSuccess={handleSubmitSuccess} />
        </CardContent>
      </Card>

      {showLegalModal && newUser && (
        <LegalAcceptanceModal
          isOpen={showLegalModal}
          userId={newUser.id}
          onClose={handleModalClose}
          onAccept={handleLegalAcceptance}
        />
      )}
    </SignupLayout>
  );
}
