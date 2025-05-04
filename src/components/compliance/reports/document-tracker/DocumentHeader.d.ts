interface DocumentHeaderProps {
    onCheckForUpdates: () => void;
    isCheckingUpdates: boolean;
    lastChecked: Date | null;
}
export default function DocumentHeader({ onCheckForUpdates, isCheckingUpdates, lastChecked }: DocumentHeaderProps): JSX.Element;
export {};
