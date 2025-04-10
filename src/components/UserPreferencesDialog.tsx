
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
import { Settings } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import AIModelPreferences from "./preferences/AIModelPreferences";
import ResponseStylePreferences from "./preferences/ResponseStylePreferences";
import LearningPreferences from "./preferences/LearningPreferences";

interface UserPreferencesDialogProps {
  triggerLabel?: string;
}

export default function UserPreferencesDialog({ triggerLabel }: UserPreferencesDialogProps) {
  const [open, setOpen] = useState(false);
  const { preferences, isLoading, savePreferences, updatePreference, resetPreferences } = useUserPreferences();

  const handleSave = async () => {
    await savePreferences(preferences);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          {triggerLabel || "Preferences"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Response Preferences</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="models" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="style">Response Style</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
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
            onClick={() => {
              resetPreferences();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
