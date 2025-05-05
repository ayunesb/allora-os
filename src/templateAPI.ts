import { fetchApi } from '@/services/api/fetchApi';
import { enhancedApiClient } from "@/api/enhancedApiClient";

export const templateAPI = async (params: any) => {
  await fetchApi('/api/plugin-event', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};