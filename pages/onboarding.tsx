import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import OnboardingLayout from '@/components/layouts/OnboardingLayout';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Onboarding() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await trpc.auth.register.mutateAsync(data);
      toast({
        title: 'Success',
        description: 'You have successfully registered!',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField name="email" control={form.control}>
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="password" control={form.control}>
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" isLoading={isLoading}>
            Register
          </Button>
        </form>
      </Form>
    </OnboardingLayout>
  );
}