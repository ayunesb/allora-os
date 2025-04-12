
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // Check if browser supports the necessary APIs
  useEffect(() => {
    const checkBrowserSupport = () => {
      const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      setIsSupported(hasMediaDevices);
      
      if (!hasMediaDevices) {
        setError("Your browser doesn't support voice recognition");
      }
    };
    
    checkBrowserSupport();
  }, []);

  // Start recording audio
  const startListening = useCallback(async () => {
    if (!isSupported) {
      toast.error("Voice recognition is not supported in your browser");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setRecording(mediaRecorder);
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        await convertSpeechToText(audioBlob);
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      setAudioChunks([]);
      mediaRecorder.start();
      setIsListening(true);
      toast.info("Listening...");
    } catch (err) {
      console.error("Error starting voice recognition:", err);
      setError("Could not access your microphone");
      toast.error("Could not access your microphone");
    }
  }, [isSupported]);

  // Stop recording audio
  const stopListening = useCallback(() => {
    if (recording && recording.state !== "inactive") {
      recording.stop();
    }
    setIsListening(false);
  }, [recording]);

  // Convert recorded audio to text using the Supabase Edge Function
  const convertSpeechToText = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        if (!base64Audio) {
          throw new Error("Failed to encode audio");
        }
        
        const { data, error } = await supabase.functions.invoke("voice-to-text", {
          body: { audio: base64Audio }
        });
        
        if (error) {
          throw error;
        }
        
        if (data?.text) {
          setTranscript(data.text);
        } else {
          setTranscript("");
          toast.info("I didn't catch that. Could you try again?");
        }
      };
    } catch (err) {
      console.error("Error converting speech to text:", err);
      setTranscript("");
      setError("Failed to process speech");
      toast.error("Failed to process speech");
    }
  };

  // Reset the transcript
  const resetTranscript = useCallback(() => {
    setTranscript("");
  }, []);

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
}
