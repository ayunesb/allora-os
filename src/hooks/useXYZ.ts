import { useState, useEffect } from "react";

export interface UseXYZResponse {
    data: string | null;
    isLoading: boolean;
    error: string | null;
}

export function useXYZ(): UseXYZResponse {
    const [data, setData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/xyz");
                const json = await res.json();
                setData(json.data);
            } catch (e: unknown) {
                if (e instanceof Error) setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, isLoading, error };
}
