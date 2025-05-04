import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useWebhooks() {
    const [filter, setFilter] = useState(undefined);
    const queryClient = useQueryClient();
    // Fetch webhooks
    const { data: webhooks, isLoading, error } = useQuery({
        queryKey: ['webhooks'],
        queryFn: async () => {
            let query = supabase.from('webhooks').select('*');
            if (filter?.type) {
                query = query.eq('type', filter.type);
            }
            if (filter?.url) {
                query = query.ilike('url', `%${filter.url}%`);
            }
            if (filter?.active !== undefined) {
                query = query.eq('active', filter.active);
            }
            const { data, error } = await query;
            if (error)
                throw error;
            return data;
        }
    });
    // Clear filter and refetch
    const clearFilterAndRefetch = useCallback(() => {
        setFilter(undefined);
        queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    }, [queryClient]);
    // Track event
    const trackEvent = useCallback((eventType) => {
        queryClient.invalidateQueries({ queryKey: ['webhooks'] });
    }, [queryClient]);
    // Create webhook
    const createWebhookMutation = useMutation({
        mutationFn: async (webhook) => {
            const { data, error } = await supabase
                .from('webhooks')
                .insert([webhook])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        },
        onSuccess: () => {
            toast.success('Webhook created successfully');
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
        onError: (err) => {
            toast.error(`Failed to create webhook: ${err.message}`);
        }
    });
    const createWebhook = async (data) => {
        return createWebhookMutation.mutateAsync(data);
    };
    // Update webhook
    const updateWebhookMutation = useMutation({
        mutationFn: async (webhook) => {
            const { id, ...updates } = webhook;
            const { data, error } = await supabase
                .from('webhooks')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        },
        onSuccess: () => {
            toast.success('Webhook updated successfully');
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
        onError: (err) => {
            toast.error(`Failed to update webhook: ${err.message}`);
        }
    });
    const updateWebhook = async (webhook) => {
        return updateWebhookMutation.mutateAsync(webhook);
    };
    // Delete webhook
    const deleteWebhookMutation = useMutation({
        mutationFn: async (id) => {
            const { data, error } = await supabase
                .from('webhooks')
                .delete()
                .eq('id', id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        },
        onSuccess: () => {
            toast.success('Webhook deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['webhooks'] });
        },
        onError: (err) => {
            toast.error(`Failed to delete webhook: ${err.message}`);
        }
    });
    const deleteWebhook = async (id) => {
        return deleteWebhookMutation.mutateAsync(id);
    };
    return {
        webhooks,
        isLoading,
        error,
        filter,
        setFilter,
        clearFilterAndRefetch,
        trackEvent,
        createWebhook,
        updateWebhook,
        deleteWebhook,
        isCreating: createWebhookMutation.isPending,
        isUpdating: updateWebhookMutation.isPending,
        isDeleting: deleteWebhookMutation.isPending
    };
}
