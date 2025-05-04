import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
export async function createCreditPurchaseCheckout(params) {
    try {
        // Call to Supabase edge function or directly to Stripe API
        // This is a placeholder implementation - in a real app, you would call
        // your Stripe backend function to create a checkout session
        const { data, error } = await supabase.functions.invoke('stripe', {
            body: {
                action: 'createCheckoutSession',
                userId: params.userId,
                credits: params.credits,
                amount: params.priceUsd * 100, // Convert to cents
                mode: 'payment',
                successUrl: `${window.location.origin}/billing/success`,
                cancelUrl: `${window.location.origin}/checkout`
            }
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error('Failed to create checkout session:', error);
        toast.error('Payment initialization failed');
        throw error;
    }
}
export async function getCurrentCreditBalance() {
    try {
        const { data: user } = await supabase.auth.getUser();
        if (!user) {
            return 0;
        }
        const { data, error } = await supabase
            .from('billing_profiles')
            .select('credits')
            .eq('user_id', user.user.id)
            .single();
        if (error)
            throw error;
        return data?.credits || 0;
    }
    catch (error) {
        console.error('Failed to fetch credit balance:', error);
        return 0;
    }
}
