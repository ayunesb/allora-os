
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, ExternalLink, CheckCircle2, ListChecks, Video } from "lucide-react";
import { useHelp } from "@/context/HelpContext";

export function HelpModal() {
  const { isHelpOpen, closeHelp, currentHelp } = useHelp();

  if (!currentHelp) {
    return null;
  }

  return (
    <Dialog open={isHelpOpen} onOpenChange={closeHelp}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="h-5 w-5 text-primary" />
            {currentHelp.title}
          </DialogTitle>
          <DialogDescription>
            {currentHelp.description}
          </DialogDescription>
        </DialogHeader>

        {/* Steps section */}
        {currentHelp.steps && currentHelp.steps.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-foreground">
              <ListChecks className="h-4 w-4 text-primary" />
              Step-by-Step Guide
            </h3>
            <div className="space-y-3">
              {currentHelp.steps.map((step, index) => (
                <div key={index} className="bg-muted/40 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video tutorial section */}
        {currentHelp.video && (
          <div className="mt-4">
            <h3 className="font-semibold flex items-center gap-2 text-foreground mb-2">
              <Video className="h-4 w-4 text-primary" />
              Video Tutorial
            </h3>
            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
              <Button variant="outline" className="gap-2" onClick={() => window.open(currentHelp.video, '_blank')}>
                <Video className="h-4 w-4" />
                Watch Tutorial
              </Button>
            </div>
          </div>
        )}

        {/* Additional resources section */}
        {currentHelp.links && currentHelp.links.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-foreground mb-2">Additional Resources</h3>
            <div className="flex flex-wrap gap-2">
              {currentHelp.links.map((link, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {link.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button onClick={closeHelp} className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
