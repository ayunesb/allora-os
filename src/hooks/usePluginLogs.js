var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/lib/supabase";
export function logPluginExecution(pluginId, strategyId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield supabase.from("plugin_logs").insert({
            plugin_id: pluginId,
            strategy_id: strategyId,
            context: "executed",
        });
        yield supabase.rpc("increment_plugin_xp", { plugin_id: pluginId });
    });
}
