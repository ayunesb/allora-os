import { useState, useEffect } from 'react';
export function useCampaignFetch() {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            try {
                // Mock data with correct types
                const mockCampaigns = [
                    {
                        id: '1',
                        name: 'Summer Sale',
                        platform: 'meta',
                        budget: 5000,
                        status: 'active',
                        executiveBot: 'marketing-bot',
                        justification: 'Seasonal promotion',
                        roi: 2.5, // Ensure this is a number, not string
                        healthScore: '92%'
                    },
                    {
                        id: '2',
                        name: 'Product Launch',
                        platform: 'tiktok',
                        budget: 10000,
                        status: 'draft',
                        executiveBot: 'launch-bot',
                        justification: 'New product line',
                        roi: 0, // Ensure this is a number, not string
                        healthScore: 'N/A'
                    }
                ];
                setCampaigns(mockCampaigns);
            }
            catch (err) {
                setError(err.message || 'Failed to fetch campaigns');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCampaigns();
    }, []);
    return {
        campaigns,
        isLoading,
        error
    };
}
