interface ConnectPlatformsCardProps {
    metaConnected: boolean;
    tiktokConnected: boolean;
    isLoading: boolean;
    onProceed: () => void;
}
export default function ConnectPlatformsCard({ metaConnected, tiktokConnected, isLoading, onProceed }: ConnectPlatformsCardProps): import("react").JSX.Element;
export {};
