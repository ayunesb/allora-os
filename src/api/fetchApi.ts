import { fetchApi } from './fetchApi';

async function fetchApiPost(url: string, options: RequestInit) {
  return await fetch(url, { method: 'POST', ...options });
}

export { fetchApi, fetchApiPost };