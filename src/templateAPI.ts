import { fetchApi } from '@/services/api/fetchApi';

export const templateAPI = async (params: any) => {
  await fetchApi('/api/plugin-event', {
    method: 'POST',
    body: JSON.stringify(params)
  });
};