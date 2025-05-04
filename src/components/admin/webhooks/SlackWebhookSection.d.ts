interface SlackWebhookSectionProps {
    slackWebhook: string;
    onSlackWebhookChange: (value: string) => void;
    onTestWebhook: () => void;
    isTestLoading: boolean;
}
declare const SlackWebhookSection: ({ slackWebhook, onSlackWebhookChange, onTestWebhook, isTestLoading }: SlackWebhookSectionProps) => JSX.Element;
export default SlackWebhookSection;
