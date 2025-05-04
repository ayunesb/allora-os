import type { ExecutiveBot } from "@/models/campaign";

export async function fetchApi(url: string, options?: RequestInit): Promise<Response> {
  return await fetch(url, options);
}

try {
  // ...existing code...
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Unknown error');
}