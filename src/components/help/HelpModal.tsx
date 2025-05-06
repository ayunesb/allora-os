import React from "react";
import { useHelp } from "@/context/HelpContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export function HelpModal() {
  const { isHelpOpen, closeHelp, currentHelp } = useHelp();
  if (!currentHelp) {
    return null;
  }
  return (
    <Dialog open={isHelpOpen} onOpenChange={closeHelp}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{currentHelp.title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeHelp}
              className="h-8 w-8 rounded-full"
              aria-label="Close help dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          {currentHelp.description && (
            <DialogDescription>{currentHelp.description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-auto py-4">
          {currentHelp.content && (
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentHelp.content }}
            />
          )}
        </div>

        <DialogFooter>
          <Button onClick={closeHelp}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
