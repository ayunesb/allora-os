export const fetchApi = async (
  url: string,
  options?: RequestInit,
): Promise<any> => {
  return fetch(url, options); // ✅ Adjusted to return a Promise
};
