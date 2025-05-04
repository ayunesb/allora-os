import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { updateUserPassword } from '@/services/authService';
export default function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords don\'t match',
                description: 'Please make sure your passwords match',
                variant: 'destructive',
            });
            return;
        }
        if (password.length < 6) {
            toast({
                title: 'Password too short',
                description: 'Password must be at least 6 characters long',
                variant: 'destructive',
            });
            return;
        }
        setIsLoading(true);
        try {
            const result = await updateUserPassword(password);
            if (result.success) {
                toast({
                    title: 'Password updated',
                    description: 'Your password has been successfully updated',
                });
                // Redirect to login page after successful password update
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
            else {
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to update password',
                    variant: 'destructive',
                });
            }
        }
        catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'An unexpected error occurred',
                variant: 'destructive',
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
          <CardDescription>
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" required/>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" required/>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter>
          <div className="text-center w-full text-sm text-muted-foreground">
            <p>
              After updating your password, you'll be redirected to the login page.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>);
}
