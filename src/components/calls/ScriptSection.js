import React from "react";
import AiCallScript from "@/components/calls/AiCallScript";
import { Play, Download, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
export default function ScriptSection({ title, scripts, onUseScript, type, isAiSection = false }) {
    const filteredScripts = isAiSection
        ? scripts.filter(script => script.aiGenerated)
        : scripts.filter(script => !script.aiGenerated);
    const [viewScriptId, setViewScriptId] = useState(null);
    const [scriptDialogOpen, setScriptDialogOpen] = useState(false);
    const handleViewScript = (scriptId) => {
        setViewScriptId(scriptId);
        setScriptDialogOpen(true);
    };
    const currentScript = viewScriptId
        ? filteredScripts.find(script => script.id === viewScriptId)
        : null;
    return (<div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isAiSection ? (
        // AI Generated scripts
        filteredScripts.map((script) => (<AiCallScript key={script.id} id={script.id} title={script.title} target={script.target} duration={script.duration} primaryBot={script.primaryBot} collaborators={script.collaborators} content={script.content} onUse={onUseScript} type={type}/>))) : (
        // Standard scripts
        filteredScripts.map((script) => (<div key={script.id} className="dashboard-card">
              <h3 className="text-xl font-bold mb-4">{script.title}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target:</span>
                  <span>{script.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span>{script.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={script.status === "Ready" ? "text-green-400" : "text-amber-400"}>
                    {script.status}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {script.status === "Ready" ? (<>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onUseScript(script.id, script.title)}>
                      {type === 'call' ? (<Play className="mr-2 h-4 w-4"/>) : (<MessageSquare className="mr-2 h-4 w-4"/>)}
                      Use
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewScript(script.id)}>
                      <FileText className="mr-2 h-4 w-4"/>
                      View {type === 'call' ? 'Script' : 'Template'}
                    </Button>
                  </>) : (<Button disabled variant="outline" size="sm" className="w-full">
                    Coming Soon
                  </Button>)}
              </div>
              
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm">
                  <Download className="mr-2 h-4 w-4"/>
                  Download
                </Button>
              </div>
            </div>)))}
      </div>
      
      {/* Script Content Dialog for Standard Scripts */}
      <Dialog open={scriptDialogOpen} onOpenChange={setScriptDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {currentScript && (<>
              <DialogHeader>
                <DialogTitle>{currentScript.title}</DialogTitle>
                <DialogDescription>
                  {type === 'call' ? 'Call Script' : 'Message Template'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-medium">{currentScript.target}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{currentScript.duration}</span>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-2">
                    {type === 'call' ? 'Script Content' : 'Template Content'}
                  </h3>
                  <div className="bg-muted/30 rounded-md p-4 whitespace-pre-line">
                    {currentScript.content ||
                (type === 'call' ?
                    `# ${currentScript.title}\n\n## Introduction\n- Greet the prospect warmly and introduce yourself and your company\n- Briefly explain the purpose of your call\n\n## Value Proposition\n- Present your main value proposition tailored to ${currentScript.target}\n- Highlight 2-3 key benefits\n\n## Questions to Ask\n- What challenges are they currently facing?\n- How are they currently solving these problems?\n- What would an ideal solution look like for them?\n\n## Addressing Objections\n- Price: Focus on ROI and long-term value\n- Timing: Emphasize opportunity cost of delay\n- Need to consult others: Offer to schedule a follow-up with all stakeholders\n\n## Call to Action\n- Schedule a demo/follow-up meeting\n- Send additional information\n- Confirm next steps\n\n## Closing\n- Thank them for their time\n- Restate any commitments made\n- Provide your contact information`
                    :
                        `# ${currentScript.title}\n\nHi [Name],\n\nI hope this message finds you well. I'm reaching out regarding our business platform that has been helping companies like yours achieve significant growth.\n\n## Key Points\n- Our platform provides personalized strategic advice for businesses in your industry\n- We've analyzed market trends and created recommendations specifically for companies like yours\n- Clients implementing our strategies have seen an average 20% improvement in key metrics\n\n## Next Steps\nI'd love to schedule a brief call to discuss how our solution could specifically benefit your business. Would you be available for a 15-minute conversation this week?\n\nBest regards,\n[Your Name]\n[Your Contact Information]`)}
                  </div>
                </div>
              </div>
            </>)}
        </DialogContent>
      </Dialog>
    </div>);
}
