export interface PricingTierData {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonVariant: "default" | "outline" | "secondary";
    popular: boolean;
    emoji: string;
    priceId?: string;
}
export interface FAQItem {
    question: string;
    answer: string;
}
export interface FeatureComparisonItem {
    category: string;
    features: {
        name: string;
        description?: string;
        starter: boolean | string;
        growth: boolean | string;
        enterprise: boolean | string;
    }[];
}
export declare const pricingTiers: PricingTierData[];
export declare const featureComparison: FeatureComparisonItem[];
export declare const faqItems: FAQItem[];
