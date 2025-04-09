
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import APIKeyInput from './APIKeyInput';

interface APIKeysTabProps {
  companyId: string | null;
  initialApiKeys: {
    stripe: string;
    twilio_sid: string;
    twilio_token: string;
    heygen: string;
  };
  isLoading: boolean;
}

const APIKeysTab = ({ companyId, initialApiKeys, isLoading }: APIKeysTabProps) => {
  const [stripeKey, setStripeKey] = useState(initialApiKeys.stripe);
  const [twilioSid, setTwilioSid] = useState(initialApiKeys.twilio_sid);
  const [twilioToken, setTwilioToken] = useState(initialApiKeys.twilio_token);
  const [heygenKey, setHeygenKey] = useState(initialApiKeys.heygen);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveApiConfiguration = async () => {
    if (!companyId) {
      toast.error("No company found to save settings");
      return;
    }
    
    setIsSaving(true);
    try {
      // First, get the current details to preserve other data
      const { data: currentCompany } = await supabase
        .from('companies')
        .select('details')
        .eq('id', companyId)
        .single();
      
      // Prepare the updated details object, preserving existing data
      // Fix: Ensure currentCompany.details is handled properly whether it's null, undefined or an object
      const currentDetails = currentCompany?.details || {};
      const updatedDetails = {
        ...currentDetails,
        api_keys: {
          stripe: stripeKey,
          twilio_sid: twilioSid,
          twilio_token: twilioToken,
          heygen: heygenKey
        }
      };
      
      // Update the company record with the new details
      const { error } = await supabase
        .from('companies')
        .update({ 
          details: updatedDetails
        })
        .eq('id', companyId);
      
      if (error) throw error;
      
      toast.success("API configuration saved successfully");
    } catch (error) {
      console.error("Error saving API configuration:", error);
      toast.error("Failed to save API configuration");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading configuration...</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys Configuration</CardTitle>
        <CardDescription>
          Manage integration keys for external services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <APIKeyInput 
          id="stripe-key" 
          label="Stripe API Key" 
          placeholder="sk_test_..." 
          value={stripeKey}
          onChange={setStripeKey}
        />
        
        <APIKeyInput 
          id="twilio-sid" 
          label="Twilio Account SID" 
          placeholder="AC..." 
          value={twilioSid}
          onChange={setTwilioSid}
          isSecret={false}
        />
        
        <APIKeyInput 
          id="twilio-token" 
          label="Twilio Auth Token" 
          value={twilioToken}
          onChange={setTwilioToken}
        />
        
        <APIKeyInput 
          id="heygen-key" 
          label="Heygen API Key" 
          value={heygenKey}
          onChange={setHeygenKey}
        />
        
        <Button 
          onClick={handleSaveApiConfiguration}
          disabled={isSaving || !companyId}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save API Configuration"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default APIKeysTab;
