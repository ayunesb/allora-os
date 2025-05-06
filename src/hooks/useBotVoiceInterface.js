var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useTextToSpeech } from "./useTextToSpeech";
import { useSpeechRecognition } from "./useSpeechRecognition";
export function useBotVoiceInterface(onMessageReceived) {
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
    const { generateAndPlay, isPlaying: isSpeaking, stop: stopSpeaking, } = useTextToSpeech();
    const { startListening, stopListening, transcript, isListening, resetTranscript, } = useSpeechRecognition();
    // Toggle voice interface on/off
    const toggleVoiceInterface = useCallback(() => {
        setIsVoiceEnabled((prev) => !prev);
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
    const startVoiceRecognition = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (isListening)
            return;
        try {
            yield startListening();
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
    }), [isListening, startListening, stopListening]);
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
        speakMessage,
    };
}
