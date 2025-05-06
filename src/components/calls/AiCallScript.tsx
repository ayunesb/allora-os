import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download, Play, FileText, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useCallScriptTracking from "@/hooks/useCallScriptTracking";
import AiCallScriptFeedback from "./AiCallScriptFeedback.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AiCallScriptProps {
  id: string;
  title: string;
  target: string;
  duration: number;
  primaryBot: { name: string };
  content: string;
  onUse: (id: string, title: string) => void;
  type: string;
}

export const AiCallScript: React.FC<AiCallScriptProps> = ({
  scriptText,
  onApprove,
  onReject,
  isEditable = false,
}) => {
  return (
    <div className="ai-call-script">
      <p>{scriptText}</p>
      {isEditable && (
        <>
          <button onClick={onApprove}>Approve</button>
          <button onClick={onReject}>Reject</button>
        </>
      )}
    </div>
  );
};

export default function AiCallScript({
  id,
  title,
  target,
  duration,
  primaryBot,
  content,
  onUse,
  type,
}: AiCallScriptProps) {
  const { trackScriptUse, trackScriptView } = useCallScriptTracking();
  const [scriptDialogOpen, setScriptDialogOpen] = useState(false);
  const handleUse = () => {
    trackScriptUse(id, title, type, primaryBot.name);
    onUse(id, title);
  };
  const handleViewScript = () => {
    trackScriptView(id, title, type);
    setScriptDialogOpen(true);
  };
  // Track view when component renders
  React.useEffect(() => {
    trackScriptView(id, title, type);
  }, [id, title, type, trackScriptView]);
  return (
    <>
      <div className="border rounded-lg p-4 bg-card h-full flex flex-col">
        <div className="flex gap-3 items-start mb-3">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage
              src={`/avatars/${primaryBot.name.toLowerCase().replace(/\s+/g, "-")}.png`}
              alt={primaryBot.name}
            />
            <AvatarFallback>{primaryBot.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold mb-1 pr-6">{title}</h3>
            <Badge variant="outline" className="bg-primary/5">
              {type === "call" ? "Call Script" : "Message Template"}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 mb-4 text-sm flex-grow">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created by:</span>
            <span className="font-medium">{primaryBot.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Target:</span>
            <span>{target}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span>{duration}</span>
          </div>

          {collaborators.length > 0 && (
            <div>
              <span className="text-muted-foreground block mb-1">
                Collaborated with:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {collaborators.map((bot, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {bot.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mt-auto">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={handleUse}
          >
            {type === "call" ? (
              <Play className="mr-2 h-4 w-4" />
            ) : (
              <MessageSquare className="mr-2 h-4 w-4" />
            )}
            Use
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleViewScript}
          >
            <FileText className="mr-2 h-4 w-4" />
            View {type === "call" ? "Script" : "Template"}
          </Button>
        </div>

        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <AiCallScriptFeedback
          id={id}
          title={title}
          type={type}
          primaryBot={primaryBot}
        />
      </div>

      {/* Script Content Dialog */}
      <Dialog open={scriptDialogOpen} onOpenChange={setScriptDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {type === "call" ? "Call Script" : "Message Template"} created by{" "}
              {primaryBot.name}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target:</span>
              <span className="font-medium">{target}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{duration}</span>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-medium mb-2">
                {type === "call" ? "Script Content" : "Template Content"}
              </h3>
              <div className="bg-muted/30 rounded-md p-4 whitespace-pre-line">
                {content ||
                  (type === "call"
                    ? `# ${title}\n\n## Introduction\n- Greet the prospect warmly and introduce yourself and ${primaryBot.name}'s company\n- Briefly explain the purpose of your call\n\n## Value Proposition\n- Present your main value proposition tailored to ${target}\n- Highlight 2-3 key benefits\n\n## Questions to Ask\n- What challenges are they currently facing?\n- How are they currently solving these problems?\n- What would an ideal solution look like for them?\n\n## Addressing Objections\n- Price: Focus on ROI and long-term value\n- Timing: Emphasize opportunity cost of delay\n- Need to consult others: Offer to schedule a follow-up with all stakeholders\n\n## Call to Action\n- Schedule a demo/follow-up meeting\n- Send additional information\n- Confirm next steps\n\n## Closing\n- Thank them for their time\n- Restate any commitments made\n- Provide your contact information`
                    : `# ${title}\n\nHi [Name],\n\nI hope this message finds you well. I'm reaching out regarding our AI-powered business strategy platform that has been helping companies like yours achieve significant growth.\n\n## Key Points\n- Our platform provides personalized strategic advice for businesses in your industry\n- ${primaryBot.name} has analyzed market trends and created recommendations specifically for companies like yours\n- Clients implementing our strategies have seen an average 25% improvement in key metrics\n\n## Next Steps\nI'd love to schedule a brief call to discuss how our solution could specifically benefit your business. Would you be available for a 15-minute conversation this week?\n\nAlternatively, I can send you some additional information about our platform if you'd prefer to review it at your convenience.\n\nBest regards,\n[Your Name]\n[Your Contact Information]`)}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function renderBotDetails(bot: { name: string }) {
  // Fix 'name' property error by defining the bot type
  // ...existing code...
}
