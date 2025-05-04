import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { onStrategyApproved } from '@/utils/zapierEventTriggers';
export function useStrategyTracking() {
    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const { user, profile } = useAuth();
    // Check if user is logged in
    const isLoggedIn = !!user?.id;
    const trackApproval = useCallback(async (strategyId, strategyTitle) => {
        if (!user?.id || !profile?.company_id) {
            toast.error('You must be logged in to approve strategies');
            return false;
        }
        setIsApproving(true);
        try {
            // Record the approval action in the strategy_actions table
            const { error } = await supabase.from('strategy_actions').insert({
                strategy_id: strategyId,
                user_id: user.id,
                action_type: 'approve',
                details: {
                    approved_at: new Date().toISOString(),
                    approved_by: user.email || 'Unknown user'
                }
            });
            if (error) {
                console.error('Error recording strategy approval:', error);
                toast.error('Failed to record strategy approval');
                return false;
            }
            // Update the strategy status
            const { error: updateError } = await supabase
                .from('strategies')
                .update({ status: 'approved', approved_by: user.id, approved_at: new Date().toISOString() })
                .eq('id', strategyId);
            if (updateError) {
                console.error('Error updating strategy status:', updateError);
                toast.error('Failed to update strategy status');
                return false;
            }
            // Trigger Zapier workflow for strategy approval
            await onStrategyApproved({
                strategyId,
                strategyTitle,
                companyId: profile.company_id,
                approvedBy: user.email || user.id
            });
            toast.success('Strategy approved successfully');
            return true;
        }
        catch (error) {
            console.error('Error in strategy approval process:', error);
            toast.error('An unexpected error occurred');
            return false;
        }
        finally {
            setIsApproving(false);
        }
    }, [user, profile]);
    const trackRejection = useCallback(async (strategyId, reason) => {
        if (!user?.id) {
            toast.error('You must be logged in to reject strategies');
            return false;
        }
        setIsRejecting(true);
        try {
            // Record the rejection action in the strategy_actions table
            const { error } = await supabase.from('strategy_actions').insert({
                strategy_id: strategyId,
                user_id: user.id,
                action_type: 'reject',
                details: {
                    rejected_at: new Date().toISOString(),
                    rejected_by: user.email || 'Unknown user',
                    reason: reason
                }
            });
            if (error) {
                console.error('Error recording strategy rejection:', error);
                toast.error('Failed to record strategy rejection');
                return false;
            }
            // Update the strategy status
            const { error: updateError } = await supabase
                .from('strategies')
                .update({ status: 'rejected', rejected_by: user.id, rejected_at: new Date().toISOString() })
                .eq('id', strategyId);
            if (updateError) {
                console.error('Error updating strategy status:', updateError);
                toast.error('Failed to update strategy status');
                return false;
            }
            toast.success('Strategy rejected successfully');
            return true;
        }
        catch (error) {
            console.error('Error in strategy rejection process:', error);
            toast.error('An unexpected error occurred');
            return false;
        }
        finally {
            setIsRejecting(false);
        }
    }, [user]);
    const trackShare = useCallback(async (strategyId, shareDetails) => {
        if (!user?.id) {
            toast.error('You must be logged in to share strategies');
            return false;
        }
        setIsSharing(true);
        try {
            // Record the share action in the strategy_actions table
            const { error } = await supabase.from('strategy_actions').insert({
                strategy_id: strategyId,
                user_id: user.id,
                action_type: 'share',
                details: {
                    shared_at: new Date().toISOString(),
                    shared_by: user.email || 'Unknown user',
                    ...shareDetails
                }
            });
            if (error) {
                console.error('Error recording strategy share:', error);
                toast.error('Failed to record strategy share');
                return false;
            }
            toast.success('Strategy shared successfully');
            return true;
        }
        catch (error) {
            console.error('Error in strategy share process:', error);
            toast.error('An unexpected error occurred');
            return false;
        }
        finally {
            setIsSharing(false);
        }
    }, [user]);
    // Add missing methods for strategy updates and filtering
    const trackStrategyUpdate = useCallback(async (strategyId, title, riskLevel) => {
        if (!user?.id) {
            toast.error('You must be logged in to update strategies');
            return false;
        }
        try {
            // Record the update action
            const { error } = await supabase.from('strategy_actions').insert({
                strategy_id: strategyId,
                user_id: user.id,
                action_type: 'update',
                details: {
                    updated_at: new Date().toISOString(),
                    updated_by: user.email || 'Unknown user',
                    title,
                    risk_level: riskLevel
                }
            });
            if (error) {
                console.error('Error recording strategy update:', error);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error('Error tracking strategy update:', error);
            return false;
        }
    }, [user]);
    const trackStrategyFilter = useCallback((filterType, filterValue) => {
        if (!user?.id)
            return;
        console.log(`User filtered strategies by ${filterType}: ${filterValue}`);
        // Here you could record this in analytics or in supabase
    }, [user]);
    return {
        trackApproval,
        trackRejection,
        trackShare,
        trackStrategyUpdate,
        trackStrategyFilter,
        isApproving,
        isRejecting,
        isSharing,
        isLoggedIn
    };
}
