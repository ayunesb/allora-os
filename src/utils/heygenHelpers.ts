
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

export async function generateVideo(
  text: string, 
  avatarId: string, 
  voiceId: string, 
  campaignId?: string, 
  strategyId?: string
) {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'generate-video', text, avatarId, voiceId, campaignId, strategyId }
    });

    if (error) throw error;
    
    if (data.success) {
      toast.success('Video generation started');
      return data;
    } else {
      throw new Error(data.error || 'Failed to generate video');
    }
  } catch (error: any) {
    toast.error(`Video generation error: ${error.message}`);
    return null;
  }
}

export async function getVideoStatus(videoId: string) {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'get-video-status', text: videoId }
    });

    if (error) throw error;
    
    if (data.success) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to get video status');
    }
  } catch (error: any) {
    console.error(`Video status error: ${error.message}`);
    return null;
  }
}

export async function listHeygenAvatars() {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'list-avatars' }
    });

    if (error) throw error;
    
    if (data.success) {
      return data.avatars || [];
    } else {
      throw new Error(data.error || 'Failed to list avatars');
    }
  } catch (error: any) {
    toast.error(`Avatar list error: ${error.message}`);
    return [];
  }
}

export async function listHeygenVoices() {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'list-voices' }
    });

    if (error) throw error;
    
    if (data.success) {
      return data.voices || [];
    } else {
      throw new Error(data.error || 'Failed to list voices');
    }
  } catch (error: any) {
    toast.error(`Voice list error: ${error.message}`);
    return [];
  }
}
