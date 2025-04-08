
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import SignupForm, { SignupValues } from "@/components/auth/SignupForm";
import EmailVerificationView from "@/components/auth/EmailVerificationView";
import SignupLayout from "@/components/auth/SignupLayout";

export default function Signup() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
  };
  
  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  // Pass email to verification view when form is submitted
  const handleFormSubmit = (data: SignupValues) => {
    setUserEmail(data.email);
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
          <SignupForm onSubmitSuccess={handleSubmitSuccess} />
        </CardContent>
      </Card>
    </SignupLayout>
  );
}
