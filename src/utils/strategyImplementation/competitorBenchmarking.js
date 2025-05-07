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
// Fetch all competitor benchmarks for a strategy
export function fetchCompetitorBenchmarks(strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("competitor_benchmarks")
                .select("*")
                .eq("strategyId", strategyId)
                .order("marketShare", { ascending: false });
            if (error) {
                throw error;
            }
            return data || [];
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching competitor benchmarks: ${error.message}`);
            }
            return [];
        }
    });
}
// Create a new competitor benchmark
export function createCompetitorBenchmark(benchmark) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("competitor_benchmarks")
                .insert([
                Object.assign(Object.assign({}, benchmark), { created_at: new Date().toISOString() }),
            ])
                .select()
                .single();
            if (error) {
                throw error;
            }
            toast.success("Competitor benchmark added successfully");
            return data;
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Failed to add competitor benchmark: ${error.message}`);
            }
            return null;
        }
    });
}
// Update a competitor benchmark
export function updateCompetitorBenchmark(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("competitor_benchmarks")
                .update(updates)
                .eq("id", id);
            if (error) {
                throw error;
            }
            toast.success("Competitor benchmark updated successfully");
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Failed to update competitor benchmark: ${error.message}`);
            }
            return false;
        }
    });
}
// Delete a competitor benchmark
export function deleteCompetitorBenchmark(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("competitor_benchmarks")
                .delete()
                .eq("id", id);
            if (error) {
                throw error;
            }
            toast.success("Competitor benchmark deleted successfully");
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Failed to delete competitor benchmark: ${error.message}`);
            }
            return false;
        }
    });
}
// Calculate average market position relative to competitors
export function calculateMarketPosition(benchmarks) {
    if (benchmarks.length === 0) {
        return {
            averageStrength: 0,
            averageWeakness: 0,
            relativeMarketShare: 0,
            competitiveAdvantage: "Moderate",
        };
    }
    const averageStrength = benchmarks.reduce((sum, b) => sum + b.strengthScore, 0) / benchmarks.length;
    const averageWeakness = benchmarks.reduce((sum, b) => sum + b.weaknessScore, 0) / benchmarks.length;
    // Calculate total market share including your company
    const totalMarketShare = benchmarks.reduce((sum, b) => sum + b.marketShare, 0);
    // Assume your company has the remaining market share (this is simplified)
    const yourMarketShare = Math.max(0, 100 - totalMarketShare);
    // Calculate relative market share (your share divided by largest competitor)
    const largestCompetitorShare = Math.max(...benchmarks.map((b) => b.marketShare));
    const relativeMarketShare = yourMarketShare / largestCompetitorShare;
    // Determine competitive advantage
    let competitiveAdvantage;
    if (averageStrength > 7 && relativeMarketShare > 1) {
        competitiveAdvantage = "Strong";
    }
    else if (averageStrength < 4 || relativeMarketShare < 0.5) {
        competitiveAdvantage = "Weak";
    }
    else {
        competitiveAdvantage = "Moderate";
    }
    return {
        averageStrength,
        averageWeakness,
        relativeMarketShare,
        competitiveAdvantage,
    };
}
