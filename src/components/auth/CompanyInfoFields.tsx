import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function CompanyInfoFields({ form }) {
    return (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="company" render={({ field }) => (<FormItem>
            <FormLabel>Company Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Acme Inc." {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>)}/>
      
      <FormField control={form.control} name="industry" render={({ field }) => (<FormItem>
            <FormLabel>Industry (Optional)</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>)}/>
    </div>);
}
