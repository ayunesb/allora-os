import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { updateUserProfile } from "@/utils/profileHelpers";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyDetailsForm from "@/components/CompanyDetailsForm";
import ProfileForm from "@/components/profile/ProfileForm";

export default function Profile() {
  const { user, profile, isProfileLoading, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && !isProfileLoading) {
      setName(profile.name || "");
      setCompany(profile.company || "");
      setIndustry(profile.industry || "");
    }
  }, [profile, isProfileLoading]);

  async function handleUpdateProfile() {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const success = await updateUserProfile(user.id, {
        name,
        company,
        industry
      });
      
      if (success) {
        await refreshProfile();
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  }

  if (isProfileLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-24">
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
    <div className="container max-w-4xl mx-auto px-4 py-24">
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
