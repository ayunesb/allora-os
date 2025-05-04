import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useCompanyDetails } from '@/hooks/useCompanyDetails';
const sampleDebate = {
    topic: "Expanding into emerging markets with our SaaS product",
    summary: "The executive team debated the benefits and challenges of expanding our SaaS product into emerging markets, weighing market potential against operational complexity.",
    executives: [
        { id: "exec-1", name: "Elon Musk", role: "ceo", title: "CEO" },
        { id: "exec-2", name: "Warren Buffett", role: "cfo", title: "CFO" },
        { id: "exec-3", name: "Satya Nadella", role: "coo", title: "COO" },
        { id: "exec-4", name: "Sheryl Sandberg", role: "cmo", title: "CMO" }
    ],
    discussion: [
        { speaker: "Elon Musk", message: "I strongly believe we should aggressively expand into Southeast Asia first. The digital transformation happening there presents a unique opportunity for our SaaS solution. We could capture significant market share before competitors realize the potential." },
        { speaker: "Warren Buffett", message: "I'm concerned about the financial implications. These markets typically have lower price points, which could impact our margins. We should carefully analyze the unit economics before committing significant resources." },
        { speaker: "Satya Nadella", message: "From an operational perspective, we'd need to consider localization requirements - not just language, but also regulatory compliance and payment methods. I suggest starting with a limited offering in 1-2 countries first." },
        { speaker: "Sheryl Sandberg", message: "Marketing in these regions will require a different approach. We should leverage local partnerships and platforms rather than our usual channels. I'd recommend allocating budget for market research before full commitment." }
    ],
    conclusion: "The executive team recommends a phased approach, starting with a focused entry into Singapore and Vietnam, with clear success metrics before expanding further. This balances opportunity with responsible risk management."
};
export function useBoardroomData(companyId) {
    const [topic, setTopic] = useState('');
    const [summary, setSummary] = useState('');
    const [executives, setExecutives] = useState([]);
    const [discussion, setDiscussion] = useState([]);
    const [conclusion, setConclusion] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeoutError, setTimeoutError] = useState(false);
    const { profile } = useAuth();
    const { riskAppetite } = useCompanyDetails(companyId || undefined);
    useEffect(() => {
        let timer;
        async function fetchBoardroomDebate() {
            if (!companyId && !profile?.company_id) {
                setError("No company ID available. Please set up your company profile first.");
                setIsLoading(false);
                return;
            }
            const targetCompanyId = companyId || profile?.company_id;
            setIsLoading(true);
            setError(null);
            setTimeoutError(false);
            timer = setTimeout(() => {
                setTimeoutError(true);
            }, 8000);
            try {
                const { data, error } = await supabase
                    .from('ai_boardroom_debates')
                    .select('*')
                    .eq('company_id', targetCompanyId)
                    .order('created_at', { ascending: false })
                    .limit(1);
                clearTimeout(timer);
                if (error) {
                    console.error("Supabase error:", error);
                    if (error.code === 'PGRST116') {
                        setError("No boardroom debate found for this company. Try starting a new debate.");
                    }
                    else if (error.code === '42P01') {
                        setError("Executive boardroom functionality is not available. The required database table is missing.");
                    }
                    else {
                        throw new Error(`Failed to fetch boardroom debate: ${error.message}`);
                    }
                }
                else if (data && data.length > 0) {
                    const debateData = data[0];
                    setTopic(debateData.topic);
                    setSummary(debateData.summary || '');
                    setExecutives(debateData.executives || []);
                    setDiscussion(debateData.discussion || []);
                    setConclusion(debateData.conclusion || '');
                }
                else {
                    setError("No boardroom debates found. Start your first executive debate.");
                    // Set sample data for visual representation
                    setTopic(sampleDebate.topic);
                    setSummary(sampleDebate.summary);
                    setExecutives(sampleDebate.executives);
                    setDiscussion(sampleDebate.discussion);
                    setConclusion(sampleDebate.conclusion);
                }
            }
            catch (err) {
                clearTimeout(timer);
                console.error("Error fetching boardroom debate:", err);
                setError(err.message || "Failed to load boardroom debate.");
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchBoardroomDebate();
        return () => {
            clearTimeout(timer);
        };
    }, [companyId, profile?.company_id]);
    return {
        topic,
        summary,
        executives,
        discussion,
        conclusion,
        isLoading,
        error,
        timeoutError,
        sampleDebate
    };
}
