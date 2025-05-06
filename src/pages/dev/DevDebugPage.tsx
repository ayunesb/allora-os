import React from "react";
import { PageTitle } from "@/components/ui/page-title";
export default function DevDebugPage() {
  return (
    <div className="container mx-auto py-6">
      <PageTitle title="Debug Page" description="For development and testing">
        Debug Page
      </PageTitle>

      <div className="mt-6 space-y-6">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Debug Information</h3>
          <p className="text-muted-foreground">
            Development tools and settings
          </p>
        </div>
      </div>
    </div>
  );
}
