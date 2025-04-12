
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useHelp } from "@/context/HelpContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, X, Video, ExternalLink, CheckCircle } from "lucide-react";

export function HelpModal() {
  const { isHelpOpen, closeHelp, currentHelp } = useHelp();

  if (!currentHelp) return null;

  return (
    <Dialog open={isHelpOpen} onOpenChange={closeHelp}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {currentHelp.title}
          </DialogTitle>
          <DialogDescription>
            {currentHelp.description}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 mt-4">
          {currentHelp.steps && currentHelp.steps.length > 0 && (
            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-sm">Steps</h4>
              <div className="space-y-3">
                {currentHelp.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm">{step.title}</h5>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentHelp.video && (
            <div className="space-y-2 mb-6">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Video className="h-4 w-4" /> Tutorial Video
              </h4>
              <div className="aspect-video rounded-md overflow-hidden bg-muted">
                <iframe 
                  src={currentHelp.video} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {currentHelp.links && currentHelp.links.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Additional Resources</h4>
              <div className="space-y-2">
                {currentHelp.links.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> {link.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        
        <Separator className="my-4" />
        
        <div className="flex justify-end">
          <Button onClick={closeHelp} variant="secondary">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
