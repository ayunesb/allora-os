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
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export default function FAQ() {
    const [question, setQuestion] = useState("");
    const [aiAnswer, setAiAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const faqItems = [
        {
            question: "What is Allora AI?",
            answer: "Allora AI is an executive advisory platform powered by artificial intelligence that helps businesses make strategic decisions, develop growth strategies, and gain competitive insights.",
        },
        {
            question: "How does Allora AI work?",
            answer: "Allora AI uses advanced machine learning algorithms to analyze your business data, market trends, and industry benchmarks to provide personalized strategic recommendations and insights.",
        },
        {
            question: "Is my business data secure?",
            answer: "Yes. We take data security seriously. All data is encrypted, stored securely, and never shared with third parties without explicit permission. We are compliant with major data protection regulations.",
        },
        {
            question: "How much does Allora AI cost?",
            answer: "Allora AI offers flexible pricing plans designed to fit businesses of all sizes. Visit our Pricing page for detailed information about our subscription options and features.",
        },
        {
            question: "Do I need technical expertise to use Allora AI?",
            answer: "No technical expertise is required. Our platform is designed with an intuitive interface that makes it easy for anyone to use, regardless of technical background.",
        },
        {
            question: "Can I integrate Allora AI with my existing systems?",
            answer: "Yes, Allora AI offers integration capabilities with many popular business tools and platforms. Contact our support team for specific integration questions.",
        },
        {
            question: "How accurate are the AI predictions?",
            answer: "Our AI models are continuously trained on extensive datasets and refined based on real-world outcomes. While no prediction system is perfect, our platform achieves high accuracy rates and improves over time.",
        },
    ];
    const askAI = () => __awaiter(this, void 0, void 0, function* () {
        if (!question.trim()) {
            toast.error("Please enter a question");
            return;
        }
        setIsLoading(true);
        setAiAnswer(null);
        try {
            // Application-specific context for the AI
            const appContext = `
        About Allora AI:
        - Allora AI is an executive advisory platform powered by artificial intelligence
        - Main features include: AI Executive Team, Dashboard & Analytics, Strategy Management, 
          Lead Management, Communication Tools, Campaign Management, User Management & Settings
        - The AI Executive Team includes virtual executive personas that provide specialized advice on business strategies
        - The platform offers risk-based strategies tailored to different risk appetites (low, medium, high)
        - Users can track business metrics, manage leads, and create marketing campaigns
        - Communication tools include phone calling, Zoom integration, WhatsApp messaging, and AI script generation
        - The platform is designed to be user-friendly with a responsive interface for all devices
        
        Core User Benefits:
        - Make data-driven strategic decisions with AI assistance
        - Get personalized business insights based on company size, industry, and risk preferences
        - Connect with potential customers more effectively through integrated communication tools
        - Track performance metrics and ROI for business initiatives
        - Save time with AI-generated recommendations and content
      `;
            const { data, error } = yield supabase.functions.invoke("openai", {
                body: {
                    prompt: question,
                    botName: "FAQ Assistant",
                    botRole: "customer support specialist",
                    messages: [],
                    systemContext: appContext,
                },
            });
            if (error) {
                throw new Error(error.message);
            }
            setAiAnswer(data.content);
        }
        catch (error) {
            console.error("Error asking AI:", error);
            toast.error("Failed to get answer. Please try again later.");
        }
        finally {
            setIsLoading(false);
        }
    });
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isLoading) {
            askAI();
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Navbar, {}), _jsx("div", { className: "flex-1 container mx-auto px-4 py-16", children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Frequently Asked Questions" }), _jsx("p", { className: "text-muted-foreground text-lg", children: "Find answers to common questions about Allora AI" })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Common Questions" }), _jsx(CardDescription, { children: "Everything you need to know about Allora AI" })] }), _jsx(CardContent, { children: _jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqItems.map((item, index) => (_jsxs(AccordionItem, { value: `item-${index}`, children: [_jsx(AccordionTrigger, { className: "text-left font-medium", children: item.question }), _jsx(AccordionContent, { className: "text-muted-foreground", children: item.answer })] }, index))) }) })] }), _jsx("div", { className: "mt-12", children: _jsxs(Card, { className: "border border-primary/20", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Bot, { className: "mr-2 h-5 w-5 text-primary" }), "Ask Our AI Assistant"] }), _jsx(CardDescription, { children: "Don't see your question? Ask our AI assistant for help with Allora AI" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col space-y-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Ask about Allora AI features, pricing, or how to use it...", value: question, onChange: (e) => setQuestion(e.target.value), onKeyDown: handleKeyPress, className: "flex-1" }), _jsxs(Button, { onClick: askAI, disabled: isLoading || !question.trim(), children: [isLoading ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin" })) : (_jsx(Send, { className: "h-4 w-4" })), _jsx("span", { className: "ml-2 hidden sm:inline", children: "Ask" })] })] }), isLoading && (_jsxs("div", { className: "flex items-center justify-center p-4", children: [_jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }), _jsx("span", { className: "ml-2 text-muted-foreground", children: "Getting your answer..." })] })), aiAnswer && (_jsxs("div", { className: "p-4 rounded-lg bg-muted/50", children: [_jsx("p", { className: "text-sm font-medium mb-2", children: "AI Response:" }), _jsx("p", { className: "text-muted-foreground whitespace-pre-line", children: aiAnswer })] }))] }) }), _jsx(CardFooter, { className: "text-xs text-muted-foreground", children: "This AI assistant provides information specific to Allora AI and its features." })] }) }), _jsxs("div", { className: "mt-12 text-center", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Still have questions?" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Our team is here to help with any other questions you might have." }), _jsx("a", { href: "mailto:support@allora-ai.com", className: "text-primary hover:underline", children: "Contact Support" })] })] }) })] }));
}
