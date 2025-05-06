import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

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
  category:
    | "seo"
    | "product"
    | "checkout"
    | "design"
    | "performance"
    | "marketing";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  automated: boolean;
  implemented: boolean;
}

/**
 * Analyzes a Shopify store and provides optimization recommendations
 * @param storeId The Shopify store ID to analyze
 * @returns Promise with the optimization report
 */
export async function analyzeShopifyStore(
  storeId: string,
): Promise<OptimizationReport | null> {
  try {
    // First, get store data
    const storeData = await getShopifyStoreData(storeId);
    if (!storeData) {
      throw new Error("Store data not found");
    }

    // Generate recommendations based on store data
    const recommendations = await generateStoreRecommendations(storeData);

    // Create optimization report
    const report: OptimizationReport = {
      storeId: storeData.id,
      storeName: storeData.name,
      score: calculateHealthScore(storeData, recommendations),
      recommendations,
      lastUpdated: new Date().toISOString(),
    };

    // Save report to database
    await saveOptimizationReport(report);

    toast.success("Shopify store analysis complete");
    return report;
  } catch (error: any) {
    console.error("Error analyzing Shopify store:", error);
    toast.error(`Failed to analyze Shopify store: ${error.message}`);
    return null;
  }
}

/**
 * Retrieves basic data about a Shopify store
 * @param storeId The Shopify store ID
 * @returns Promise with the store data
 */
async function getShopifyStoreData(
  storeId: string,
): Promise<ShopifyStoreData | null> {
  try {
    // Call the Shopify edge function to get store data
    const { data, error } = await supabase.functions.invoke("shopify", {
      body: { action: "get-store-data", storeId },
    });

    if (error) throw error;

    if (data.success) {
      return data.store;
    } else {
      throw new Error(data.error || "Failed to get store data");
    }
  } catch (error: any) {
    console.error("Error getting Shopify store data:", error);
    return null;
  }
}

/**
 * Generates optimization recommendations based on store data
 * @param storeData The Shopify store data
 * @returns Promise with the list of recommendations
 */
async function generateStoreRecommendations(
  storeData: ShopifyStoreData,
): Promise<OptimizationRecommendation[]> {
  // This would typically call an AI service or follow predefined rules
  // For now, we'll return some sample recommendations
  const recommendations: OptimizationRecommendation[] = [
    {
      id: crypto.randomUUID(),
      category: "seo",
      title: "Improve product descriptions",
      description:
        "Add more detailed product descriptions with relevant keywords to improve search engine visibility.",
      impact: "high",
      effort: "medium",
      automated: false,
      implemented: false,
    },
    {
      id: crypto.randomUUID(),
      category: "checkout",
      title: "Optimize checkout process",
      description:
        "Reduce number of steps in checkout process to improve conversion rate.",
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
}

/**
 * Calculates a health score for the Shopify store
 * @param storeData The Shopify store data
 * @param recommendations The list of recommendations
 * @returns A health score from 0-100
 */
function calculateHealthScore(
  storeData: ShopifyStoreData,
  recommendations: OptimizationRecommendation[],
): number {
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
  const highImpactIssues = recommendations.filter(
    (r) => r.impact === "high" && !r.implemented,
  ).length;
  score -= highImpactIssues * 5;

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
}

/**
 * Saves an optimization report to the database
 * @param report The optimization report to save
 * @returns Promise that resolves when the report is saved
 */
async function saveOptimizationReport(
  report: OptimizationReport,
): Promise<void> {
  try {
    const { error } = await supabase
      .from("shopify_optimization_reports")
      .upsert({
        store_id: report.storeId,
        store_name: report.storeName,
        score: report.score,
        recommendations: report.recommendations,
        last_updated: report.lastUpdated,
      });

    if (error) throw error;
  } catch (error: any) {
    console.error("Error saving optimization report:", error);
    // We'll just log the error but not rethrow to allow the function to complete
  }
}

/**
 * Implements an optimization recommendation
 * @param storeId The Shopify store ID
 * @param recommendationId The recommendation ID to implement
 * @returns Promise indicating success
 */
export async function implementOptimization(
  storeId: string,
  recommendationId: string,
): Promise<boolean> {
  try {
    // First, get the current report
    const { data: reportData, error: reportError } = await supabase
      .from("shopify_optimization_reports")
      .select("*")
      .eq("store_id", storeId)
      .single();

    if (reportError) throw reportError;

    // Find the recommendation and mark it as implemented
    const report = reportData as unknown as OptimizationReport;
    const updatedRecommendations = report.recommendations.map((rec) => {
      if (rec.id === recommendationId) {
        return { ...rec, implemented: true };
      }
      return rec;
    });

    // Save the updated report
    const { error: updateError } = await supabase
      .from("shopify_optimization_reports")
      .update({
        recommendations: updatedRecommendations,
        score: calculateHealthScore(
          { id: report.storeId, name: report.storeName } as ShopifyStoreData,
          updatedRecommendations,
        ),
        last_updated: new Date().toISOString(),
      })
      .eq("store_id", storeId);

    if (updateError) throw updateError;

    toast.success("Optimization implemented successfully");
    return true;
  } catch (error: any) {
    console.error("Error implementing optimization:", error);
    toast.error(`Failed to implement optimization: ${error.message}`);
    return false;
  }
}
