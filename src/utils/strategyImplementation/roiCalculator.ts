import { StrategyRoi } from "@/models/strategyImplementation";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

// Calculate ROI based on provided inputs
export function calculateROI(
  initialInvestment: number,
  projectedRevenue: number,
  timeframeMonths: number,
  annualCosts: number,
): number {
  // Convert annual costs to costs over the timeframe
  const timeframeCosts = (annualCosts / 12) * timeframeMonths;

  // Calculate profit over timeframe
  const profit = projectedRevenue - timeframeCosts - initialInvestment;

  // Calculate ROI as a percentage
  const roi = (profit / initialInvestment) * 100;

  return Math.round(roi * 100) / 100; // Round to 2 decimal places
}

// Fetch ROI data for a strategy
export async function fetchStrategyROI(
  strategyId: string,
): Promise<StrategyRoi | null> {
  try {
    const { data, error } = await supabase
      .from("strategy_roi")
      .select("*")
      .eq("strategyId", strategyId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching strategy ROI:", error.message);
    return null;
  }
}

// Save or update ROI data for a strategy
export async function saveStrategyROI(
  roiData: Omit<StrategyRoi, "id" | "lastUpdated">,
): Promise<StrategyRoi | null> {
  try {
    // Check if ROI data already exists for this strategy
    const existing = await fetchStrategyROI(roiData.strategyId);

    if (existing) {
      // Update existing ROI data
      const { data, error } = await supabase
        .from("strategy_roi")
        .update({
          ...roiData,
          lastUpdated: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast.success("ROI data updated successfully");
      return data;
    } else {
      // Create new ROI data
      const { data, error } = await supabase
        .from("strategy_roi")
        .insert([
          {
            ...roiData,
            lastUpdated: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast.success("ROI data saved successfully");
      return data;
    }
  } catch (error: any) {
    toast.error(`Failed to save ROI data: ${error.message}`);
    return null;
  }
}

// Calculate the payback period (in months) for an investment
export function calculatePaybackPeriod(
  initialInvestment: number,
  monthlyRevenue: number,
  monthlyCosts: number,
): number {
  const monthlyProfit = monthlyRevenue - monthlyCosts;

  if (monthlyProfit <= 0) {
    return Infinity; // Will never break even
  }

  return initialInvestment / monthlyProfit;
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
