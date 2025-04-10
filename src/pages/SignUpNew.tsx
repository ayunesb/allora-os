
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";
import EmailVerificationView from "@/components/auth/EmailVerificationView";
import SignupLayout from "@/components/auth/SignupLayout";
import { LegalAcceptanceModal } from "@/components/auth/LegalAcceptanceModal";
import { User } from "@supabase/supabase-js";

export default function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [newUser, setNewUser] = useState<User | null>(null);
  const [showLegalModal, setShowLegalModal] = useState(false);

  useEffect(() => {
    // Retrieve email from sessionStorage when component mounts or isSubmitted changes
    if (isSubmitted) {
      const email = sessionStorage.getItem('signupEmail') || "";
      setUserEmail(email);
    }
  }, [isSubmitted]);

  const handleSubmitSuccess = (user: User) => {
    setNewUser(user);
    setShowLegalModal(true);
  };
  
  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  const handleLegalAcceptance = () => {
    setShowLegalModal(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <SignupLayout>
        <EmailVerificationView 
          email={userEmail} 
          onTryAgain={handleTryAgain} 
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
