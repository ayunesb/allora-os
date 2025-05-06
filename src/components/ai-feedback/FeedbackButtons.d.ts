interface FeedbackButtonsProps {
  messageId?: string;
  interactionId?: string;
  botName: string;
  botRole: string;
  topic?: string;
  model?: string;
  onFeedbackSubmitted?: (isPositive: boolean) => void;
}
export default function FeedbackButtons({
  messageId,
  interactionId,
  botName,
  botRole,
  topic,
  model,
  onFeedbackSubmitted,
}: FeedbackButtonsProps): JSX.Element;
export {};
