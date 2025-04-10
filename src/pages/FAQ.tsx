
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

export default function FAQ() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const faqItems = [
    {
      question: "What is Allora AI?",
      answer: "Allora AI is an executive advisory platform powered by artificial intelligence that helps businesses make strategic decisions, develop growth strategies, and gain competitive insights."
    },
    {
      question: "How does Allora AI work?",
      answer: "Allora AI uses advanced machine learning algorithms to analyze your business data, market trends, and industry benchmarks to provide personalized strategic recommendations and insights."
    },
    {
      question: "Is my business data secure?",
      answer: "Yes. We take data security seriously. All data is encrypted, stored securely, and never shared with third parties without explicit permission. We are compliant with major data protection regulations."
    },
    {
      question: "How much does Allora AI cost?",
      answer: "Allora AI offers flexible pricing plans designed to fit businesses of all sizes. Visit our Pricing page for detailed information about our subscription options and features."
    },
    {
      question: "Do I need technical expertise to use Allora AI?",
      answer: "No technical expertise is required. Our platform is designed with an intuitive interface that makes it easy for anyone to use, regardless of technical background."
    },
    {
      question: "Can I integrate Allora AI with my existing systems?",
      answer: "Yes, Allora AI offers integration capabilities with many popular business tools and platforms. Contact our support team for specific integration questions."
    },
    {
      question: "How accurate are the AI predictions?",
      answer: "Our AI models are continuously trained on extensive datasets and refined based on real-world outcomes. While no prediction system is perfect, our platform achieves high accuracy rates and improves over time."
    }
  ];
  
  const askAI = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    setAiAnswer(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('openai', {
        body: {
          prompt: question,
          botName: "FAQ Assistant",
          botRole: "customer support specialist",
          messages: []
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setAiAnswer(data.content);
    } catch (error) {
      console.error("Error asking AI:", error);
      toast.error("Failed to get answer. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      askAI();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about Allora AI
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
              <CardDescription>
                Everything you need to know about Allora AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
          
          <div className="mt-12">
            <Card className="border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-primary" />
                  Ask Our AI Assistant
                </CardTitle>
                <CardDescription>
                  Don't see your question? Ask our AI assistant for help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your question here..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1"
                    />
                    <Button 
                      onClick={askAI} 
                      disabled={isLoading || !question.trim()}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      <span className="ml-2 hidden sm:inline">Ask</span>
                    </Button>
                  </div>
                  
                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="ml-2 text-muted-foreground">Getting your answer...</span>
                    </div>
                  )}
                  
                  {aiAnswer && (
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-2">AI Response:</p>
                      <p className="text-muted-foreground whitespace-pre-line">{aiAnswer}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Our AI assistant provides general information and may not cover all specific cases.
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Our team is here to help with any other questions you might have.
            </p>
            <a 
              href="mailto:support@allora-ai.com" 
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
