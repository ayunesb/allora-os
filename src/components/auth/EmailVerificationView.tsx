
import { RocketIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

interface EmailVerificationViewProps {
  email: string;
  onTryAgain: () => void;
}

export default function EmailVerificationView({ email, onTryAgain }: EmailVerificationViewProps) {
  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <RocketIcon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a verification email to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-muted">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Check your email</AlertTitle>
          <AlertDescription>
            Please check your email inbox and click the verification link to complete your registration.
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground text-center">
          If you don't see the email, check your spam folder or try logging in anyway - email verification may be disabled in development.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
        <Button onClick={onTryAgain}>
          Try Again
        </Button>
      </CardFooter>
    </Card>
  );
}
