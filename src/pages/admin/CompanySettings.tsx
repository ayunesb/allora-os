import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Building2, Users, Cog, Shapes } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useCompanyManagement } from "@/hooks/admin/useCompanyManagement";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";
import { BrandIdentityForm } from "@/components/onboarding/BrandIdentityForm";
export default function CompanySettings() {
    const { companies, isLoading, loadCompanies, updateCompany } = useCompanyManagement();
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);
    const breakpoint = useBreakpoint();
    const isMobileView = ['xs', 'mobile'].includes(breakpoint);
    const [companyDetails, setCompanyDetails] = useState({
        primaryColor: "#4F46E5",
        secondaryColor: "#10B981",
        brandTone: "friendly",
        logoUrl: "",
    });
    const form = useForm({
        defaultValues: {
            name: "",
            industry: "",
            description: "",
            mission: "",
            vision: "",
            headquarters: "",
            phone: "",
        },
    });
    useEffect(() => {
        loadCompanies();
    }, [loadCompanies]);
    useEffect(() => {
        if (companies && companies.length > 0) {
            const company = companies[0];
            form.reset({
                name: company.name || "",
                industry: company.industry || "",
                description: company.details?.description || "",
                mission: company.details?.mission || "",
                vision: company.details?.vision || "",
                headquarters: company.details?.headquarters || "",
                phone: company.details?.phone || "",
            });
            // Load branding details if available
            if (company.details) {
                setCompanyDetails({
                    primaryColor: company.details.primaryColor || "#4F46E5",
                    secondaryColor: company.details.secondaryColor || "#10B981",
                    brandTone: company.details.brandTone || "friendly",
                    logoUrl: company.details.logoUrl || "",
                });
            }
        }
    }, [companies, form]);
    const onSubmit = async (data) => {
        if (!companies || companies.length === 0) {
            toast.error("No company found to update");
            return;
        }
        setIsSaving(true);
        try {
            const companyId = companies[0].id;
            const updatedData = {
                name: data.name,
                industry: data.industry,
                details: {
                    description: data.description,
                    mission: data.mission,
                    vision: data.vision,
                    headquarters: data.headquarters,
                    phone: data.phone,
                    ...(companies[0].details || {})
                }
            };
            await updateCompany(companyId, updatedData);
            toast.success("Company settings updated successfully");
        }
        catch (error) {
            console.error("Error updating company:", error);
            toast.error("Failed to update company settings");
        }
        finally {
            setIsSaving(false);
        }
    };
    const updateBrandingDetails = (details) => {
        if (!companies || companies.length === 0) {
            toast.error("No company found to update");
            return;
        }
        setIsSaving(true);
        const companyId = companies[0].id;
        // Update the state
        setCompanyDetails({
            ...companyDetails,
            ...details
        });
        // Update the company in the database
        updateCompany(companyId, {
            details: {
                ...companies[0].details,
                ...details
            }
        })
            .then(() => {
            toast.success("Brand identity updated successfully");
        })
            .catch((error) => {
            console.error("Error updating brand identity:", error);
            toast.error("Failed to update brand identity");
        })
            .finally(() => {
            setIsSaving(false);
        });
    };
    const industries = [
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "Manufacturing",
        "Retail",
        "Media",
        "Transportation",
        "Energy",
        "Consulting",
        "Other"
    ];

    // Explicitly type 'field' parameter
    const renderField = (field: { name: string; label: string; value: string }) => (
        <div>
            <label>{field.label}</label>
            <input value={field.value} />
        </div>
    );

    // Ensure 'children' is used correctly and define CustomComponent properly
    const CustomComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <div>{children}</div>
    );

    return (<>
      <Helmet>
        <title>Company Settings | Allora AI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Company Settings</h1>
          <p className="text-muted-foreground">
            Manage company-wide settings and configurations.
          </p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${isMobileView ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <TabsTrigger value="general">
              <Building2 className="h-4 w-4 mr-2"/>
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="branding">
              <Shapes className="h-4 w-4 mr-2"/>
              <span>Branding</span>
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2"/>
              <span>Team</span>
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Cog className="h-4 w-4 mr-2"/>
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2"/>
                  Company Information
                </CardTitle>
                <CardDescription>
                  Update your company's basic information and profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (<FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company name" {...field}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>)}/>

                      <FormField control={form.control} name="industry" render={({ field }) => (<FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry"/>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries.map((industry) => (<SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>)}/>

                      <FormField control={form.control} name="headquarters" render={({ field }) => (<FormItem>
                            <FormLabel>Headquarters</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter headquarters location" {...field}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>)}/>

                      <FormField control={form.control} name="phone" render={({ field }) => (<FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter contact phone" {...field}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>)}/>
                    </div>

                    <FormField control={form.control} name="description" render={({ field }) => (<FormItem>
                          <FormLabel>Company Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter a description of your company" className="min-h-[120px]" {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>)}/>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="mission" render={({ field }) => (<FormItem>
                            <FormLabel>Mission Statement</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your company's mission" className="min-h-[100px]" {...field}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>)}/>

                      <FormField control={form.control} name="vision" render={({ field }) => (<FormItem>
                            <FormLabel>Vision Statement</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your company's vision" className="min-h-[100px]" {...field}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>)}/>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isSaving}>
                        Reset
                      </Button>
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shapes className="h-5 w-5 mr-2"/>
                  Brand Identity
                </CardTitle>
                <CardDescription>
                  Configure your company's branding elements and visual identity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BrandIdentityForm companyDetails={companyDetails} updateCompanyDetails={updateBrandingDetails}/>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2" onClick={() => setCompanyDetails({
            primaryColor: "#4F46E5",
            secondaryColor: "#10B981",
            brandTone: "friendly",
            logoUrl: "",
        })} disabled={isSaving}>
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4 mt-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2"/>
                  Team Management
                </CardTitle>
                <CardDescription>
                  Manage your company team and departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20">
                  <p className="text-center text-muted-foreground">
                    Team management settings will be implemented in a future update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cog className="h-5 w-5 mr-2"/>
                  System Preferences
                </CardTitle>
                <CardDescription>
                  Configure system-wide preferences for your company
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20">
                  <p className="text-center text-muted-foreground">
                    System preference settings will be implemented in a future update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>);
}
