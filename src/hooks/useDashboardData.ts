
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Mock data fetching function - this would connect to your API
const fetchDashboardData = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendations: [
          { id: 1, title: 'Optimize your lead scoring model', description: 'Fine-tune your lead scoring model based on recent conversion patterns' },
          { id: 2, title: 'Schedule executive debate', description: 'Schedule a debate between AI executives about your latest strategy' },
          { id: 3, title: 'Review campaign performance', description: 'Your recent campaigns show promising results with room for optimization' }
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

export function useDashboardData(userId: string | undefined) {
  return useQuery({
    queryKey: ['dashboardData', userId],
    queryFn: () => fetchDashboardData(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false
  });
}
