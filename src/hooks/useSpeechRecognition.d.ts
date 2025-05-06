interface SpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}
export declare function useSpeechRecognition(
  options?: SpeechRecognitionOptions,
): {
  transcript: string;
  isListening: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string;
};
export {};
