
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Video } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export default function WelcomeVideo() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          setIsLoading(false);
          return;
        }
        
        // If no video exists, generate one using Heygen API
        const companyName = profile?.company || 'your company';
        const userName = profile?.name?.split(' ')[0] || 'there';
        
        const { data, error } = await supabase.functions.invoke('heygen', {
          body: {
            action: 'generate-video',
            text: `Hello ${userName}! Welcome to Allora AI's Executive Advisory for ${companyName}. I'm excited to be your AI CEO and help you grow your business with strategies from our team of AI executives. Check out our recommendations in the dashboard and let's start growing your business today!`,
            avatarId: 'avatar_twinsen', // Use a professional avatar
            voiceId: 'voice_1', // Use a professional voice
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
              setIsLoading(false);
            }
            
            if (attempts >= maxAttempts) {
              clearInterval(pollInterval);
              setError("Video generation is taking longer than expected. Please check back later.");
              setIsLoading(false);
            }
          }, 5000); // Check every 5 seconds
          
          return () => clearInterval(pollInterval);
        }
      } catch (err: any) {
        console.error('Error generating welcome video:', err);
        setError("Unable to generate welcome video. Please try again later.");
        setIsLoading(false);
      }
    }
    
    fetchWelcomeVideo();
  }, [user?.id, profile]);

  const handleRegenerateVideo = () => {
    setIsLoading(true);
    setError(null);
    setVideoUrl(null);
    
    // The useEffect will automatically re-run
    toast.success("Generating a new welcome video for you!");
  };

  if (isLoading) {
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

  if (error) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Personalized Welcome</CardTitle>
          <CardDescription>There was an issue with your welcome video</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="flex flex-col items-center text-center">
            <Video className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
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
              poster="/images/ai-ceo-welcome.jpg"
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
