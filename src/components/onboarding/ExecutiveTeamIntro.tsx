import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExecutiveTeamCarousel } from "./ExecutiveTeamCarousel";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { WhatsAppOptIn } from "./WhatsAppOptIn";

interface ExecutiveTeamIntroProps {
  executiveTeamEnabled: boolean;
  setExecutiveTeamEnabled: (enabled: boolean) => void;
  riskAppetite: 'low' | 'medium' | 'high';
  companyName: string;
  onComplete: () => Promise<void>;
  isLoading: boolean;
}

export default function ExecutiveTeamIntro({
  executiveTeamEnabled,
  setExecutiveTeamEnabled,
  riskAppetite,
  companyName,
  onComplete,
  isLoading
}: ExecutiveTeamIntroProps) {
  const [whatsAppConsent, setWhatsAppConsent] = React.useState(true);
  const [emailConsent, setEmailConsent] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCompleteSetup = async () => {
    // Clear any previous error messages
    setErrorMessage(null);
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    try {
      console.log("Completing setup with preferences:", {
        whatsAppConsent,
        emailConsent,
        executiveTeamEnabled
      });
      
      // Save communication preferences to company details
      await onComplete(); // Call the onComplete function which returns a Promise
    } catch (error: any) {
      console.error("Error completing setup:", error);
      setErrorMessage(error.message || "Failed to complete setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Meet Your Executive AI Team
      </h2>
      
      <p className="text-center text-muted-foreground">
        Based on your risk profile ({riskAppetite}), we've assembled the perfect executive team for {companyName}.
      </p>

      <ExecutiveTeamCarousel executives={[
        {
          id: "1",
          name: "Alex Morgan",
          role: "ceo",
          title: "CEO",
          specialty: "Strategic Planning & Leadership",
          avatar: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png"
        },
        {
          id: "2",
          name: "Jordan Chen",
          role: "cfo",
          title: "CFO",
          specialty: "Financial Planning & Risk Management",
          avatar: "/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png"
        },
        {
          id: "3",
          name: "Taylor Reynolds",
          role: "cmo",
          title: "CMO",
          specialty: "Marketing Strategy & Growth",
          avatar: "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png"
        }
      ]} />

      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Communication Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="whatsapp-consent"
                  className="mt-1"
                  checked={whatsAppConsent}
                  onChange={(e) => setWhatsAppConsent(e.target.checked)}
                />
                <div>
                  <label htmlFor="whatsapp-consent" className="font-medium block">
                    WhatsApp Business Messages
                  </label>
                  <p className="text-sm text-muted-foreground">
                    I agree to receive business messages via WhatsApp from Allora AI. I understand I can text STOP at any time to opt out.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="email-consent"
                  className="mt-1"
                  checked={emailConsent}
                  onChange={(e) => setEmailConsent(e.target.checked)}
                />
                <div>
                  <label htmlFor="email-consent" className="font-medium block">
                    Email Communications
                  </label>
                  <p className="text-sm text-muted-foreground">
                    I agree to receive email communications from Allora AI. Each email will include an unsubscribe option.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8">
        <Button
          onClick={handleCompleteSetup}
          disabled={isLoading || isSubmitting}
          size="lg"
          className="w-full max-w-md"
        >
          {isLoading || isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Complete Setup & Launch Dashboard"
          )}
        </Button>
      </div>

      {errorMessage && (
        <div className="text-center text-red-500 mt-4">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
