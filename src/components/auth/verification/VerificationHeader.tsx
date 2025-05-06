import { RocketIcon, CheckCircle, XCircle } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
export function VerificationHeader({ verificationStatus, email }) {
  return (
    <>
      <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        {verificationStatus === "verified" ? (
          <CheckCircle className="h-8 w-8 text-green-500" />
        ) : verificationStatus === "failed" ? (
          <XCircle className="h-8 w-8 text-destructive" />
        ) : (
          <RocketIcon className="h-8 w-8 text-primary" />
        )}
      </div>
      <CardTitle className="text-2xl">
        {verificationStatus === "verified"
          ? "Email Verified!"
          : verificationStatus === "failed"
            ? "Verification Failed"
            : "Verify Your Email"}
      </CardTitle>
      <CardDescription>
        {verificationStatus === "verified"
          ? "You'll be redirected to the dashboard shortly"
          : verificationStatus === "failed"
            ? "There was a problem verifying your email"
            : `We've sent a verification email to ${email}`}
      </CardDescription>
    </>
  );
}
