
import { supabase } from '@/integrations/supabase/client';

/**
 * Generates an AI video using Heygen API with company metadata
 * @param text The text content for the video
 * @param avatarId The Heygen avatar ID to use
 * @param voiceId The Heygen voice ID to use
 * @param companyName The company name for tracking
 * @param campaignId Optional campaign ID to associate the video with
 * @param strategyId Optional strategy ID to associate the video with
 * @returns A promise with the result of the operation
 */
export const generateVideo = async (
  text: string,
  avatarId: string,
  voiceId: string,
  companyName: string,
  campaignId?: string,
  strategyId?: string
): Promise<{
  success: boolean;
  videoId?: string;
  status?: string;
  dbRecordId?: string;
  message?: string;
}> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to generate video');
    }

    // Call the Heygen edge function
    const { data, error } = await supabase.functions.invoke(
      "heygen",
      {
        body: {
          action: "generate-video",
          text,
          avatarId,
          voiceId,
          campaignId,
          strategyId,
          companyName // Add company metadata
        }
      }
    );

    if (error) {
      console.error('Error generating video:', error);
      return { 
        success: false, 
        message: error.message
      };
    }

    return {
      success: true,
      videoId: data.videoId,
      status: data.status,
      dbRecordId: data.dbRecordId
    };
  } catch (error) {
    console.error('Failed to generate video:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error generating video'
    };
  }
};

/**
 * Checks the status of a generated video
 * @param videoId The Heygen video ID to check
 * @returns A promise with the status information
 */
export const getVideoStatus = async (videoId: string): Promise<{
  success: boolean;
  status?: string;
  videoUrl?: string;
  message?: string;
}> => {
  try {
    // Call the Heygen edge function
    const { data, error } = await supabase.functions.invoke(
      "heygen",
      {
        body: {
          action: "get-video-status",
          text: videoId // The parameter is named 'text' in the edge function
        }
      }
    );

    if (error) {
      console.error('Error checking video status:', error);
      return { 
        success: false, 
        message: error.message
      };
    }

    return {
      success: true,
      status: data.status,
      videoUrl: data.videoUrl
    };
  } catch (error) {
    console.error('Failed to check video status:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error checking video status'
    };
  }
};

/**
 * Lists available avatars from Heygen
 * @returns A promise with the list of avatars
 */
export const listAvatars = async () => {
  try {
    // Call the Heygen edge function
    const { data, error } = await supabase.functions.invoke(
      "heygen",
      {
        body: {
          action: "list-avatars"
        }
      }
    );

    if (error) {
      console.error('Error listing avatars:', error);
      throw error;
    }

    return data.avatars || [];
  } catch (error) {
    console.error('Failed to list avatars:', error);
    return [];
  }
};

/**
 * Lists available voices from Heygen
 * @returns A promise with the list of voices
 */
export const listVoices = async () => {
  try {
    // Call the Heygen edge function
    const { data, error } = await supabase.functions.invoke(
      "heygen",
      {
        body: {
          action: "list-voices"
        }
      }
    );

    if (error) {
      console.error('Error listing voices:', error);
      throw error;
    }

    return data.voices || [];
  } catch (error) {
    console.error('Failed to list voices:', error);
    return [];
  }
};
