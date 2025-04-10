
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface LegalAcceptanceProps {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
  onAccept: () => void;
}

const CURRENT_VERSIONS = {
  terms: 'v2.0',
  privacy: 'v2.4',
  messaging: 'v1.0'
};

export function LegalAcceptanceModal({ 
  isOpen, 
  userId,
  onClose, 
  onAccept 
}: LegalAcceptanceProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [messagingAccepted, setMessagingAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const allAccepted = termsAccepted && privacyAccepted && messagingAccepted;
  
  const handleSubmit = async () => {
    if (!allAccepted) {
      toast.error('You must accept all terms to continue');
      return;
    }
    
    if (!userId) {
      toast.error('User information is missing');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get client IP (in a real production app, this would be done server-side)
      let ipAddress = null;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
      } catch (error) {
        console.error('Could not determine IP address:', error);
      }
      
      // Store acceptance record in database
      const { error } = await supabase
        .from('user_legal_acceptances')
        .insert({
          user_id: userId,
          terms_of_service: termsAccepted,
          privacy_policy: privacyAccepted,
          messaging_consent: messagingAccepted,
          terms_version: CURRENT_VERSIONS.terms,
          privacy_version: CURRENT_VERSIONS.privacy,
          consent_version: CURRENT_VERSIONS.messaging,
          ip_address: ipAddress,
          user_agent: navigator.userAgent
        });
      
      if (error) {
        throw error;
      }
      
      toast.success('Legal terms accepted successfully');
      onAccept();
    } catch (error: any) {
      console.error('Error saving legal acceptances:', error);
      toast.error('Failed to save your acceptance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Legal Agreements</DialogTitle>
          <DialogDescription>
            Please review and accept the following legal agreements to continue using Allora AI.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the <Link to="/legal/terms-of-service" target="_blank" className="text-primary hover:underline">Terms of Service</Link>
              </label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you agree to our terms of service and conditions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="privacy" 
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(!!checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the <Link to="/legal/privacy-policy" target="_blank" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you consent to our collection and use of your data as described in our privacy policy.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="messaging" 
              checked={messagingAccepted}
              onCheckedChange={(checked) => setMessagingAccepted(!!checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="messaging"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I consent to receive messaging communications
              </label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you consent to receive communications via Email, SMS, and WhatsApp from Allora AI.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={!allAccepted || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Accept & Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
