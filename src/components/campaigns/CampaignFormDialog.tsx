import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// Define the campaign form schema
const campaignSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    platform: z.enum(["meta", "tiktok", "email", "whatsapp"]),
    budget: z.coerce.number().min(1, "Budget must be at least 1"),
});
export default function CampaignFormDialog({ open, onOpenChange, onSubmit, defaultValues = {
    name: "",
    platform: "meta",
    budget: 100,
}, isSubmitting, isEditing }) {
    const form = useForm({
        resolver: zodResolver(campaignSchema),
        defaultValues
    });
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Campaign" : "Create New Campaign"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update your campaign details below." : "Fill in the details for your new marketing campaign."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (<FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer Product Launch" {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>
            
            <FormField control={form.control} name="platform" render={({ field }) => (<FormItem>
                  <FormLabel>Platform</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="meta">Meta</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>)}/>
            
            <FormField control={form.control} name="budget" render={({ field }) => (<FormItem>
                  <FormLabel>Budget ($)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>
            
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : (isEditing ? "Update Campaign" : "Create Campaign")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>);
}
