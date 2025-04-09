
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackUserAction } from '@/utils/selfLearningEngine';

export async function makeCall(to: string, userId?: string) {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'make-call', to }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success('Call initiated successfully');
      
      // Track this action in our self-learning system if we have userId
      if (userId) {
        await trackUserAction(
          userId,
          'initiate_call',
          'call_initiate',
          data.callSid,
          'phone_call',
          { to, success: true }
        );
      }
      
      return {
        success: true,
        callSid: data.callSid
      };
    } else {
      throw new Error(data.message || 'Failed to initiate call');
    }
  } catch (error: any) {
    toast.error(`Call error: ${error.message}`);
    
    // Track failed call attempt if we have userId
    if (userId) {
      await trackUserAction(
        userId,
        'failed_call',
        'call_initiate',
        undefined,
        'phone_call',
        { to, success: false, error: error.message }
      );
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getCallStatus(callSid: string) {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'get-call-status', callSid }
    });

    if (error) throw error;
    
    if (data.success) {
      return {
        success: true,
        status: data.status
      };
    } else {
      throw new Error(data.message || 'Failed to get call status');
    }
  } catch (error: any) {
    console.error('Call status error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}
