import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pluginName, rollbackVersion } = req.body;

  if (!pluginName || !rollbackVersion) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Authenticate the request (e.g., check user roles or permissions)
    const { data: user, error: authError } = await supabase.auth.getUser(req.headers.authorization || "");
    if (authError || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Perform rollback logic
    const { error: rollbackError } = await supabase
      .from("plugin_versions")
      .update({ current_version: rollbackVersion })
      .eq("plugin_name", pluginName);

    if (rollbackError) {
      return res.status(500).json({ error: "Failed to rollback plugin version" });
    }

    res.status(200).json({ message: "Rollback successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
