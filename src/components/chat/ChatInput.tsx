import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
export const ChatInput = ({ onSendMessage, isLoading = false, placeholder = "Type your message..." }) => {
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleSendMessage = () => {
        if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage("");
        }
    };
    return (<div className="relative">
      <Textarea value={message} onChange={handleChange} onKeyDown={handleKeyDown} placeholder={placeholder} className="pr-12 resize-none min-h-[80px]" disabled={isLoading}/>
      <Button size="icon" className="absolute bottom-2 right-2" onClick={handleSendMessage} disabled={!message.trim() || isLoading}>
        {isLoading ? (<Loader2 className="h-4 w-4 animate-spin"/>) : (<Send className="h-4 w-4"/>)}
        <span className="sr-only">Send message</span>
      </Button>
    </div>);
};
