var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { VoiceUploader } from "./VoiceUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Loader2, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";
export function VoiceTranscription() {
    const [file, setFile] = useState(null);
    const [transcript, setTranscript] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const handleFileSelected = (selectedFile) => __awaiter(this, void 0, void 0, function* () {
        setFile(selectedFile);
        yield transcribeAudio(selectedFile);
    });
    const transcribeAudio = (audioFile) => __awaiter(this, void 0, void 0, function* () {
        setIsProcessing(true);
        setError(null);
        try {
            // Convert the file to base64
            const base64Audio = yield fileToBase64(audioFile);
            // Call the API route
            const response = yield fetch("/api/voice-to-text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ audio: base64Audio }),
            });
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(errorData.error || "Failed to transcribe audio");
            }
            const data = yield response.json();
            setTranscript(data.text);
            toast.success("Audio transcribed successfully");
        }
        catch (err) {
            console.error("Transcription error:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred");
            toast.error("Failed to transcribe audio");
        }
        finally {
            setIsProcessing(false);
        }
    });
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
                    const base64 = reader.result.split(",")[1];
                    resolve(base64);
                }
                else {
                    reject(new Error("Failed to convert file to base64"));
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcript);
        toast.success("Transcript copied to clipboard");
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(VoiceUploader, { onFileSelected: handleFileSelected, isProcessing: isProcessing }), isProcessing && (_jsxs("div", { className: "flex items-center justify-center p-6", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), _jsx("span", { className: "ml-2", children: "Transcribing audio..." })] })), error && (_jsx(Card, { className: "border-destructive", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-start gap-2 text-destructive", children: [_jsx(AlertCircle, { className: "h-5 w-5 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Transcription Error" }), _jsx("p", { className: "text-sm text-muted-foreground", children: error })] })] }) }) })), transcript && !isProcessing && file && (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Transcript" }), _jsxs(CardDescription, { children: [file.name, " (", Math.round((file.size || 0) / 1024), " KB)"] })] }), _jsx(CardContent, { children: _jsx("div", { className: "bg-muted p-4 rounded-md whitespace-pre-wrap", children: transcript }) }), _jsx(CardFooter, { className: "flex justify-end gap-2", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: copyToClipboard, children: [_jsx(Copy, { className: "h-4 w-4 mr-2" }), "Copy"] }) })] }))] }));
}
