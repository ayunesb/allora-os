
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSignupForm, SignupValues } from "@/hooks/useSignupForm";
import PasswordInput from "./PasswordInput";
import CompanyInfoFields from "./CompanyInfoFields";
import { useState } from "react";
import SocialLoginButtons from "./SocialLoginButtons";
import { Separator } from "@/components/ui/separator";

interface SignupFormProps {
  onSubmitSuccess: () => void;
}

export default function SignupForm({ onSubmitSuccess }: SignupFormProps) {
  const { form, isLoading, onSubmit, navigate, formError } = useSignupForm({ 
    onSubmitSuccess
  });
  const [showPasswordTips, setShowPasswordTips] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="you@example.com" 
                  {...field} 
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <PasswordInput 
          form={form} 
          name="password" 
          label="Password" 
          showStrengthMeter={true}
          setShowTips={setShowPasswordTips}
        />

        {showPasswordTips && (
          <div className="text-xs text-muted-foreground space-y-1 bg-muted p-2 rounded">
            <p>Your password should:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
        )}

        <PasswordInput 
          form={form} 
          name="confirmPassword" 
          label="Confirm Password" 
        />
        
        <CompanyInfoFields form={form} />
        
        <Button 
          type="submit" 
          className="w-full mt-6" 
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? "Creating Account..." : (
            <>
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialLoginButtons />

        <div className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Button 
              variant="link" 
              className="p-0" 
              onClick={() => navigate("/login")}
              type="button"
            >
              Log in
            </Button>
          </p>
        </div>
      </form>
    </Form>
  );
}

export type { SignupValues };
