import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Key, Eye, EyeOff } from 'lucide-react';
import APIKeyInput from '@/components/admin/APIKeyInput';
const ApiKeysSection = ({ personalApiKeys, handleApiKeyChange }) => {
    const [showApiSection, setShowApiSection] = useState(false);
    return (<div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Key className="h-5 w-5"/>
          Personal API Keys
        </h3>
        <Button type="button" variant="outline" size="sm" onClick={() => setShowApiSection(!showApiSection)}>
          {showApiSection ? (<>
              <EyeOff className="h-4 w-4 mr-2"/>
              Hide
            </>) : (<>
              <Eye className="h-4 w-4 mr-2"/>
              Show
            </>)} API Keys
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Add your personal API keys to use instead of company-wide keys.
        These keys will override company keys for your account only.
      </p>
      
      {showApiSection && (<div className="space-y-4 p-4 border rounded-md bg-muted/30">
          <APIKeyInput id="stripe-key" label="Stripe API Key" value={personalApiKeys.stripe} onChange={(value) => handleApiKeyChange('stripe', value)} placeholder="Enter your Stripe API key"/>
          
          <APIKeyInput id="twilio-sid" label="Twilio SID" value={personalApiKeys.twilio_sid} onChange={(value) => handleApiKeyChange('twilio_sid', value)} placeholder="Enter your Twilio SID"/>
          
          <APIKeyInput id="twilio-token" label="Twilio Auth Token" value={personalApiKeys.twilio_token} onChange={(value) => handleApiKeyChange('twilio_token', value)} placeholder="Enter your Twilio auth token"/>
          
          <APIKeyInput id="heygen-key" label="HeyGen API Key" value={personalApiKeys.heygen} onChange={(value) => handleApiKeyChange('heygen', value)} placeholder="Enter your HeyGen API key"/>
          
          <p className="text-xs text-muted-foreground mt-2">
            These keys are stored securely and used only for your account.
          </p>
        </div>)}
    </div>);
};
export default ApiKeysSection;
