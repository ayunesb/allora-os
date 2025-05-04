import { CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export function VerificationStatusContent({ status }) {
    if (status === "verified") {
        return (<Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-500"/>
        <AlertTitle className="text-green-700">Success!</AlertTitle>
        <AlertDescription className="text-green-600">
          Your email has been verified. You'll be redirected to the dashboard.
        </AlertDescription>
      </Alert>);
    }
    return (<Alert variant="destructive">
      <XCircle className="h-4 w-4"/>
      <AlertTitle>Verification Failed</AlertTitle>
      <AlertDescription>
        There was a problem verifying your email. Please try again or contact support.
      </AlertDescription>
    </Alert>);
}
