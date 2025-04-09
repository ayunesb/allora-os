
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function makeCall(to: string) {
  try {
    const { data, error } = await supabase.functions.invoke('twilio', {
      body: { action: 'make-call', to }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success('Call initiated successfully');
      return {
        success: true,
        callSid: data.callSid
      };
    } else {
      throw new Error(data.message || 'Failed to initiate call');
    }
  } catch (error: any) {
    toast.error(`Call error: ${error.message}`);
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
