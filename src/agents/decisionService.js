var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";
export function getExecutiveDecisions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("executive_decisions")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) {
                throw error;
            }
            return (data || []).map((item) => ({
                id: item.id,
                executiveName: item.executive_name,
                executiveRole: item.executive_role,
                task: item.task,
                options: item.options,
                selectedOption: item.selected_option,
                reasoning: item.reasoning,
                riskAssessment: item.risk_assessment,
                timestamp: item.created_at,
                priority: item.priority,
            }));
        }
        catch (error) {
            logger.error("Failed to get executive decisions from database", error);
            return [];
        }
    });
}
export function saveDecisionToDatabase(decision) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { data, error } = yield supabase
                .from("executive_decisions")
                .insert([
                {
                    executive_name: decision.executiveName,
                    executive_role: decision.executiveRole,
                    task: decision.task,
                    options: decision.options,
                    selected_option: decision.selectedOption,
                    reasoning: decision.reasoning,
                    risk_assessment: decision.riskAssessment,
                    priority: decision.priority,
                    created_at: decision.timestamp,
                },
            ])
                .select();
            if (error) {
                throw error;
            }
            return ((_a = data === null || data === void 0 ? void 0 : data[0]) === null || _a === void 0 ? void 0 : _a.id) || null;
        }
        catch (error) {
            logger.error("Failed to save executive decision to database", error, {
                executiveName: decision.executiveName,
                task: decision.task,
            });
            return null;
        }
    });
}
