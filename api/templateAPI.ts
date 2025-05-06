import { enhancedApiClient } from "../api/enhancedApiClient"; // Corrected path
import type { ApiResponse } from "../../types/api"; // Corrected path

export async function publishTemplate(
  templateId: string,
): Promise<ApiResponse<{ success: boolean }>> {
  if (!templateId) throw new Error("Missing template ID");

  return await enhancedApiClient(
    `/api/vault/templates/publish?id=${templateId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
