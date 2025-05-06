import { fetchApi } from "@/services/api/fetchApi";
import { enhancedApiClient } from "@/api/enhancedApiClient";

export const templateAPI = async (params: any) => {
  await fetchApi(`/api/vault/templates/publish?id=${templateAPI}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
};
