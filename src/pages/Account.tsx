import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Save,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  Shield,
  Bell,
  Key,
  Trash,
  AlertTriangle,
} from "lucide-react";
export default function Account() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: user?.email || "",
    phone: profile?.phone || "",
    website: profile?.website || "",
    company: profile?.company || "",
    location: profile?.location || "",
    bio: profile?.bio || "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("You must be logged in to update your profile");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          phone: formData.phone,
          website: formData.website,
          company: formData.company,
          location: formData.location,
          bio: formData.bio,
        })
        .eq("id", user.id);
      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(`Error updating profile: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  // Don't render anything if user is not logged in
  if (!user) {
    return (
      <div className="container mx-auto py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Account Access</CardTitle>
            <CardDescription>
              You must be logged in to view this page
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/auth/login")} className="w-full">
              Log In
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  return (
    <ErrorBoundary>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 w-full space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={profile?.avatar_url || ""}
                    alt={profile?.name || "User"}
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(profile?.name || "User")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-medium">
                  {profile?.name || "User"}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  {profile?.company || "No company"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Plan:</span>
                    <span className="text-sm font-medium">
                      {profile?.subscription_status
                        ? profile.subscription_plan_id
                        : "Free Plan"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <span className="text-sm font-medium">
                      {profile?.subscription_status || "Inactive"}
                    </span>
                  </div>
                  {profile?.subscription_expires_at && (
                    <div className="flex justify-between">
                      <span className="text-sm">Expires:</span>
                      <span className="text-sm font-medium">
                        {new Date(
                          profile.subscription_expires_at,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:w-2/3 w-full">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-4 space-y-4">
                <Card>
                  <form onSubmit={handleSaveProfile}>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your account details and public profile
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="name"
                              name="name"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={handleChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              name="email"
                              value={formData.email}
                              disabled
                              className="pl-10 bg-muted"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Your phone number"
                              value={formData.phone}
                              onChange={handleChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="website"
                              name="website"
                              placeholder="Your website"
                              value={formData.website}
                              onChange={handleChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="company"
                              name="company"
                              placeholder="Your company"
                              value={formData.company}
                              onChange={handleChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="location"
                              name="location"
                              placeholder="Your location"
                              value={formData.location}
                              onChange={handleChange}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          placeholder="Tell us a bit about yourself"
                          value={formData.bio || ""}
                          onChange={handleChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                        {!isLoading && <Save className="ml-2 h-4 w-4" />}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Change Password</Label>
                      <div className="grid gap-4">
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Current password"
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="New password"
                            className="pl-10"
                          />
                        </div>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Button className="mt-2">Update Password</Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security Options</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>Two-factor authentication</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>Email verification</span>
                        </div>
                        <Button variant="outline" size="sm" disabled>
                          Verified
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium text-destructive mb-2">
                        Danger Zone
                      </h3>
                      <div className="flex items-center justify-between bg-destructive/10 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <Trash className="h-4 w-4 text-destructive" />
                          <div>
                            <span className="font-medium">Delete Account</span>
                            <p className="text-sm text-muted-foreground">
                              Once deleted, your account cannot be recovered
                            </p>
                          </div>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when we contact you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span>Email notifications</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span>SMS notifications</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="sms-notifications"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-muted-foreground" />
                          <span>Marketing emails</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="marketing-emails"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-md mt-4 flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium">
                            Communication Preference Note
                          </p>
                          <p className="text-muted-foreground">
                            We respect your communication preferences. You can
                            manage your email subscription settings at any time.
                            By opting in, you agree to receive communications
                            from Allora AI.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
