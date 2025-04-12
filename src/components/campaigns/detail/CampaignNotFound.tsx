
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignNotFoundProps {
  onBack: () => void;
}

export function CampaignNotFound({ onBack }: CampaignNotFoundProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Campaign Not Found</h1>
        <p className="text-muted-foreground mb-4">The campaign you're looking for doesn't exist or you don't have access to it.</p>
        <Button onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Campaigns
        </Button>
      </div>
    </div>
  );
}
