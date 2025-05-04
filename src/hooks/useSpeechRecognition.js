import { useState, useEffect, useCallback } from 'react';
export function useSpeechRecognition(options = {}) {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [error, setError] = useState(null);
    // Initialize speech recognition
    useEffect(() => {
        // Check if browser supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech recognition not supported in this browser');
            return;
        }
        // Create a recognition instance
        const recognitionInstance = new SpeechRecognition();
        // Configure recognition
        recognitionInstance.lang = options.lang || 'en-US';
        recognitionInstance.continuous = options.continuous ?? true;
        recognitionInstance.interimResults = options.interimResults ?? true;
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
    const startListening = useCallback(async () => {
        if (!recognition) {
            setError('Speech recognition not initialized');
            return;
        }
        // Request microphone permission explicitly
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setError(null);
            setTranscript('');
            recognition.start();
            setIsListening(true);
        }
        catch (err) {
            setError('Microphone permission denied');
            console.error('Microphone permission denied:', err);
        }
    }, [recognition]);
    // Stop listening
    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop();
            setIsListening(false);
        }
    }, [recognition, isListening]);
    // Reset transcript
    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);
    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        resetTranscript,
        error
    };
}
