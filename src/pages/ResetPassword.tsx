
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { sendPasswordResetEmail } from '@/services/authService';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await sendPasswordResetEmail(email);
      
      if (result.success) {
        setResetSent(true);
        toast({
          title: 'Reset email sent',
          description: 'Check your email for password reset instructions',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to send reset instructions',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            {resetSent
              ? 'Check your email for reset instructions'
              : 'Enter your email address and we\'ll send you a reset link'}
          </CardDescription>
        </CardHeader>
        
        {!resetSent ? (
          <>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter>
              <div className="text-center w-full text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </>
        ) : (
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              <p className="text-sm">
                We've sent an email to <strong>{email}</strong> with instructions to reset your password.
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setResetSent(false)}
              >
                Try Again
              </Button>
              
              <div className="mt-4">
                <Link to="/login" className="text-primary hover:underline text-sm">
                  Back to login
                </Link>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
