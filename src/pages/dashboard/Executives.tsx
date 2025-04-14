
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Executives() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the AI Bots page
    navigate("/dashboard/ai-bots", { replace: true });
  }, [navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Redirecting to AI Executives...</p>
    </div>
  );
}
