import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Phone,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
export default function AiScriptGenerator() {
  const [scriptType, setScriptType] = useState("call");
  const [scriptPurpose, setScriptPurpose] = useState("introduction");
  const [leadInfo, setLeadInfo] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const generateScript = async () => {
    if (!leadInfo.trim()) {
      toast.error("Please provide some information about the lead");
      return;
    }
    setIsGenerating(true);
    setGeneratedScript(null);
    try {
      // In a real app, this would call OpenAI or another AI service
      // Here we're simulating a response
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Sample responses based on script type and purpose
      let sampleScript = "";
      if (scriptType === "call") {
        if (scriptPurpose === "introduction") {
          sampleScript = `Hello, this is [Your Name] from [Company Name]. I noticed your company has been focusing on improving customer engagement, and I thought our platform might be a great fit for your needs.\n\nWe've helped similar businesses increase their customer retention by 30% within 3 months. Would you be interested in a brief demo to see how we could help you achieve similar results?\n\n[If yes] Great! I'd be happy to schedule that. What day works best for you next week?\n\n[If no] No problem at all. Would it be alright if I send you some information via email instead? Then you can review it at your convenience.`;
        } else if (scriptPurpose === "follow_up") {
          sampleScript = `Hello again, this is [Your Name] from [Company Name]. We spoke last week about your customer engagement challenges.\n\nI wanted to follow up to see if you'd had a chance to review the materials I sent and if you have any questions I could answer.\n\nBased on what you shared about your current process, I think our [Specific Feature] could help you address the [Pain Point] you mentioned. Would you like to discuss how that might work specifically for your team?`;
        } else if (scriptPurpose === "demo") {
          sampleScript = `Hello, thanks for taking the time to see our platform in action today. During this demo, I'll show you how our solution addresses the specific challenges you mentioned regarding [Key Pain Point].\n\nI'll walk you through the main features that our other clients in your industry have found most valuable, and then we can discuss how to customize the platform for your specific needs.\n\nFeel free to ask questions at any point - this demo is all about showing you what's possible for your specific situation.`;
        } else if (scriptPurpose === "closing") {
          sampleScript = `Based on our previous conversations, I've put together a proposal that I believe will address the key challenges you've mentioned. To summarize:\n\n1. Our platform will help you [Benefit 1]\n2. You'll be able to [Benefit 2]\n3. Your team will save approximately [X hours/dollars] by implementing this solution\n\nWe can get you set up within [Timeframe], and our team will provide full onboarding and training. Does this solution align with what you're looking for?\n\n[Address objections as needed]\n\nIf you're ready to move forward, the next steps would be to [describe contract process]. Would you like to proceed with this plan?`;
        }
      } else {
        // WhatsApp scripts - shorter and more direct
        if (scriptPurpose === "introduction") {
          sampleScript = `Hi there! 👋 This is [Your Name] from [Company Name]. We specialize in helping businesses like yours improve customer engagement and retention.\n\nI'd love to learn more about your current challenges in this area. Would you be open to a quick chat about how we might be able to help?\n\nLooking forward to connecting!`;
        } else if (scriptPurpose === "follow_up") {
          sampleScript = `Hi again from [Company Name]! 👋\n\nI wanted to follow up on our previous conversation about your customer engagement strategies. Have you had a chance to review the information I sent?\n\nI'm happy to answer any questions or schedule a quick call if that would be helpful.`;
        } else if (scriptPurpose === "demo") {
          sampleScript = `Hi there! 📱 Looking forward to our demo call tomorrow. Here's a quick overview of what we'll cover:\n\n✅ How our platform addresses your specific needs\n✅ Key features that will save your team time\n✅ Implementation process and timeline\n\nIs there anything specific you'd like me to focus on during our call?`;
        } else if (scriptPurpose === "closing") {
          sampleScript = `Thanks for your interest in [Company Name]! Based on our discussions, I think our [Product/Service] would be a great fit for your needs.\n\n🔑 Key benefits for you:\n- [Benefit 1]\n- [Benefit 2]\n- [Benefit 3]\n\nOur team can have you up and running by [Date]. Would you like to move forward with this solution?`;
        }
      }
      setGeneratedScript(sampleScript);
    } catch (error) {
      console.error("Error generating script:", error);
      toast.error("Failed to generate script");
    } finally {
      setIsGenerating(false);
    }
  };
  const copyToClipboard = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setIsCopied(true);
      toast.success("Script copied to clipboard");
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };
  const regenerateScript = () => {
    generateScript();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Script Generator
        </CardTitle>
        <CardDescription>
          Create personalized scripts for calls and messages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="script-type" className="text-sm font-medium">
            Script Type
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={scriptType === "call" ? "default" : "outline"}
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setScriptType("call")}
            >
              <Phone className="h-4 w-4" />
              Call Script
            </Button>
            <Button
              type="button"
              variant={scriptType === "whatsapp" ? "default" : "outline"}
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setScriptType("whatsapp")}
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Message
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="script-purpose" className="text-sm font-medium">
            Script Purpose
          </label>
          <Select value={scriptPurpose} onValueChange={setScriptPurpose}>
            <SelectTrigger id="script-purpose">
              <SelectValue placeholder="Select a purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="introduction">
                Introduction / Cold Outreach
              </SelectItem>
              <SelectItem value="follow_up">Follow-up</SelectItem>
              <SelectItem value="demo">Product Demo</SelectItem>
              <SelectItem value="closing">Closing / Deal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="lead-info" className="text-sm font-medium">
            Lead Information
          </label>
          <Textarea
            id="lead-info"
            placeholder="Enter lead details including company name, industry, pain points, etc."
            value={leadInfo}
            onChange={(e) => setLeadInfo(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={generateScript}
          className="w-full"
          disabled={isGenerating || !leadInfo.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Script...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Script
            </>
          )}
        </Button>

        {generatedScript && (
          <div className="space-y-3">
            <div className="p-3 border rounded-md bg-muted/30">
              <pre className="whitespace-pre-wrap text-sm">
                {generatedScript}
              </pre>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={regenerateScript}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button className="flex-1" onClick={copyToClipboard}>
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Script
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <p>
          {scriptType === "call"
            ? "AI-generated call scripts are personalized based on lead information and your company's tone of voice."
            : "AI-generated WhatsApp messages are optimized for high open and response rates."}
        </p>
      </CardFooter>
    </Card>
  );
}
