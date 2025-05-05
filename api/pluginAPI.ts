import { enhancedApiClient } from "./enhancedApiClient"; // Corrected path
import type { ApiResponse, PluginEventParams } from "../types/api"; // Corrected path

export async function firePluginEvent(params: PluginEventParams): Promise<ApiResponse<{ success: boolean }>> {
  // Validate params
  if (!params || typeof params !== "object") {
    throw new Error("Invalid plugin event parameters");
  }

  return await enhancedApiClient("/api/plugin-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params),
  });
}
