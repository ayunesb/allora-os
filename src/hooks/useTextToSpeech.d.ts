interface SpeechOptions {
  voice?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}
export declare function useTextToSpeech(): {
  generateAndPlay: (
    text: string,
    options?: SpeechOptions,
  ) => SpeechSynthesisUtterance;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  getVoices: () => SpeechSynthesisVoice[];
  isPlaying: boolean;
};
export {};
