
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NotFoundCard: React.FC = () => {
  return (
    <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="mb-4 text-destructive">
        <AlertCircle className="h-12 w-12" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold mb-2" id="not-found-title">Advisor not found</h2>
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>
          We couldn't find the executive advisor you're looking for.
          This may be because the advisor has been removed or the URL is incorrect.
        </AlertDescription>
      </Alert>
      <Link to="/dashboard/ai-bots" aria-labelledby="not-found-title">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Advisors</span>
        </Button>
      </Link>
    </CardContent>
  );
};

export default NotFoundCard;
