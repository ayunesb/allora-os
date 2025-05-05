import { fetchApi } from './apiClient';

/**
 * Fetches strategy template drafts that can be published
 */
export const fetchTemplateDrafts = async () => {
  return await fetchApi('/api/vault/templates/drafts');
};

/**
 * Publishes a strategy template to make it publicly available
 */
export const publishTemplate = async (templateId: string) => {
  return await fetchApi(`/api/vault/templates/publish?id=${templateId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
};
