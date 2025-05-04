export declare function useBotVoiceInterface(onMessageReceived: (message: string) => void): {
    isVoiceEnabled: boolean;
    isListening: boolean;
    isSpeaking: boolean;
    toggleVoiceInterface: () => void;
    startVoiceRecognition: () => Promise<() => void>;
    speakMessage: (message: string) => void;
};
