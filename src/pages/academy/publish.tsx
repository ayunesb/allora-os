import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { PageTitle } from "@/components/ui/page-title";
import { GraduationCap, Upload } from "lucide-react";
import { toast } from "sonner";
export default function PublishAcademyContent() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const handlePublish = () => {
    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Content published successfully!");
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  return (
    <div className="container px-4 py-6">
      <DashboardBreadcrumb
        rootPath="/academy"
        rootLabel="Academy"
        rootIcon={<GraduationCap className="h-4 w-4" />}
        currentPath="/academy/publish"
        currentLabel="Publish Content"
      />

      <div className="mb-6">
        <PageTitle>Publish Academy Content</PageTitle>
        <p className="text-muted-foreground">
          Upload and publish new educational content to the academy
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
          <CardDescription>
            Provide information about the content you're publishing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form fields would go here */}
          <p>Content form fields placeholder</p>
        </CardContent>
        <CardFooter className="justify-end space-x-2 border-t pt-6">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handlePublish} disabled={isUploading}>
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Uploading {uploadProgress}%
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Publish Content
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
