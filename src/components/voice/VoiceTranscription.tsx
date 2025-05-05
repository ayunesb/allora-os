import { useState } from "react";
import { VoiceUploader } from "./VoiceUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
export function VoiceTranscription() {
    const [file, setFile] = useState(null);
    const [transcript, setTranscript] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const handleFileSelected = async (selectedFile) => {
        setFile(selectedFile);
        await transcribeAudio(selectedFile);
    };
    const transcribeAudio = async (audioFile) => {
        setIsProcessing(true);
        setError(null);
        try {
            // Convert the file to base64
            const base64Audio = await fileToBase64(audioFile);
            // Call the API route
            const response = await fetch('/api/voice-to-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ audio: base64Audio }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to transcribe audio');
            }
            const data = await response.json();
            setTranscript(data.text);
            toast.success("Audio transcribed successfully");
        }
        catch (err) {
            console.error('Transcription error:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            toast.error("Failed to transcribe audio");
        }
        finally {
            setIsProcessing(false);
        }
    };
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                }
                else {
                    reject(new Error('Failed to convert file to base64'));
                }
            };
            reader.onerror = error => reject(error);
        });
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcript);
        toast.success("Transcript copied to clipboard");
    };
    return (<div className="space-y-6">
      <VoiceUploader onFileSelected={handleFileSelected} isProcessing={isProcessing}/>
      
      {isProcessing && (<div className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary"/>
          <span className="ml-2">Transcribing audio...</span>
        </div>)}
      
      {error && (<Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-2 text-destructive">
              <AlertCircle className="h-5 w-5 mt-0.5"/>
              <div>
                <p className="font-medium">Transcription Error</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>)}
      
      {transcript && !isProcessing && file && (<Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>
              {file.name} ({Math.round((file.size || 0) / 1024)} KB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
              {transcript}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2"/>
              Copy
            </Button>
          </CardFooter>
        </Card>)}
    </div>);
}
