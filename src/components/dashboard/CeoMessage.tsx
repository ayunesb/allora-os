
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CeoMessageHeader } from "./ceo-message/CeoMessageHeader";
import { CeoMessageContent } from "./ceo-message/CeoMessageContent";
import { CeoMessageFooter } from "./ceo-message/CeoMessageFooter";

interface CeoMessageProps {
  riskAppetite: 'low' | 'medium' | 'high';
}

export default function CeoMessage({ riskAppetite }: CeoMessageProps) {
  return (
    <Card className="mb-8 border-primary/20">
      <CardHeader className="bg-primary/5">
        <CeoMessageHeader />
      </CardHeader>
      <CardContent className="pt-6">
        <CeoMessageContent riskAppetite={riskAppetite} />
      </CardContent>
      <CeoMessageFooter />
    </Card>
  );
}
