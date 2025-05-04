/**
 * Types for Shopify store optimization
 */
export interface ShopifyStoreData {
    id: string;
    name: string;
    url: string;
    domain: string;
    products_count: number;
    orders_count: number;
    conversion_rate?: number;
    average_order_value?: number;
    health_score?: number;
}
export interface OptimizationReport {
    storeId: string;
    storeName: string;
    score: number;
    recommendations: OptimizationRecommendation[];
    lastUpdated: string;
}
export interface OptimizationRecommendation {
    id: string;
    category: 'seo' | 'product' | 'checkout' | 'design' | 'performance' | 'marketing';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
    automated: boolean;
    implemented: boolean;
}
/**
 * Analyzes a Shopify store and provides optimization recommendations
 * @param storeId The Shopify store ID to analyze
 * @returns Promise with the optimization report
 */
export declare function analyzeShopifyStore(storeId: string): Promise<OptimizationReport | null>;
/**
 * Implements an optimization recommendation
 * @param storeId The Shopify store ID
 * @param recommendationId The recommendation ID to implement
 * @returns Promise indicating success
 */
export declare function implementOptimization(storeId: string, recommendationId: string): Promise<boolean>;
