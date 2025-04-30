
import React, { useState } from 'react';
import { createCreditPurchaseCheckout, getCurrentCreditBalance } from '@/utils/stripePayments';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

// Define the credit package options
const CREDIT_PACKAGES = [
  { id: 'small', name: 'Starter', credits: 100, priceId: 'price_example1', price: '$9.99' },
  { id: 'medium', name: 'Professional', credits: 500, priceId: 'price_example2', price: '$39.99' },
  { id: 'large', name: 'Enterprise', credits: 1000, priceId: 'price_example3', price: '$69.99' },
];

export function CreditsCheckout() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // Fetch the current credit balance
  const { data: creditBalance } = useQuery({
    queryKey: ['credits'],
    queryFn: getCurrentCreditBalance,
  });

  const handlePurchaseCredits = async (packageId: string) => {
    setIsLoading(packageId);
    try {
      const creditPackage = CREDIT_PACKAGES.find(pkg => pkg.id === packageId);
      if (!creditPackage) {
        toast.error('Invalid package selection');
        return;
      }

      const checkoutUrl = await createCreditPurchaseCheckout(
        creditPackage.credits,
        creditPackage.priceId
      );

      if (checkoutUrl) {
        // Redirect to Stripe checkout
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Failed to initiate checkout process');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Purchase Credits</h1>
        <p className="text-muted-foreground mt-2">
          Credits are used for premium features in the platform.
          {creditBalance !== null && (
            <span className="ml-2 font-medium">
              Your current balance: <span className="text-primary">{creditBalance} credits</span>
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CREDIT_PACKAGES.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.credits} credits</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold">{pkg.price}</div>
              <p className="text-sm text-muted-foreground mt-2">
                {(pkg.credits / parseFloat(pkg.price.replace('$', ''))).toFixed(1)} credits per dollar
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handlePurchaseCredits(pkg.id)}
                disabled={!!isLoading}
              >
                {isLoading === pkg.id ? 'Processing...' : `Buy Now`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground">
        <p>Note: You'll be redirected to a secure Stripe checkout page to complete your purchase.</p>
      </div>
    </div>
  );
}
