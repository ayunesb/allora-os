
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const NotFoundCard: React.FC = () => {
  return (
    <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-xl font-semibold mb-2">Advisor not found</h2>
      <p className="text-muted-foreground mb-4">
        We couldn't find the executive advisor you're looking for.
      </p>
      <Link to="/dashboard/ai-bots">
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Advisors</span>
        </Button>
      </Link>
    </CardContent>
  );
};

export default NotFoundCard;
