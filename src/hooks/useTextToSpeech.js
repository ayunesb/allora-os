import { useState, useCallback } from 'react';
export function useTextToSpeech() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentUtterance, setCurrentUtterance] = useState(null);
    // Initialize speech synthesis
    const synth = window.speechSynthesis;
    // Generate and play speech
    const generateAndPlay = useCallback((text, options = {}) => {
        if (!synth) {
            console.error("Speech synthesis not supported in this browser");
            return;
        }
        // Stop any current speech
        stop();
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        // Set voice if specified
        if (options.voice) {
            const voices = synth.getVoices();
            const selectedVoice = voices.find(v => v.name.toLowerCase().includes(options.voice.toLowerCase()));
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }
        }
        // Set other options
        if (options.pitch !== undefined)
            utterance.pitch = options.pitch;
        if (options.rate !== undefined)
            utterance.rate = options.rate;
        if (options.volume !== undefined)
            utterance.volume = options.volume;
        // Set event handlers
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
            setIsPlaying(false);
            setCurrentUtterance(null);
        };
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsPlaying(false);
            setCurrentUtterance(null);
        };
        // Store the utterance
        setCurrentUtterance(utterance);
        // Start speaking
        synth.speak(utterance);
        setIsPlaying(true);
        return utterance;
    }, [synth]);
    // Pause the current speech
    const pause = useCallback(() => {
        if (synth && isPlaying) {
            synth.pause();
            setIsPlaying(false);
        }
    }, [synth, isPlaying]);
    // Resume the current speech
    const resume = useCallback(() => {
        if (synth && !isPlaying && currentUtterance) {
            synth.resume();
            setIsPlaying(true);
        }
    }, [synth, isPlaying, currentUtterance]);
    // Stop the current speech
    const stop = useCallback(() => {
        if (synth) {
            synth.cancel();
            setIsPlaying(false);
            setCurrentUtterance(null);
        }
    }, [synth]);
    // Get available voices
    const getVoices = useCallback(() => {
        if (!synth)
            return [];
        return synth.getVoices();
    }, [synth]);
    return {
        generateAndPlay,
        pause,
        resume,
        stop,
        getVoices,
        isPlaying
    };
}
