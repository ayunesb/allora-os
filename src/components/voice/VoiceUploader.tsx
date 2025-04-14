
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Mic, File } from "lucide-react";

interface VoiceUploaderProps {
  onFileSelected: (file: File) => void;
  isProcessing?: boolean;
}

export function VoiceUploader({ onFileSelected, isProcessing = false }: VoiceUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelected(acceptedFiles[0]);
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.webm']
    },
    disabled: isProcessing,
    maxFiles: 1,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-primary" />
          Voice Upload
        </CardTitle>
        <CardDescription>
          Upload a voice recording to transcribe and process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors 
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'}
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isProcessing} />
          <div className="flex flex-col items-center justify-center gap-2">
            {isDragActive ? (
              <>
                <Upload className="h-8 w-8 text-primary" />
                <p>Drop the voice file here...</p>
              </>
            ) : (
              <>
                <File className="h-8 w-8 text-muted-foreground" />
                <p className="font-medium">
                  {isProcessing 
                    ? "Processing audio file..." 
                    : "Drag & drop a voice file, or click to select"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports MP3, WAV, M4A, and WEBM formats
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
