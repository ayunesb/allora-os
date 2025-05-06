import React from "react";
import { PageTitle } from "@/components/ui/page-title";
export default function Settings() {
  return (
    <div className="container mx-auto py-6">
      <PageTitle
        title="Settings"
        description="Manage your account and application settings"
      >
        Settings
      </PageTitle>

      <div className="mt-6 space-y-6">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-muted-foreground">
            Manage your account preferences
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <p className="text-muted-foreground">
            Configure how you receive notifications
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-medium">Privacy Settings</h3>
          <p className="text-muted-foreground">
            Manage your privacy preferences
          </p>
        </div>
      </div>
    </div>
  );
}
