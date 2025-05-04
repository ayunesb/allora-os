interface AdPlatformsConnectionProps {
    onComplete?: () => Promise<void>;
    companyName: string;
    isLoading?: boolean;
}
export declare function AdPlatformsConnection({ onComplete, companyName, isLoading: externalLoading }: AdPlatformsConnectionProps): import("react").JSX.Element;
export {};
