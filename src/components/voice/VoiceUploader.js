import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Upload, Mic, File } from "lucide-react";
export function VoiceUploader({ onFileSelected, isProcessing = false }) {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            onFileSelected(acceptedFiles[0]);
        }
    }, [onFileSelected]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "audio/*": [".mp3", ".wav", ".m4a", ".webm"],
        },
        disabled: isProcessing,
        maxFiles: 1,
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Mic, { className: "h-5 w-5 text-primary" }), "Voice Upload"] }), _jsx(CardDescription, { children: "Upload a voice recording to transcribe and process" })] }), _jsx(CardContent, { children: _jsxs("div", Object.assign({}, getRootProps(), { className: `p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors 
            ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"}
            ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}
          `, children: [_jsx("input", Object.assign({}, getInputProps(), { disabled: isProcessing })), _jsx("div", { className: "flex flex-col items-center justify-center gap-2", children: isDragActive ? (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "h-8 w-8 text-primary" }), _jsx("p", { children: "Drop the voice file here..." })] })) : (_jsxs(_Fragment, { children: [_jsx(File, { className: "h-8 w-8 text-muted-foreground" }), _jsx("p", { className: "font-medium", children: isProcessing
                                            ? "Processing audio file..."
                                            : "Drag & drop a voice file, or click to select" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Supports MP3, WAV, M4A, and WEBM formats" })] })) })] })) })] }));
}
