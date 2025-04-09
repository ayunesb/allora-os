
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Settings } from 'lucide-react';
import { useUserPreferences, UserPreferences } from '@/hooks/useUserPreferences';

// Define types locally instead of importing them
type ResponseStyle = 'concise' | 'balanced' | 'detailed';
type TechnicalLevel = 'basic' | 'intermediate' | 'advanced';

interface UserPreferencesDialogProps {
  triggerLabel?: string;
  showTriggerIcon?: boolean;
}

const UserPreferencesDialog: React.FC<UserPreferencesDialogProps> = ({
  triggerLabel = 'Preferences',
  showTriggerIcon = true
}) => {
  const { preferences, updatePreference } = useUserPreferences();
  const [open, setOpen] = React.useState(false);

  const handleResponseStyleChange = (value: string) => {
    updatePreference('responseStyle', value as ResponseStyle);
  };

  const handleTechnicalLevelChange = (value: string) => {
    updatePreference('technicalLevel', value as TechnicalLevel);
  };

  const handleShowSourcesChange = (checked: boolean) => {
    updatePreference('showSources', checked);
  };

  const handleFocusAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePreference('focusArea', e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {showTriggerIcon && <Settings className="h-4 w-4" />}
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Response Preferences</DialogTitle>
          <DialogDescription>
            Customize how AI executives respond to your queries.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="responseStyle" className="text-right">
              Style
            </Label>
            <Select
              value={preferences.responseStyle}
              onValueChange={handleResponseStyleChange}
            >
              <SelectTrigger className="col-span-3" id="responseStyle">
                <SelectValue placeholder="Response style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concise">Concise</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="technicalLevel" className="text-right">
              Technical level
            </Label>
            <Select
              value={preferences.technicalLevel}
              onValueChange={handleTechnicalLevelChange}
            >
              <SelectTrigger className="col-span-3" id="technicalLevel">
                <SelectValue placeholder="Technical level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="focusArea" className="text-right">
              Focus area
            </Label>
            <Input
              id="focusArea"
              value={preferences.focusArea}
              onChange={handleFocusAreaChange}
              placeholder="e.g., marketing, finance, operations"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="showSources" className="text-right">
              Show sources
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Switch
                id="showSources"
                checked={preferences.showSources}
                onCheckedChange={handleShowSourcesChange}
              />
              <Label htmlFor="showSources">
                Include reference sources in responses
              </Label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserPreferencesDialog;
