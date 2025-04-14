import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyDetailsForm from "@/components/CompanyDetailsForm";
import ProfileForm from "@/components/profile/ProfileForm";
import { toast } from "sonner";

export default function Profile() {
  const { user, profile, isProfileLoading, refreshProfile } = useAuth();
  
  useEffect(() => {
    // Call refreshProfile to make sure we have the latest data
    if (user && !isProfileLoading) {
      refreshProfile();
    }
  }, [user]);

  useEffect(() => {
    // Detailed logging for verification
    console.log("Current User Details:", {
      email: user?.email,
      userId: user?.id,
      profileName: profile?.name,
      profileCompany: profile?.company,
      profileIndustry: profile?.industry
    });

    // Toast notification to make verification clear to the user
    if (user) {
      toast.info("User Account Verification", {
        description: `Logged in as: ${user.email}`,
        duration: 5000
      });
    }
  }, [user, profile, isProfileLoading]);

  if (isProfileLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <div className="grid gap-6">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your account information</p>

      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="company">Company Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6">
          <ProfileForm />
        </TabsContent>
        
        <TabsContent value="company">
          <CompanyDetailsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
