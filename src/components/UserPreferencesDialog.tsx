
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { Settings, Loader2 } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import AIModelPreferences from "./preferences/AIModelPreferences";
import ResponseStylePreferences from "./preferences/ResponseStylePreferences";
import LearningPreferences from "./preferences/LearningPreferences";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface UserPreferencesDialogProps {
  triggerLabel?: React.ReactNode;
  triggerVariant?: string;
}

export default function UserPreferencesDialog({ triggerLabel, triggerVariant }: UserPreferencesDialogProps) {
  const [open, setOpen] = useState(false);
  const { preferences, isLoading, savePreferences, updatePreference, resetPreferences } = useUserPreferences();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await savePreferences(preferences);
      toast.success("Preferences saved successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to save preferences");
      console.error("Error saving preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleReset = async () => {
    try {
      setIsSaving(true);
      await resetPreferences();
      toast.success("Preferences reset to defaults");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to reset preferences");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.div whileTap={{ scale: 0.97 }} transition={{ duration: 0.1 }}>
          <Button variant={triggerVariant as any || "outline"} className="flex items-center gap-2">
            {triggerLabel || (
              <>
                <Settings className="h-4 w-4" />
                Preferences
              </>
            )}
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Response Preferences</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="models" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="models" className="min-h-10">AI Models</TabsTrigger>
            <TabsTrigger value="style" className="min-h-10">Response Style</TabsTrigger>
            <TabsTrigger value="learning" className="min-h-10">Learning</TabsTrigger>
          </TabsList>
          
          <TabsContent value="models">
            <AIModelPreferences 
              preferences={preferences} 
              updatePreference={updatePreference} 
            />
          </TabsContent>
          
          <TabsContent value="style">
            <ResponseStylePreferences 
              preferences={preferences} 
              updatePreference={updatePreference} 
            />
          </TabsContent>
          
          <TabsContent value="learning">
            <LearningPreferences 
              preferences={preferences} 
              updatePreference={updatePreference} 
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="transition-all duration-200 hover:bg-destructive/10"
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isSaving || isLoading}
            className="transition-all duration-200 hover:bg-amber-500/10"
          >
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving || isLoading}
            className="min-w-24 relative group"
          >
            {(isSaving || isLoading) ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <motion.span
                initial={{ opacity: 1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1 }}
              >
                Save Preferences
              </motion.span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
