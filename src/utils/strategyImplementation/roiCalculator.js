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
// Calculate ROI based on provided inputs
export function calculateROI(initialInvestment, projectedRevenue, timeframeMonths, annualCosts) {
    // Convert annual costs to costs over the timeframe
    const timeframeCosts = (annualCosts / 12) * timeframeMonths;
    // Calculate profit over timeframe
    const profit = projectedRevenue - timeframeCosts - initialInvestment;
    // Calculate ROI as a percentage
    const roi = (profit / initialInvestment) * 100;
    return Math.round(roi * 100) / 100; // Round to 2 decimal places
}
// Fetch ROI data for a strategy
export function fetchStrategyROI(strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("strategy_roi")
                .select("*")
                .eq("strategyId", strategyId)
                .single();
            if (error && error.code !== "PGRST116") {
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error("Error fetching strategy ROI:", error.message);
            return null;
        }
    });
}
// Save or update ROI data for a strategy
export function saveStrategyROI(roiData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if ROI data already exists for this strategy
            const existing = yield fetchStrategyROI(roiData.strategyId);
            if (existing) {
                // Update existing ROI data
                const { data, error } = yield supabase
                    .from("strategy_roi")
                    .update(Object.assign(Object.assign({}, roiData), { lastUpdated: new Date().toISOString() }))
                    .eq("id", existing.id)
                    .select()
                    .single();
                if (error) {
                    throw error;
                }
                toast.success("ROI data updated successfully");
                return data;
            }
            else {
                // Create new ROI data
                const { data, error } = yield supabase
                    .from("strategy_roi")
                    .insert([
                    Object.assign(Object.assign({}, roiData), { lastUpdated: new Date().toISOString() }),
                ])
                    .select()
                    .single();
                if (error) {
                    throw error;
                }
                toast.success("ROI data saved successfully");
                return data;
            }
        }
        catch (error) {
            toast.error(`Failed to save ROI data: ${error.message}`);
            return null;
        }
    });
}
// Calculate the payback period (in months) for an investment
export function calculatePaybackPeriod(initialInvestment, monthlyRevenue, monthlyCosts) {
    const monthlyProfit = monthlyRevenue - monthlyCosts;
    if (monthlyProfit <= 0) {
        return Infinity; // Will never break even
    }
    return initialInvestment / monthlyProfit;
}
// Format currency for display
export function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
