export async function fetchApi<T = any>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
  return res.json();
}
