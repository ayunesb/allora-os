
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Play, Volume2 } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { pollVideoStatus } from '@/utils/heygenHelpers';

export default function WelcomeVideo() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasWatched, setHasWatched] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const { user, profile } = useAuth();
  
  useEffect(() => {
    const fetchWelcomeVideo = async () => {
      if (!user?.id) return;
      
      try {
        // Check if user has a welcome video
        const { data, error } = await supabase
          .from('generated_videos')
          .select('*')
          .eq('user_id', user.id)
          .eq('video_type', 'welcome')
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (error) throw error;
        
        if (data && data.length > 0 && data[0].status === 'completed') {
          setVideoUrl(data[0].video_url);
          
          // Check if user has watched this video
          const { data: activity } = await supabase
            .from('user_activity')
            .select('*')
            .eq('user_id', user.id)
            .eq('activity_type', 'video_watched')
            .eq('activity_data->video_id', data[0].id)
            .limit(1);
            
          if (activity && activity.length > 0) {
            setHasWatched(true);
            setShowVideo(false);
          }
        } else if (data && data.length > 0 && data[0].status === 'processing') {
          // If video is still processing, start polling for status
          pollVideoStatus(data[0].video_id, (status, url) => {
            if (status === 'completed' && url) {
              setVideoUrl(url);
              
              // Update the video record in the database
              supabase
                .from('generated_videos')
                .update({ 
                  status: 'completed',
                  video_url: url
                })
                .eq('id', data[0].id)
                .then(() => console.log("Video record updated with URL"));
            }
          });
        }
      } catch (error) {
        console.error("Error fetching welcome video:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWelcomeVideo();
  }, [user?.id]);
  
  const handleVideoWatched = async () => {
    if (!user?.id || !videoUrl) return;
    
    try {
      const { data } = await supabase
        .from('generated_videos')
        .select('id')
        .eq('user_id', user.id)
        .eq('video_type', 'welcome')
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (data && data.length > 0) {
        // Record that the user watched this video
        await supabase
          .from('user_activity')
          .insert([
            {
              user_id: user.id,
              activity_type: 'video_watched',
              activity_data: { 
                video_id: data[0].id,
                video_type: 'welcome' 
              }
            }
          ]);
          
        setHasWatched(true);
        toast.success("Thanks for watching your personalized welcome message!");
      }
    } catch (error) {
      console.error("Error recording video watched:", error);
    }
  };
  
  const handleDismiss = () => {
    setShowVideo(false);
  };
  
  // Hide the component if there's no video or user chose to dismiss
  if (!showVideo || (!videoUrl && !isLoading)) {
    return null;
  }
  
  return (
    <Card className="shadow-md overflow-hidden bg-primary/5 animate-fadeIn">
      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Preparing your personalized welcome...</p>
          </div>
        ) : videoUrl ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Welcome to Allora AI, {profile?.name?.split(' ')[0] || 'there'}!
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDismiss}
                className="text-muted-foreground"
              >
                Dismiss
              </Button>
            </div>
            
            <div className="relative aspect-video rounded-md overflow-hidden">
              <video 
                src={videoUrl} 
                className="w-full h-full object-cover" 
                controls
                onEnded={handleVideoWatched}
                poster="/assets/video-thumbnail.jpg"
              />
              {!hasWatched && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="icon" 
                    className="h-12 w-12 rounded-full bg-primary/90 hover:bg-primary"
                    onClick={() => {
                      const videoElement = document.querySelector('video');
                      if (videoElement) {
                        videoElement.play();
                        handleVideoWatched();
                      }
                    }}
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-muted-foreground mb-2">
              Welcome message is being generated...
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
              Check again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
