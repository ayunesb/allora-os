var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function logPluginEvent(session, pluginId) {
    return __awaiter(this, void 0, void 0, function* () {
        const supabase = createClientComponentClient();
        yield supabase.from("plugin_logs").insert({
            tenant_id: session.user.id, // or map from plugin if needed
            plugin_name: pluginId, // assuming this is a string name (not UUID)
            event: "chat_response",
            value: 5,
        });
        yield supabase.rpc("evolve_plugin_agent_if_ready", {
            plugin_name: pluginId,
        });
    });
}
