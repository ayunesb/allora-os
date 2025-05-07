var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
/**
 * Analyzes a Shopify store and provides optimization recommendations
 * @param storeId The Shopify store ID to analyze
 * @returns Promise with the optimization report
 */
export function analyzeShopifyStore(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, get store data
            const storeData = yield getShopifyStoreData(storeId);
            if (!storeData) {
                throw new Error("Store data not found");
            }
            // Generate recommendations based on store data
            const recommendations = yield generateStoreRecommendations(storeData);
            // Create optimization report
            const report = {
                storeId: storeData.id,
                storeName: storeData.name,
                score: calculateHealthScore(storeData, recommendations),
                recommendations,
                lastUpdated: new Date().toISOString(),
            };
            // Save report to database
            yield saveOptimizationReport(report);
            toast.success("Shopify store analysis complete");
            return report;
        }
        catch (error) {
            console.error("Error analyzing Shopify store:", error);
            toast.error(`Failed to analyze Shopify store: ${error.message}`);
            return null;
        }
    });
}
/**
 * Retrieves basic data about a Shopify store
 * @param storeId The Shopify store ID
 * @returns Promise with the store data
 */
function getShopifyStoreData(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Call the Shopify edge function to get store data
            const { data, error } = yield supabase.functions.invoke("shopify", {
                body: { action: "get-store-data", storeId },
            });
            if (error)
                throw error;
            if (data.success) {
                return data.store;
            }
            else {
                throw new Error(data.error || "Failed to get store data");
            }
        }
        catch (error) {
            console.error("Error getting Shopify store data:", error);
            return null;
        }
    });
}
/**
 * Generates optimization recommendations based on store data
 * @param storeData The Shopify store data
 * @returns Promise with the list of recommendations
 */
function generateStoreRecommendations(storeData) {
    return __awaiter(this, void 0, void 0, function* () {
        // This would typically call an AI service or follow predefined rules
        // For now, we'll return some sample recommendations
        const recommendations = [
            {
                id: crypto.randomUUID(),
                category: "seo",
                title: "Improve product descriptions",
                description: "Add more detailed product descriptions with relevant keywords to improve search engine visibility.",
                impact: "high",
                effort: "medium",
                automated: false,
                implemented: false,
            },
            {
                id: crypto.randomUUID(),
                category: "checkout",
                title: "Optimize checkout process",
                description: "Reduce number of steps in checkout process to improve conversion rate.",
                impact: "high",
                effort: "medium",
                automated: true,
                implemented: false,
            },
            {
                id: crypto.randomUUID(),
                category: "performance",
                title: "Optimize image sizes",
                description: "Compress product images to improve page load times.",
                impact: "medium",
                effort: "low",
                automated: true,
                implemented: false,
            },
        ];
        return recommendations;
    });
}
/**
 * Calculates a health score for the Shopify store
 * @param storeData The Shopify store data
 * @param recommendations The list of recommendations
 * @returns A health score from 0-100
 */
function calculateHealthScore(storeData, recommendations) {
    // This is a simplified scoring algorithm
    // In a real implementation, this would be more sophisticated
    // Start with a base score
    let score = 70;
    // Adjust based on store metrics if available
    if (storeData.conversion_rate) {
        // Boost score for good conversion rate (above 2%)
        score += storeData.conversion_rate > 0.02 ? 10 : 0;
    }
    // Reduce score based on high-impact issues
    const highImpactIssues = recommendations.filter((r) => r.impact === "high" && !r.implemented).length;
    score -= highImpactIssues * 5;
    // Ensure score stays within 0-100 range
    return Math.max(0, Math.min(100, score));
}
/**
 * Saves an optimization report to the database
 * @param report The optimization report to save
 * @returns Promise that resolves when the report is saved
 */
function saveOptimizationReport(report) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("shopify_optimization_reports")
                .upsert({
                store_id: report.storeId,
                store_name: report.storeName,
                score: report.score,
                recommendations: report.recommendations,
                last_updated: report.lastUpdated,
            });
            if (error)
                throw error;
        }
        catch (error) {
            console.error("Error saving optimization report:", error);
            // We'll just log the error but not rethrow to allow the function to complete
        }
    });
}
/**
 * Implements an optimization recommendation
 * @param storeId The Shopify store ID
 * @param recommendationId The recommendation ID to implement
 * @returns Promise indicating success
 */
export function implementOptimization(storeId, recommendationId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First, get the current report
            const { data: reportData, error: reportError } = yield supabase
                .from("shopify_optimization_reports")
                .select("*")
                .eq("store_id", storeId)
                .single();
            if (reportError)
                throw reportError;
            // Find the recommendation and mark it as implemented
            const report = reportData;
            const updatedRecommendations = report.recommendations.map((rec) => {
                if (rec.id === recommendationId) {
                    return Object.assign(Object.assign({}, rec), { implemented: true });
                }
                return rec;
            });
            // Save the updated report
            const { error: updateError } = yield supabase
                .from("shopify_optimization_reports")
                .update({
                recommendations: updatedRecommendations,
                score: calculateHealthScore({ id: report.storeId, name: report.storeName }, updatedRecommendations),
                last_updated: new Date().toISOString(),
            })
                .eq("store_id", storeId);
            if (updateError)
                throw updateError;
            toast.success("Optimization implemented successfully");
            return true;
        }
        catch (error) {
            console.error("Error implementing optimization:", error);
            toast.error(`Failed to implement optimization: ${error.message}`);
            return false;
        }
    });
}
