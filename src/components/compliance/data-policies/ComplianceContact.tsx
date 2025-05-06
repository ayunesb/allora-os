import { Button } from "@/components/ui/button";
export default function ComplianceContact() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">Data Protection Officer</h3>
        <p className="text-sm text-muted-foreground">Jane Smith</p>
      </div>
      <div>
        <h3 className="font-medium">Email</h3>
        <p className="text-sm text-muted-foreground">dpo@allora-ai.com</p>
      </div>
      <div>
        <h3 className="font-medium">Response Time</h3>
        <p className="text-sm text-muted-foreground">Within 48 hours</p>
      </div>
      <Button className="w-full">Contact DPO</Button>
    </div>
  );
}
