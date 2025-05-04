import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyDetailsForm from "@/components/CompanyDetailsForm";
import ProfileForm from "@/components/profile/ProfileForm";
import { toast } from "sonner";
import ProfileDiagnostics from "@/components/settings/ProfileDiagnostics";
export default function Profile() {
    const auth = useAuth();
    const { user, profile, isLoading, refreshProfile } = auth;
    const userEmail = user?.email; // Extract email directly from user object
    useEffect(() => {
        // Call refreshProfile to make sure we have the latest data
        if (user && !isLoading && refreshProfile) {
            refreshProfile();
        }
    }, [user, isLoading, refreshProfile]);
    useEffect(() => {
        // Detailed logging for verification
        console.log("Current User Details:", {
            email: userEmail,
            userId: user?.id,
            profileName: profile?.name,
            profileCompany: profile?.company,
            profileIndustry: profile?.industry
        });
        // Toast notification to make verification clear to the user
        if (user) {
            toast.info("User Account Verification", {
                description: `Logged in as: ${userEmail || 'Email not available'}`,
                duration: 5000
            });
        }
    }, [user, profile, userEmail, isLoading]);
    if (isLoading) {
        return (<div className="container max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/3"/>
          <Skeleton className="h-4 w-2/3"/>
          <div className="grid gap-6">
            <Skeleton className="h-36 w-full"/>
            <Skeleton className="h-36 w-full"/>
          </div>
        </div>
      </div>);
    }
    return (<div className="container max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your account information</p>
      
      {/* Add the diagnostic component at the top of the profile page */}
      <ProfileDiagnostics />

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
    </div>);
}
