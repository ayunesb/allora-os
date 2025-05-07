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
import { assessRiskLevel } from "@/utils/riskEngine";
export function fetchCompanyStrategies(companyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("strategies")
                .select("*")
                .eq("company_id", companyId)
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            // Cast the data to ensure it matches the Strategy type
            return (data || []).map((strategy) => (Object.assign(Object.assign({}, strategy), { riskLevel: strategy.risk_level })));
        }
        catch (error) {
            console.error("Error fetching strategies:", error.message);
            return [];
        }
    });
}
export function fetchStrategy(strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("strategies")
                .select("*")
                .eq("id", strategyId)
                .single();
            if (error) {
                throw error;
            }
            // Cast the data to ensure it matches the Strategy type
            return data
                ? Object.assign(Object.assign({}, data), { riskLevel: data.risk_level }) : null;
        }
        catch (error) {
            console.error("Error fetching strategy:", error.message);
            return null;
        }
    });
}
export function createStrategy(companyId, title, description, riskLevel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("strategies")
                .insert([
                {
                    company_id: companyId,
                    title,
                    description,
                    risk_level: riskLevel,
                },
            ])
                .select()
                .single();
            if (error) {
                throw error;
            }
            toast.success("Strategy created successfully");
            // Cast the data to ensure it matches the Strategy type
            return data
                ? Object.assign(Object.assign({}, data), { risk_level: data.risk_level }) : null;
        }
        catch (error) {
            toast.error(`Failed to create strategy: ${error.message}`);
            return null;
        }
    });
}
export function generateStrategyFromAnswers(companyId, answers) {
    return __awaiter(this, void 0, void 0, function* () {
        const riskLevel = answers.riskLevel || "Medium"; // Ensure riskLevel is defined
        const strategyTitle = `Strategy for ${companyId}`; // Ensure strategyTitle is defined
        const strategyDescription = `This is a ${riskLevel.toLowerCase()} risk strategy generated based on your business profile and risk assessment.`;
        // Now create the strategy with the basic template
        return yield createStrategy(companyId, strategyTitle, strategyDescription, riskLevel);
    });
}
export function updateStrategy(strategyId, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("strategies")
                .update(updates)
                .eq("id", strategyId);
            if (error) {
                throw error;
            }
            toast.success("Strategy updated successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to update strategy: ${error.message}`);
            return false;
        }
    });
}
export function deleteStrategy(strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase
                .from("strategies")
                .delete()
                .eq("id", strategyId);
            if (error) {
                throw error;
            }
            toast.success("Strategy deleted successfully");
            return true;
        }
        catch (error) {
            toast.error(`Failed to delete strategy: ${error.message}`);
            return false;
        }
    });
}
