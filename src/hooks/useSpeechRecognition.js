var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect, useCallback } from "react";
export function useSpeechRecognition(options = {}) {
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [error, setError] = useState(null);
    // Initialize speech recognition
    useEffect(() => {
        var _a, _b;
        // Check if browser supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError("Speech recognition not supported in this browser");
            return;
        }
        // Create a recognition instance
        const recognitionInstance = new SpeechRecognition();
        // Configure recognition
        recognitionInstance.lang = options.lang || "en-US";
        recognitionInstance.continuous = (_a = options.continuous) !== null && _a !== void 0 ? _a : true;
        recognitionInstance.interimResults = (_b = options.interimResults) !== null && _b !== void 0 ? _b : true;
        // Set up event handlers
        recognitionInstance.onresult = (event) => {
            const current = event.resultIndex;
            const result = event.results[current];
            const transcriptText = result[0].transcript;
            if (result.isFinal) {
                setTranscript(transcriptText);
            }
        };
        recognitionInstance.onend = () => {
            setIsListening(false);
        };
        recognitionInstance.onerror = (event) => {
            setError(`Speech recognition error: ${event.error}`);
            setIsListening(false);
        };
        setRecognition(recognitionInstance);
        // Clean up on unmount
        return () => {
            if (recognitionInstance) {
                recognitionInstance.stop();
            }
        };
    }, [options.lang, options.continuous, options.interimResults]);
    // Start listening
    const startListening = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!recognition) {
            setError("Speech recognition not initialized");
            return;
        }
        // Request microphone permission explicitly
        try {
            yield navigator.mediaDevices.getUserMedia({ audio: true });
            setError(null);
            setTranscript("");
            recognition.start();
            setIsListening(true);
        }
        catch (err) {
            setError("Microphone permission denied");
            console.error("Microphone permission denied:", err);
        }
    }), [recognition]);
    // Stop listening
    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition, isListening]);
    // Reset transcript
    const resetTranscript = useCallback(() => {
        setTranscript("");
    }, []);
    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        resetTranscript,
        error,
    };
}
