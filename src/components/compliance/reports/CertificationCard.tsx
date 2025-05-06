import { Button } from "@/components/ui/button";
export default function CertificationCard({ title, validUntil, iconUrl, alt }) {
  return (
    <div className="border rounded-md p-4 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
        <img src={iconUrl} alt={alt} className="w-12 h-12" />
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Valid until {validUntil}
      </p>
      <Button size="sm" variant="ghost">
        View Certificate
      </Button>
    </div>
  );
}
