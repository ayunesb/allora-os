interface VoiceUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing?: boolean;
}
export declare function VoiceUploader({
  onFileSelected,
  isProcessing,
}: VoiceUploaderProps): import("react").JSX.Element;
export {};
