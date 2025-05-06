interface GitHubWebhookSectionProps {
  githubWebhook: string;
  onGithubWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
}
declare const GitHubWebhookSection: ({
  githubWebhook,
  onGithubWebhookChange,
  onTestWebhook,
  isTestLoading,
}: GitHubWebhookSectionProps) => JSX.Element;
export default GitHubWebhookSection;
