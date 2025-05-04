import { useQuery } from '@tanstack/react-query';
// Mock data fetching function - this would connect to your API
const fetchDashboardData = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                recommendations: [
                    {
                        id: "rec-1", // Changed from numeric to string ID
                        title: 'Optimize your lead scoring model',
                        description: 'Fine-tune your lead scoring model based on recent conversion patterns',
                        type: 'strategy',
                        executiveBot: {
                            name: 'Mark Cuban',
                            role: 'Marketing Strategist'
                        },
                        expectedImpact: 78,
                        timeframe: '2-4 weeks'
                    },
                    {
                        id: "rec-2", // Changed from numeric to string ID
                        title: 'Schedule executive debate',
                        description: 'Schedule a debate between AI executives about your latest strategy',
                        type: 'strategy',
                        executiveBot: {
                            name: 'Satya Nadella',
                            role: 'CEO'
                        },
                        expectedImpact: 65,
                        timeframe: 'Immediate'
                    },
                    {
                        id: "rec-3", // Changed from numeric to string ID
                        title: 'Review campaign performance',
                        description: 'Your recent campaigns show promising results with room for optimization',
                        type: 'campaign',
                        executiveBot: {
                            name: 'Gary Vaynerchuk',
                            role: 'Marketing Expert'
                        },
                        expectedImpact: 82,
                        timeframe: '1-2 weeks'
                    }
                ],
                metrics: {
                    leadConversion: 12.4,
                    campaignROI: 3.2,
                    engagementRate: 28.7
                },
                recentActivities: [
                    { id: 1, type: 'strategy', title: 'New market expansion strategy created', date: new Date() },
                    { id: 2, type: 'lead', title: 'Lead scoring model updated', date: new Date(Date.now() - 86400000) }
                ]
            });
        }, 500);
    });
};
export function useDashboardData(userId) {
    return useQuery({
        queryKey: ['dashboardData', userId],
        queryFn: () => fetchDashboardData(userId),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
        refetchOnWindowFocus: false
    });
}
