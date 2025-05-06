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
import { toast } from "sonner";
export function fetchKPIMetrics() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("kpi_metrics")
                .select("*")
                .order("recorded_at", { ascending: false });
            if (error) {
                throw error;
            }
            return data || [];
        }
        catch (error) {
            console.error("Error fetching KPI metrics:", error);
            toast.error("Failed to load KPI data");
            return [];
        }
    });
}
export function createKPIMetric(metric) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("kpi_metrics")
                .insert(metric)
                .select()
                .single();
            if (error) {
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error("Error creating KPI metric:", error);
            toast.error("Failed to create KPI metric");
            return null;
        }
    });
}
export function updateKPIMetric(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("kpi_metrics")
                .update(updates)
                .eq("id", id)
                .select()
                .single();
            if (error) {
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error("Error updating KPI metric:", error);
            toast.error("Failed to update KPI metric");
            return null;
        }
    });
}
