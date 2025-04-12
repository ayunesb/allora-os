
import { useState, useCallback } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

interface TextToSpeechOptions {
  voice?: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
}

export function useTextToSpeech() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateSpeech = useCallback(async (
    text: string, 
    options: TextToSpeechOptions = {}
  ) => {
    if (!text.trim()) return null;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: {
          text: text,
          voice: options.voice || "nova",
        },
      });
      
      if (error) throw error;
      
      const { audio } = data;
      if (!audio) throw new Error("No audio data received");
      
      // Convert base64 to blob
      const byteCharacters = atob(audio);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "audio/mp3" });
      
      // Create URL from blob
      const audioUrl = URL.createObjectURL(blob);
      
      // Create audio element
      const audio$ = new Audio(audioUrl);
      audio$.onended = () => setIsPlaying(false);
      audio$.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
        toast.error("Failed to play speech");
      };
      
      setAudioElement(audio$);
      return audio$;
    } catch (err) {
      console.error("Error generating speech:", err);
      toast.error("Failed to generate speech");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const play = useCallback(() => {
    if (audioElement) {
      audioElement.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Error playing audio:", err);
          toast.error("Failed to play speech");
        });
    }
  }, [audioElement]);
  
  const stop = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioElement]);
  
  const generateAndPlay = useCallback(async (
    text: string, 
    options: TextToSpeechOptions = {}
  ) => {
    const audio = await generateSpeech(text, options);
    if (audio) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Error playing audio:", err);
          toast.error("Failed to play speech");
        });
    }
  }, [generateSpeech]);

  return {
    generateSpeech,
    play,
    stop,
    generateAndPlay,
    isLoading,
    isPlaying
  };
}
