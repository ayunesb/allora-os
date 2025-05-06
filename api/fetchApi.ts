import type { ApiResponse } from "../types/api"; // Corrected path

export async function fetchApi<T>(
  url: string,
  options: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return {
      success: response.ok,
      data,
      status: response.status,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Unknown error",
      status: 500,
    };
  }
}
