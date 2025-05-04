interface Alert {
    id: string;
    message: string;
    link?: string;
    linkText?: string;
    affectedStrategies?: string[];
    trendReport?: {
        title: string;
        content: string;
        insights: string[];
        recommendations: string[];
        relatedStrategies: string[];
        externalLink?: string;
    };
}
interface MarketAlertBannerProps {
    alerts: Alert[];
    onDismiss?: (id: string) => void;
}
export default function MarketAlertBanner({ alerts, onDismiss }: MarketAlertBannerProps): JSX.Element;
export {};
