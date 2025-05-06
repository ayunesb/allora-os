import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export default function RegulatoryFrameworks() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="gdpr">
        <AccordionTrigger>
          <div className="flex items-center">
            GDPR Compliance
            <Badge variant="outline" className="ml-2">
              Required
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              The General Data Protection Regulation (GDPR) is a comprehensive
              data protection law in the EU. Our platform implements the
              following GDPR requirements:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Right to access personal data</li>
              <li>Right to rectification</li>
              <li>Right to erasure (right to be forgotten)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="ccpa">
        <AccordionTrigger>
          <div className="flex items-center">
            CCPA Compliance
            <Badge variant="outline" className="ml-2">
              Required
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              The California Consumer Privacy Act (CCPA) enhances privacy rights
              for California residents. Our platform implements the following
              CCPA requirements:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Right to know what personal information is collected</li>
              <li>
                Right to know whether personal information is sold or disclosed
              </li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access personal information</li>
              <li>Right to equal service and price</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="hipaa">
        <AccordionTrigger>
          <div className="flex items-center">
            HIPAA Compliance
            <Badge variant="outline" className="ml-2">
              Optional
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              The Health Insurance Portability and Accountability Act (HIPAA)
              sets standards for protecting sensitive patient health
              information. Enable this only if your organization handles
              protected health information (PHI).
            </p>
            <Button variant="outline" size="sm">
              Enable HIPAA Compliance
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
