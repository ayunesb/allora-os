
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CertificationCard from "./CertificationCard";
import { certifications } from "./mockData";

export default function CertificationsList() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
        <CardDescription>
          Current compliance certifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certifications.map(cert => (
            <CertificationCard
              key={cert.id}
              title={cert.title}
              validUntil={cert.validUntil}
              iconUrl={cert.iconUrl}
              alt={cert.alt}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
