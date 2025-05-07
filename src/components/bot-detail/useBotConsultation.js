var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
export function useBotConsultation(botName, role) {
    const [bot, setBot] = useState({
        name: botName || "Assistant",
        role: role || "Executive Advisor",
    });
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const handleSendMessage = useCallback((text) => __awaiter(this, void 0, void 0, function* () {
        if (!text.trim())
            return;
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setIsTyping(true);
        setError("");
        try {
            // Simulate API call with a delay
            yield new Promise((resolve) => setTimeout(resolve, 1500));
            const botResponse = {
                id: (Date.now() + 1).toString(),
                text: `This is a response to: ${text}`,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
        }
        catch (err) {
            setError("Failed to get bot response");
            console.error(err);
        }
        finally {
            setIsLoading(false);
            setIsTyping(false);
        }
    }), []);
    const retryLastMessage = useCallback(() => {
        const lastUserMessage = [...messages]
            .reverse()
            .find((m) => m.sender === "user");
        if (lastUserMessage) {
            setRetryCount((prev) => prev + 1);
            handleSendMessage(lastUserMessage.text);
        }
    }, [messages, handleSendMessage]);
    const clearConversation = useCallback(() => {
        setMessages([]);
        setError("");
        setRetryCount(0);
    }, []);
    const toggleVoiceInterface = useCallback(() => {
        setIsVoiceEnabled((prev) => !prev);
    }, []);
    const startVoiceRecognition = useCallback(() => {
        if (!isVoiceEnabled)
            return;
        setIsListening(true);
        // Placeholder for actual speech recognition
        setTimeout(() => {
            setIsListening(false);
            handleSendMessage("This is a voice-transcribed message placeholder");
        }, 2000);
    }, [isVoiceEnabled, handleSendMessage]);
    return {
        bot,
        messages,
        isLoading,
        isTyping,
        error,
        retryCount,
        isVoiceEnabled,
        isListening,
        handleSendMessage,
        retryLastMessage,
        clearConversation,
        toggleVoiceInterface,
        startVoiceRecognition,
    };
}
