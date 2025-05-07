export async function fetchApi<T>(url: string, options: RequestInit): Promise<T> {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Fetch API error:", error.message);
        }
        throw error;
    }
}
