var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCompanyId } from "@/hooks/useCompanyId";
import { toast } from "sonner";
export function usePlugins() {
    const [isLoading, setIsLoading] = useState(false);
    const [pluginImpact, setPluginImpact] = useState([]);
    const tenantId = useCompanyId();
    const recordPluginEvent = useCallback((event) => __awaiter(this, void 0, void 0, function* () {
        if (!tenantId) {
            console.error("No tenant ID available");
            return;
        }
        try {
            const { error } = yield supabase.from("plugin_logs").insert({
                tenant_id: tenantId,
                plugin_name: event.plugin_name,
                event: event.event,
                value: event.value,
            });
            if (error)
                throw error;
        }
        catch (error) {
            console.error("Error recording plugin event:", error);
            toast.error("Failed to record plugin event");
        }
    }), [tenantId]);
    const fetchPluginImpact = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!tenantId) {
            return [];
        }
        setIsLoading(true);
        try {
            // Call the plugin-impact edge function
            const { data, error } = yield supabase.functions.invoke("plugin-impact", {
                body: { tenant_id: tenantId },
            });
            if (error)
                throw error;
            setPluginImpact(data || []);
            return data || [];
        }
        catch (error) {
            console.error("Error fetching plugin impact data:", error);
            toast.error("Failed to load plugin impact data");
            return [];
        }
        finally {
            setIsLoading(false);
        }
    }), [tenantId]);
    const fetchPlugins = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const { data: plugins, error } = yield supabase
                .from("plugins")
                .select("id, name, impact_score, xp");
            if (error)
                throw error;
            return plugins;
        }
        catch (error) {
            console.error("Error fetching plugins:", error);
            toast.error("Failed to load plugins");
            return [];
        }
    }), []);
    return {
        isLoading,
        pluginImpact,
        recordPluginEvent,
        fetchPluginImpact,
        fetchPlugins,
    };
}
