import React from 'react';
interface PricingTierProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    priceId?: string;
    buttonVariant?: "default" | "outline" | "secondary";
    popular?: boolean;
    emoji?: string;
    isRecommended?: boolean;
    isEnterprise?: boolean;
    currentPlan?: boolean;
}
declare const PricingTier: React.FC<PricingTierProps>;
export default PricingTier;
