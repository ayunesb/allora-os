import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function UserOnboarding() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Onboarding</CardTitle>
          <CardDescription>
            Configure the onboarding process for new users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>User onboarding configuration content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
