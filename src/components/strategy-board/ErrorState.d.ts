interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}
export default function ErrorState({
  error,
  onRetry,
}: ErrorStateProps): JSX.Element;
export {};
