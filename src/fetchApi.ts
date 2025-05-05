export const fetchApi = async (url: string, options?: RequestInit) => {
  return await fetch(url, options);
};
