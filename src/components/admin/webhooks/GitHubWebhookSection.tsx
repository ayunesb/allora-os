
import React, { useState, useEffect } from 'react';
import { Github, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";

interface GitHubWebhookSectionProps {
  githubWebhook: string;
  onGithubWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
}

const GitHubWebhookSection = ({ 
  githubWebhook, 
  onGithubWebhookChange,
  onTestWebhook,
  isTestLoading
}: GitHubWebhookSectionProps) => {
  const { isValid, validationMessage, validateUrl } = useWebhookValidation('github');
  const [isConnected, setIsConnected] = useState(false);

  // Check connection status on mount and when webhook URL changes
  useEffect(() => {
    // Check if we have a valid GitHub webhook URL stored
    setIsConnected(!!githubWebhook && isValid === true);
  }, [githubWebhook, isValid]);

  // Handle input change
  const handleGithubWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onGithubWebhookChange(value);
    validateUrl(value);
  };

  // Handle direct GitHub connect
  const handleDirectGitHubConnect = () => {
    // In a real implementation, this would open GitHub OAuth flow
    // For demo purposes, we'll simulate a successful connection
    toast.success("GitHub connection initiated");
    
    // Simulate the OAuth process 
    setTimeout(() => {
      const mockGitHubWebhookUrl = "https://api.github.com/repos/allora-ai/platform/hooks/12345678";
      onGithubWebhookChange(mockGitHubWebhookUrl);
      validateUrl(mockGitHubWebhookUrl);
      setIsConnected(true);
      toast.success("GitHub repository connected successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className={`h-4 w-4 ${isConnected ? 'text-green-500' : 'text-primary'}`} />
          <h3 className="text-sm font-medium">GitHub Integration</h3>
        </div>
        {isConnected ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Connected
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Not Connected
          </Badge>
        )}
      </div>
      
      <WebhookInput
        id="github-webhook"
        label="GitHub Webhook URL"
        placeholder="https://api.github.com/repos/username/repo/hooks/..."
        value={githubWebhook}
        onChange={handleGithubWebhookChange}
        isValid={isValid}
        errorMessage="Invalid GitHub webhook URL"
        validMessage="Valid GitHub webhook URL"
        validationMessage={validationMessage}
        description="Enter your GitHub webhook URL to receive repository events like pushes, pull requests, etc."
      />
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTestWebhook}
          disabled={isTestLoading || !githubWebhook || isValid !== true}
        >
          {isTestLoading ? "Testing..." : "Test Webhook"}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open("https://docs.github.com/en/developers/webhooks-and-events/webhooks", "_blank")}
        >
          GitHub Docs
        </Button>
        <Button 
          variant="default"
          size="sm"
          className="gap-2"
          onClick={handleDirectGitHubConnect}
        >
          <Link2 className="h-4 w-4" />
          Connect GitHub Directly
        </Button>
      </div>
    </div>
  );
};

export default GitHubWebhookSection;
