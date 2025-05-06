import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const returnToDashboard = () => {
    navigate("/dashboard");
  };
  React.useEffect(() => {
    if (sessionId) {
      toast.success("Payment completed successfully!");
    }
  }, [sessionId]);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                Thank you for your purchase. Your transaction has been completed
                successfully.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                <p>
                  Your payment confirmation ID:{" "}
                  <span className="font-mono text-xs">
                    {sessionId || "N/A"}
                  </span>
                </p>
                <p>
                  A confirmation email has been sent to your registered email
                  address.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-6">
              <Button onClick={returnToDashboard} className="w-full">
                Return to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                If you have any questions about your purchase, please contact
                our support team.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
