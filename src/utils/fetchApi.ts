export async function fetchApi(url: string, options?: RequestInit) {
  return fetch(url, options);
}
