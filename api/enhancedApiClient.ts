export default async function enhancedApiClient(
  url: string,
  options: RequestInit
): Promise<any> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
