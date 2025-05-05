import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Play, Volume2, VolumeX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
export function WelcomeVideo() {
    const [dismissed, setDismissed] = useState(false);
    const [muted, setMuted] = useState(true);
    const { profile } = useAuth();
    // Check if this is the user's first visit
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    useEffect(() => {
        // Check local storage to see if this is the first dashboard visit
        const hasVisitedBefore = localStorage.getItem('hasVisitedDashboard');
        if (!hasVisitedBefore) {
            setIsFirstVisit(true);
            localStorage.setItem('hasVisitedDashboard', 'true');
        }
    }, []);
    // Don't show if not first visit or already dismissed
    if (!isFirstVisit || dismissed) {
        return null;
    }
    return (<Card className="border-primary/10 overflow-hidden">
      <CardHeader className="pb-0 flex flex-row justify-between items-start space-y-0">
        <div>
          <CardTitle className="text-xl mb-1">Welcome to Allora AI</CardTitle>
          <CardDescription>
            Watch this quick intro to get started with your AI executive team
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="mt-0" onClick={() => setDismissed(true)}>
          <X className="h-5 w-5"/>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative rounded-md overflow-hidden bg-black aspect-video">
          <div className="absolute inset-0 flex items-center justify-center">
            <Play className="h-16 w-16 text-white opacity-80"/>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button size="icon" variant="ghost" className="bg-black/50 text-white h-8 w-8 rounded-full" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeX className="h-4 w-4"/> : <Volume2 className="h-4 w-4"/>}
            </Button>
          </div>
          {/* This would be replaced with an actual video player in production */}
          <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="flex items-center justify-center h-full text-white text-opacity-70 text-sm">
              Welcome video placeholder
            </div>
          </div>
        </div>
      </CardContent>
    </Card>);
}
export default WelcomeVideo;
