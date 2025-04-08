
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { UseFormReturn } from "react-hook-form";

interface PasswordInputProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  showStrengthMeter?: boolean;
  setShowTips?: (show: boolean) => void;
}

export default function PasswordInput({ 
  form, 
  name, 
  label, 
  showStrengthMeter = false,
  setShowTips 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                {...field} 
                onFocus={() => setShowTips && setShowTips(true)}
                onBlur={() => setShowTips && setShowTips(false)}
                className="pr-10"
              />
            </FormControl>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          
          {showStrengthMeter && form.watch(name) && (
            <PasswordStrengthMeter password={form.watch(name)} />
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
