
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WebhookType } from '@/utils/webhookValidation';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WebhookFormProps {
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onTest: () => Promise<boolean>;
  onSave: () => void;
  isSaving: boolean;
  isValid: boolean;
  isTestLoading: boolean;
  webhookType: WebhookType;
}

const WebhookForm: React.FC<WebhookFormProps> = ({
  title,
  description,
  placeholder,
  value,
  onChange,
  onTest,
  onSave,
  isSaving,
  isValid,
  isTestLoading,
  webhookType
}) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor={`${webhookType}-webhook`}>{title}</Label>
        <div className="flex gap-2">
          <Input
            id={`${webhookType}-webhook`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={!isValid && value ? "border-red-500" : ""}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={onTest}
            disabled={!isValid || isTestLoading || !value}
          >
            {isTestLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing
              </>
            ) : (
              'Test'
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {!isValid && value && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Invalid webhook URL format for {webhookType}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-end">
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            'Save All Webhooks'
          )}
        </Button>
      </div>
    </div>
  );
};

export default WebhookForm;
