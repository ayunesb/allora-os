
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

// Define possible states for the component
type VideoState = 'loading' | 'error' | 'ready' | 'disabled';

export default function WelcomeVideo() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<VideoState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    async function fetchWelcomeVideo() {
      if (!user?.id) return;
      
      try {
        // Check if we already have a video for this user
        const { data: existingVideos, error: fetchError } = await supabase
          .from('generated_videos')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (fetchError) throw fetchError;
        
        if (existingVideos && existingVideos.length > 0 && existingVideos[0].video_url) {
          setVideoUrl(existingVideos[0].video_url);
          setVideoState('ready');
          return;
        }
        
        // If no video exists, check if there's a failed attempt
        const { data: failedVideos } = await supabase
          .from('generated_videos')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'error')
          .order('created_at', { ascending: false })
          .limit(1);
          
        // If there was a recent failed attempt, don't automatically try again
        if (failedVideos && failedVideos.length > 0) {
          setVideoState('error');
          setErrorMessage("Previous generation failed. You can try again if you'd like.");
          return;
        }
        
        // Check if the feature should be enabled
        const { data: featureFlags } = await supabase
          .from('feature_flags')
          .select('*')
          .eq('feature_name', 'welcome_video')
          .eq('is_enabled', true)
          .limit(1);
          
        if (!featureFlags || featureFlags.length === 0) {
          // Feature is disabled
          setVideoState('disabled');
          return;
        }
        
        // Generate a new video using Heygen API
        const companyName = profile?.company || 'your company';
        const userName = profile?.name?.split(' ')[0] || 'there';
        
        const { data, error } = await supabase.functions.invoke('heygen', {
          body: {
            action: 'generate-video',
            text: `Hello ${userName}! Welcome to Allora AI's Executive Advisory for ${companyName}. I'm excited to be your AI CEO and help you grow your business with strategies from our team of AI executives. Check out our recommendations in the dashboard and let's start growing your business today!`,
            avatarId: 'avatar_twinsen',
            voiceId: 'voice_1',
            companyName: companyName
          }
        });
        
        if (error) throw error;
        
        if (data?.videoId) {
          // Poll for video completion
          let attempts = 0;
          const maxAttempts = 20;
          const pollInterval = setInterval(async () => {
            attempts++;
            
            const { data: statusData, error: statusError } = await supabase.functions.invoke('heygen', {
              body: {
                action: 'get-video-status',
                text: data.videoId
              }
            });
            
            if (statusError) {
              clearInterval(pollInterval);
              throw statusError;
            }
            
            if (statusData?.videoUrl) {
              clearInterval(pollInterval);
              setVideoUrl(statusData.videoUrl);
              setVideoState('ready');
            }
            
            if (attempts >= maxAttempts) {
              clearInterval(pollInterval);
              setErrorMessage("Video generation is taking longer than expected. Please check back later.");
              setVideoState('error');
            }
          }, 5000); // Check every 5 seconds
          
          return () => clearInterval(pollInterval);
        }
      } catch (err: any) {
        console.error('Error generating welcome video:', err);
        setErrorMessage("Unable to generate welcome video. The service might be temporarily unavailable.");
        setVideoState('error');
      }
    }
    
    fetchWelcomeVideo();
  }, [user?.id, profile]);

  const handleRegenerateVideo = () => {
    setVideoState('loading');
    setErrorMessage(null);
    setVideoUrl(null);
    
    // The useEffect will automatically re-run
    toast.success("Generating a new welcome video for you!");
  };

  // When disabled, return null to remove from the dashboard
  if (videoState === 'disabled') {
    return null;
  }

  if (videoState === 'loading') {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Personalized Welcome</CardTitle>
          <CardDescription>Our AI CEO is preparing a personal message for you</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Generating your personalized welcome video...</p>
        </CardContent>
      </Card>
    );
  }

  if (videoState === 'error') {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Personalized Welcome</CardTitle>
          <CardDescription>There was an issue with your welcome video</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="flex flex-col items-center text-center">
            <Video className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">{errorMessage || "Unable to generate welcome video. Please try again later."}</p>
            <Button onClick={handleRegenerateVideo}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Personalized Welcome</CardTitle>
        <CardDescription>A personalized message from your AI executive team</CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        {videoUrl ? (
          <div className="aspect-video w-full">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-cover"
              poster="/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6">
            <Video className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No welcome video available.</p>
            <Button onClick={handleRegenerateVideo} className="mt-3">Generate Video</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
