import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useTextToSpeech } from "./useTextToSpeech";
import { useSpeechRecognition } from "./useSpeechRecognition";
export function useBotVoiceInterface(onMessageReceived) {
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
    const { generateAndPlay, isPlaying: isSpeaking, stop: stopSpeaking } = useTextToSpeech();
    const { startListening, stopListening, transcript, isListening, resetTranscript } = useSpeechRecognition();
    // Toggle voice interface on/off
    const toggleVoiceInterface = useCallback(() => {
        setIsVoiceEnabled(prev => !prev);
        // Stop speaking if turning off
        if (isVoiceEnabled && isSpeaking) {
            stopSpeaking();
        }
        toast.info(isVoiceEnabled ? "Voice interface disabled" : "Voice interface enabled");
    }, [isVoiceEnabled, isSpeaking, stopSpeaking]);
    // Speak the provided message
    const speakMessage = useCallback((message) => {
        if (isVoiceEnabled) {
            generateAndPlay(message, { voice: "nova" });
        }
    }, [isVoiceEnabled, generateAndPlay]);
    // Start voice recognition
    const startVoiceRecognition = useCallback(async () => {
        if (isListening)
            return;
        try {
            await startListening();
            // Set up a timeout to stop listening after 10 seconds if nothing is said
            const timeout = setTimeout(() => {
                if (isListening) {
                    stopListening();
                    toast.info("Listening timed out. Please try again.");
                }
            }, 10000);
            // Clean up timeout when transcript changes
            return () => clearTimeout(timeout);
        }
        catch (error) {
            console.error("Error starting voice recognition:", error);
            toast.error("Could not start voice recognition");
        }
    }, [isListening, startListening, stopListening]);
    // Process transcript when it changes
    const processTranscript = useCallback(() => {
        if (transcript && transcript.trim()) {
            onMessageReceived(transcript);
            resetTranscript();
        }
    }, [transcript, onMessageReceived, resetTranscript]);
    // Process the transcript whenever it changes
    if (transcript) {
        processTranscript();
    }
    return {
        isVoiceEnabled,
        isListening,
        isSpeaking,
        toggleVoiceInterface,
        startVoiceRecognition,
        speakMessage
    };
}
