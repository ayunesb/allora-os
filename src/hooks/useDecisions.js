import { useState, useEffect } from 'react';
import { getExecutiveDecisions } from "@/agents/decisionService";
export function useDecisions() {
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function loadDecisions() {
            try {
                setLoading(true);
                const decisionsData = await getExecutiveDecisions();
                setDecisions(decisionsData);
                setError(null);
            }
            catch (err) {
                console.error("Failed to load executive decisions:", err);
                setError("Could not load executive decisions. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        loadDecisions();
    }, []);
    return { decisions, loading, error };
}
