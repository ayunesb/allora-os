var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }
        const { pluginName, rollbackVersion } = req.body;
        if (!pluginName || !rollbackVersion) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {
            // Authenticate the request (e.g., check user roles or permissions)
            const { data: user, error: authError } = yield supabase.auth.getUser(req.headers.authorization || "");
            if (authError || !user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            // Perform rollback logic
            const { error: rollbackError } = yield supabase
                .from("plugin_versions")
                .update({ current_version: rollbackVersion })
                .eq("plugin_name", pluginName);
            if (rollbackError) {
                return res
                    .status(500)
                    .json({ error: "Failed to rollback plugin version" });
            }
            res.status(200).json({ message: "Rollback successful" });
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
