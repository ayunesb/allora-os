import { useMemo } from 'react';
export function useFilteredCampaigns(campaigns, activeTab) {
    return useMemo(() => {
        if (activeTab === 'all') {
            return campaigns;
        }
        if (activeTab === 'active') {
            return campaigns.filter(c => (c.deployment_status === 'deployed' && c.payment_status === 'paid') ||
                (c.status && c.status === 'active'));
        }
        if (activeTab === 'pending') {
            return campaigns.filter(c => c.deployment_status === 'pending' ||
                c.deployment_status === 'ready' ||
                c.payment_status !== 'paid' ||
                (c.status && c.status === 'draft'));
        }
        if (activeTab === 'meta') {
            return campaigns.filter(c => c.ad_platform === 'meta' ||
                c.platform === 'meta');
        }
        if (activeTab === 'tiktok') {
            return campaigns.filter(c => c.ad_platform === 'tiktok' ||
                c.platform === 'tiktok');
        }
        // Filter by status (ensuring case insensitivity)
        const normalizedTab = activeTab.toLowerCase();
        return campaigns.filter(c => c.status && c.status === normalizedTab);
    }, [campaigns, activeTab]);
}
