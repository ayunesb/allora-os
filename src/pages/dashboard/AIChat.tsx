import React, { useState, useEffect, useRef } from "react";
import { PageTitle } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Send,
  Mic,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { toast } from "sonner";
import { useApiClient } from "@/utils/api/apiClientEnhanced";

// Define the expected type for the props
interface Message {
  id: string;
  content: string;
  role: string;
  isLoading: boolean;
  executiveName?: string;
  executiveRole?: string;
  timestamp?: Date;
}

interface AIChatProps {
  children?: React.ReactNode;
  executiveName?: string;
  executiveRole?: string;
  messages: Message[];
}

const AIChat: React.FC<AIChatProps> = ({
  children,
  executiveName,
  executiveRole,
  messages,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof executives>("ceo");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { execute } = useApiClient();
  const executives = {
    ceo: {
      id: "1",
      name: "Alex Chen",
      role: "CEO",
      avatarUrl: "/assets/executives/ceo-avatar.png",
    },
    cfo: {
      id: "2",
      name: "Morgan Patel",
      role: "CFO",
      avatarUrl: "/assets/executives/cfo-avatar.png",
    },
    cmo: {
      id: "3",
      name: "Sarah Johnson",
      role: "CMO",
      avatarUrl: "/assets/executives/cmo-avatar.png",
    },
    cto: {
      id: "4",
      name: "David Miller",
      role: "CTO",
      avatarUrl: "/assets/executives/cto-avatar.png",
    },
  };
  const activeExecutive = executives[activeTab];
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    // Add loading message
    const loadingMessageId = Date.now().toString() + "-loading";
    const loadingMessage = {
      id: loadingMessageId,
      content: "Thinking...",
      role: "assistant",
      timestamp: new Date(),
      executiveName: activeExecutive.name,
      executiveRole: activeExecutive.role,
      isLoading: true,
    };
    setIsLoading(true);
    setMessages((prev) => [...prev, loadingMessage]);
    try {
      // Simulate API call to get AI response
      // In a real implementation, this would call your backend
      setTimeout(() => {
        // Remove loading message and add actual response
        setMessages((prev) => prev.filter((m) => m.id !== loadingMessageId));
        const response = {
          id: Date.now().toString(),
          content: generateResponse(inputMessage, activeExecutive),
          role: "assistant",
          timestamp: new Date(),
          executiveName: activeExecutive.name,
          executiveRole: activeExecutive.role,
        };
        setMessages((prev) => [...prev, response]);
        setIsLoading(false);
      }, 1500);
      // For a real implementation with your API:
      /*
            const response = await execute<{response: string}>('/api/chat', 'POST', {
              message: inputMessage,
              executiveId: activeExecutive.id
            });
            
            setMessages(prev => prev.filter(m => m.id !== loadingMessageId));
            
            const aiMessage: Message = {
              id: Date.now().toString(),
              content: response.response,
              role: 'assistant',
              timestamp: new Date(),
              executiveName: activeExecutive.name,
              executiveRole: activeExecutive.role
            };
            
            setMessages(prev => [...prev, aiMessage]);
            */
    } catch (error) {
      console.error("Failed to get response:", error);
      toast.error("Failed to get response from AI executive.");
      setMessages((prev) => prev.filter((m) => m.id !== loadingMessageId));
    } finally {
      setIsLoading(false);
    }
  };
  const generateResponse = (
    message: string,
    executive: { id: string; name: string; role: string },
  ): string => {
    // This is a placeholder. In a real app, this would come from your AI backend
    const responses = {
      ceo: [
        "Based on our strategic direction, I'd recommend focusing on market expansion while maintaining our core values.",
        "Let's approach this challenge by leveraging our organizational strengths and addressing our weaknesses head-on.",
        "I see significant potential in this opportunity. Let's assemble a cross-functional team to explore it further.",
      ],
      cfo: [
        "From a financial perspective, we should consider the ROI and cash flow implications before proceeding.",
        "Our quarterly projections indicate we have capacity for this investment if we adjust our spending in Q3.",
        "I recommend a phased approach to minimize financial risk while testing market response.",
      ],
      cmo: [
        "Our target audience would respond positively to this messaging based on our recent market research.",
        "I suggest we position this offering as premium in our existing markets before expanding to new segments.",
        "This aligns well with our brand values and would complement our current marketing initiatives.",
      ],
      cto: [
        "We can implement this using our existing technology stack with minimal additional resources.",
        "From a technical standpoint, we should consider scalability and security implications first.",
        "I recommend developing an MVP to test key assumptions before committing to a full implementation.",
      ],
    };
    const roleResponses =
      responses[
        executive.id === "1"
          ? "ceo"
          : executive.id === "2"
            ? "cfo"
            : executive.id === "3"
              ? "cmo"
              : "cto"
      ];
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const provideFeedback = (messageId: string, isPositive: boolean): void => {
    toast.success(
      `${isPositive ? "Positive" : "Negative"} feedback recorded. Thank you!`,
    );
    // Here you would typically send this feedback to your API
  };
  return (
    <div className="container px-4 py-6 h-full flex flex-col">
      <PageTitle
        title="AI Executive Chat"
        description="Chat with your AI executives for strategic insights and guidance"
      />

      <div className="mt-6 flex-1 flex flex-col gap-4 h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="ceo">CEO</TabsTrigger>
            <TabsTrigger value="cfo">CFO</TabsTrigger>
            <TabsTrigger value="cmo">CMO</TabsTrigger>
            <TabsTrigger value="cto">CTO</TabsTrigger>
          </TabsList>

          <Card className="flex-1 flex flex-col h-[calc(100vh-260px)]">
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activeExecutive.avatarUrl} />
                  <AvatarFallback>
                    {activeExecutive.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {activeExecutive.name}
                    <span className="text-sm font-normal text-muted-foreground">
                      • {activeExecutive.role}
                    </span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto py-4 px-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="max-w-md">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">
                      Chat with {activeExecutive.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start a conversation with your {activeExecutive.role} to
                      get strategic insights and guidance tailored to your
                      business.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={activeExecutive.avatarUrl} />
                              <AvatarFallback>
                                {message.executiveName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-semibold">
                              {message.executiveName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {message.executiveRole}
                            </span>
                          </div>
                        )}

                        <div className="text-sm">
                          {message.isLoading ? (
                            <div className="flex items-center gap-2">
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>{message.content}</span>
                            </div>
                          ) : (
                            message.content
                          )}
                        </div>

                        {message.role === "assistant" && !message.isLoading && (
                          <div className="flex justify-end gap-1 mt-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => provideFeedback(message.id, true)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => provideFeedback(message.id, false)}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </CardContent>

            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-h-[60px] resize-none"
                  disabled={isLoading}
                />
                <div className="flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      toast.info("Voice input feature coming soon!")
                    }
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    type="button"
                    disabled={!inputMessage.trim() || isLoading}
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};
export default AIChat;
