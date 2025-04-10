
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import DocumentList from "./policy-documents/DocumentList";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function PolicyDocuments() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <Card>
      <CardHeader className={isMobileView ? "px-4 py-3" : undefined}>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Policy Documents
        </CardTitle>
        <CardDescription>
          Legal and compliance documents
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobileView ? "px-4 py-3 pt-0" : undefined}>
        <DocumentList />
      </CardContent>
    </Card>
  );
}
