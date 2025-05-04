interface GitHubWebhookConfigSectionProps {
    onConfigureWebhook: (type: string) => void;
}
declare const GitHubWebhookConfigSection: ({ onConfigureWebhook }: GitHubWebhookConfigSectionProps) => JSX.Element;
export default GitHubWebhookConfigSection;
