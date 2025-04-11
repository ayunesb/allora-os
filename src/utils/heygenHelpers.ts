
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Maximum number of retries for API calls
const MAX_RETRIES = 3;

/**
 * Generates a video using the Heygen API with retry capability
 */
export async function generateVideo(
  text: string, 
  avatarId: string, 
  voiceId: string, 
  companyName: string,
  campaignId?: string, 
  strategyId?: string,
  retryCount = 0
) {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { 
        action: 'generate-video', 
        text, 
        avatarId, 
        voiceId, 
        campaignId, 
        strategyId,
        companyName 
      }
    });

    if (error) throw error;
    
    if (data && data.videoId) {
      return {
        success: true,
        videoId: data.videoId,
        status: data.status || 'processing',
        dbRecordId: data.dbRecordId
      };
    } else {
      throw new Error(data?.error || 'Failed to generate video');
    }
  } catch (error: any) {
    console.error(`Video generation error (attempt ${retryCount + 1}):`, error.message);
    
    // Implement retry logic for transient errors
    if (retryCount < MAX_RETRIES) {
      // Exponential backoff: wait longer between each retry
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
      return generateVideo(text, avatarId, voiceId, companyName, campaignId, strategyId, retryCount + 1);
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getVideoStatus(videoId: string, retryCount = 0) {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'get-video-status', text: videoId }
    });

    if (error) throw error;
    
    if (data) {
      return {
        success: true,
        status: data.status,
        videoUrl: data.videoUrl
      };
    } else {
      throw new Error('Failed to get video status');
    }
  } catch (error: any) {
    console.error(`Video status error (attempt ${retryCount + 1}):`, error.message);
    
    // Implement retry logic for transient errors
    if (retryCount < MAX_RETRIES) {
      // Only retry for network errors, not for application errors
      if (error.message.includes('network') || error.message.includes('timeout')) {
        // Exponential backoff: wait longer between each retry
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        return getVideoStatus(videoId, retryCount + 1);
      }
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Polls the video status until it's completed or fails
 */
export async function pollVideoStatus(videoId: string, onStatusChange?: (status: string, url?: string) => void) {
  let attempts = 0;
  const maxAttempts = 60; // Poll for up to 5 minutes (assuming 5s interval)
  
  const poll = async () => {
    if (attempts >= maxAttempts) {
      onStatusChange?.('timeout', undefined);
      return;
    }
    
    attempts++;
    const result = await getVideoStatus(videoId);
    
    if (!result.success) {
      // If there was an error, wait a bit longer before retrying
      onStatusChange?.('error', undefined);
      setTimeout(poll, 10000); // 10 seconds
      return;
    }
    
    onStatusChange?.(result.status || 'unknown', result.videoUrl);
    
    if (result.status === 'completed') {
      return;
    }
    
    // Continue polling
    setTimeout(poll, 5000); // 5 seconds
  };
  
  // Start polling
  await poll();
}

export async function listHeygenAvatars() {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'list-avatars' }
    });

    if (error) throw error;
    
    if (data) {
      return data.avatars || [];
    } else {
      throw new Error('Failed to list avatars');
    }
  } catch (error: any) {
    console.error(`Error listing avatars:`, error.message);
    return [];
  }
}

export async function listHeygenVoices() {
  try {
    const { data, error } = await supabase.functions.invoke('heygen', {
      body: { action: 'list-voices' }
    });

    if (error) throw error;
    
    if (data) {
      return data.voices || [];
    } else {
      throw new Error('Failed to list voices');
    }
  } catch (error: any) {
    console.error(`Error listing voices:`, error.message);
    return [];
  }
}
