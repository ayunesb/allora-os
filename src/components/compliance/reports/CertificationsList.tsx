
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CertificationCard from "./CertificationCard";

const certifications = [
  {
    id: "1",
    title: "GDPR Compliance",
    validUntil: "Dec 2025",
    iconUrl: "https://placeholder.svg",
    alt: "GDPR Certification"
  },
  {
    id: "2",
    title: "SOC 2 Type II",
    validUntil: "Oct 2025",
    iconUrl: "https://placeholder.svg",
    alt: "SOC 2 Certification"
  },
  {
    id: "3",
    title: "ISO 27001",
    validUntil: "Aug 2025",
    iconUrl: "https://placeholder.svg",
    alt: "ISO 27001 Certification"
  }
];

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
