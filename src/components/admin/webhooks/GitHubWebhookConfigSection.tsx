import React, { useState, useEffect } from "react";
import { Github, AlertCircle, Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWebhookValidation } from "./useWebhookValidation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
const GitHubWebhookConfigSection = ({ onConfigureWebhook }) => {
  const [githubWebhook, setGithubWebhook] = useState(
    localStorage.getItem("github_webhook_url") || "",
  );
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(
    !!localStorage.getItem("github_webhook_url"),
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const { isValid, validationMessage, validateUrl } =
    useWebhookValidation("github");
  useEffect(() => {
    // Validate the URL when component mounts
    if (githubWebhook) {
      validateUrl(githubWebhook);
    }
  }, []);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setGithubWebhook(value);
    validateUrl(value);
  };
  const testGitHubWebhook = async () => {
    if (!githubWebhook) {
      toast.error("Please enter a GitHub webhook URL first");
      return;
    }
    if (isValid !== true) {
      toast.error("Please enter a valid GitHub webhook URL");
      return;
    }
    setIsTestLoading(true);
    // Simulate webhook testing
    setTimeout(() => {
      localStorage.setItem("github_webhook_url", githubWebhook);
      setIsConnected(true);
      setIsTestLoading(false);
      toast.success("GitHub webhook connection successful!");
    }, 1500);
  };
  const handleDirectGitHubConnect = () => {
    setIsConnecting(true);
    // Simulate GitHub OAuth flow and webhook setup
    toast.success("GitHub connection initiated");
    // Simulate the OAuth process with a timeout
    setTimeout(() => {
      const mockGitHubWebhookUrl =
        "https://api.github.com/repos/allora-ai/platform/hooks/12345678";
      setGithubWebhook(mockGitHubWebhookUrl);
      validateUrl(mockGitHubWebhookUrl);
      localStorage.setItem("github_webhook_url", mockGitHubWebhookUrl);
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("GitHub repository connected successfully!");
    }, 2000);
  };
  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github
            className={`h-5 w-5 ${isConnected ? "text-green-500" : "text-muted-foreground"}`}
          />
          <h3 className="font-medium">GitHub Webhooks</h3>
        </div>
        {isConnected ? (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Connected
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Not Connected
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="github-webhook-url">GitHub Webhook URL</Label>
        <div className="flex gap-2">
          <Input
            id="github-webhook-url"
            placeholder="https://api.github.com/repos/username/repo/hooks/..."
            value={githubWebhook}
            onChange={handleInputChange}
            className={!isValid && githubWebhook ? "border-red-500" : ""}
          />
          <Button
            type="button"
            variant="outline"
            onClick={testGitHubWebhook}
            disabled={isTestLoading || !githubWebhook || isValid !== true}
          >
            {isTestLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing
              </>
            ) : (
              "Test"
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your GitHub webhook URL to receive repository events like
          pushes, pull requests, etc.
        </p>
      </div>

      {!isValid && githubWebhook && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {validationMessage || "Invalid GitHub webhook URL format"}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            window.open(
              "https://docs.github.com/en/developers/webhooks-and-events/webhooks",
              "_blank",
            )
          }
        >
          GitHub Docs
        </Button>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleDirectGitHubConnect}
            disabled={isConnecting}
            className="gap-2"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                Connect GitHub
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onConfigureWebhook("github")}
          >
            Advanced Config
          </Button>
        </div>
      </div>
    </div>
  );
};
export default GitHubWebhookConfigSection;
