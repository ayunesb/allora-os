import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
const strategySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    riskLevel: z.enum(["Low", "Medium", "High"]),
});
const StrategyForm = ({ defaultValues, onSubmit, isSubmitting, isEditing }) => {
    const form = useForm({
        resolver: zodResolver(strategySchema),
        defaultValues,
    });
    return (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem>
              <FormLabel>Strategy Title</FormLabel>
              <FormControl>
                <Input placeholder="Market Expansion Strategy" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>)}/>
        
        <FormField control={form.control} name="description" render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your strategy here..." rows={4} {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>)}/>
        
        <FormField control={form.control} name="riskLevel" render={({ field }) => (<FormItem>
              <FormLabel>Risk Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Low">Low Risk</SelectItem>
                  <SelectItem value="Medium">Medium Risk</SelectItem>
                  <SelectItem value="High">High Risk</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>)}/>
        
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : (isEditing ? "Update Strategy" : "Create Strategy")}
          </Button>
        </DialogFooter>
      </form>
    </Form>);
};
export default StrategyForm;
