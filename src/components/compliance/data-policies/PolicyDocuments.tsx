
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import DocumentList from "./policy-documents/DocumentList";

export default function PolicyDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Policy Documents
        </CardTitle>
        <CardDescription>
          Legal and compliance documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DocumentList />
      </CardContent>
    </Card>
  );
}
