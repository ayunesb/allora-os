import { useState, useEffect, useTransition } from "react";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function useStrategies() {
    const [isPending, startTransition] = useTransition();
    const [strategies, setStrategies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { insights, isLoading: insightsLoading } = useCompanyInsights();
    const { profile } = useAuth();
    useEffect(() => {
        const fetchStrategies = async () => {
            if (!profile?.company_id) {
                // Don't attempt to fetch without a company ID
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                // Fetch real strategies from Supabase
                let { data: realStrategies, error: fetchError } = await supabase
                    .from('strategies')
                    .select('*')
                    .eq('company_id', profile.company_id);
                if (fetchError)
                    throw fetchError;
                // If no real strategies exist, use demo data as fallback
                const demoStrategies = [
                    {
                        id: '1',
                        title: "Expand to New Markets",
                        description: "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
                        risk: "Medium",
                        risk_level: "Medium",
                        company_id: profile.company_id,
                        created_at: new Date().toISOString(),
                        executiveBot: "Market Growth Expert"
                    },
                    {
                        id: '2',
                        title: "AI Automation",
                        description: "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
                        risk: "Low",
                        risk_level: "Low",
                        company_id: profile.company_id,
                        created_at: new Date().toISOString(),
                        executiveBot: "Technology Strategist"
                    },
                    {
                        id: '3',
                        title: "Disruptive Product Launch",
                        description: "Develop revolutionary product to disrupt industry standards and gain competitive advantage.",
                        risk: "High",
                        risk_level: "High",
                        company_id: profile.company_id,
                        created_at: new Date().toISOString(),
                        executiveBot: "Innovation Director"
                    }
                ];
                // Use real strategies if they exist, otherwise use demo data
                const strategies = (realStrategies && realStrategies.length > 0) ? realStrategies : demoStrategies;
                // Get strategy insights from AI
                const strategyInsights = insights.filter(insight => insight.type === "strategy");
                // Convert insights to strategy format
                const aiGeneratedStrategies = strategyInsights.map(insight => {
                    // Ensure riskLevel is one of the valid values
                    let riskLevel = "Medium";
                    // Extract risk level from description if possible
                    if (insight.description.includes("high-risk") || insight.description.includes("High risk")) {
                        riskLevel = "High";
                    }
                    else if (insight.description.includes("low-risk") || insight.description.includes("Low risk")) {
                        riskLevel = "Low";
                    }
                    // Store just the bot name as a string for executiveBot
                    // Extract just the name if primaryBot is an object, or use the string directly
                    const executiveBotName = typeof insight.primaryBot === 'object'
                        ? (insight.primaryBot?.name || "AI Executive")
                        : (insight.primaryBot || "AI Executive");
                    return {
                        id: `ai-${insight.id}`,
                        title: insight.title,
                        description: insight.description,
                        risk: riskLevel,
                        risk_level: riskLevel,
                        company_id: profile.company_id || "demo-company-id",
                        created_at: insight.createdAt.toISOString(),
                        executiveBot: executiveBotName,
                    };
                });
                // Combine AI strategies with existing ones
                startTransition(() => {
                    // Make sure there are no duplicates
                    const existingIds = new Set(strategies.map(s => s.id));
                    const newAiStrategies = aiGeneratedStrategies.filter(s => !existingIds.has(s.id));
                    setStrategies([...strategies, ...newAiStrategies]);
                });
                // Save strategies to Supabase if they don't exist already
                if (realStrategies.length === 0 && profile.company_id) {
                    try {
                        const { error: insertError } = await supabase
                            .from('strategies')
                            .insert(demoStrategies.map(s => ({
                            title: s.title,
                            description: s.description,
                            risk_level: s.risk_level,
                            company_id: profile.company_id,
                            executiveBot: s.executiveBot
                        })));
                        if (insertError)
                            console.error("Error inserting demo strategies:", insertError);
                    }
                    catch (err) {
                        console.error("Failed to save demo strategies:", err);
                    }
                }
            }
            catch (err) {
                console.error("Error fetching strategies:", err);
                setError(new Error(err.message || "Failed to load strategies"));
                // Use demo data as fallback on error
                setStrategies([
                    {
                        id: '1',
                        title: "Expand to New Markets",
                        description: "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
                        risk: "Medium",
                        risk_level: "Medium",
                        company_id: "demo-company-id",
                        created_at: new Date().toISOString(),
                        executiveBot: "Market Growth Expert"
                    },
                    {
                        id: '2',
                        title: "AI Automation",
                        description: "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
                        risk: "Low",
                        risk_level: "Low",
                        company_id: "demo-company-id",
                        created_at: new Date().toISOString(),
                        executiveBot: "Technology Strategist"
                    }
                ]);
            }
            finally {
                setIsLoading(false);
            }
        };
        if (!insightsLoading) {
            fetchStrategies();
        }
    }, [insights, insightsLoading, profile?.company_id, startTransition]);
    const refetch = async () => {
        setIsLoading(true);
        try {
            if (!profile?.company_id) {
                throw new Error("No company ID available");
            }
            const { data, error: fetchError } = await supabase
                .from('strategies')
                .select('*')
                .eq('company_id', profile.company_id);
            if (fetchError)
                throw fetchError;
            startTransition(() => {
                setStrategies(data || []);
                setError(null);
            });
            toast.success("Strategy data refreshed");
        }
        catch (err) {
            console.error("Error refetching strategies:", err);
            toast.error("Failed to refresh strategies");
        }
        finally {
            setIsLoading(false);
        }
    };
    return {
        strategies,
        isLoading: isLoading || isPending,
        error,
        refetch
    };
}
