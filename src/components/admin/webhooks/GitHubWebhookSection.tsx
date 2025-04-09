
import React from 'react';
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from './WebhookInput';
import { useWebhookValidation } from './useWebhookValidation';

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

  // Handle input change
  const handleGithubWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onGithubWebhookChange(value);
    validateUrl(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md border-border/30 bg-muted/20">
      <div className="flex items-center gap-2">
        <Github className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">GitHub Integration</h3>
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
      
      <div className="flex gap-2">
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
          GitHub Webhooks Documentation
        </Button>
      </div>
    </div>
  );
};

export default GitHubWebhookSection;
