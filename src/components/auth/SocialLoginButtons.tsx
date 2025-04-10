
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function SocialLoginButtons() {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const { signInWithGitHub } = useAuth();

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    try {
      const { success, error } = await signInWithGitHub();
      if (!success && error) {
        toast.error(error);
      }
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("Failed to sign in with GitHub");
    } finally {
      setIsGitHubLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGitHubSignIn}
        disabled={isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
}
