export async function fetchApi(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(url, options);
}