import { ExecutiveBot } from '@/types/fixed/ExecutiveBot';

export async function fetchApi(url: string, options?: RequestInit): Promise<Response> {
  return fetch(url, options);
}