import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createCreditPurchaseCheckout } from '@/utils/stripePayments';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';
export function CreditsCheckout() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const { user } = useUser();
    const creditPackages = [
        { id: 'basic', credits: 100, price: 9.99 },
        { id: 'standard', credits: 500, price: 39.99, popular: true },
        { id: 'premium', credits: 1000, price: 69.99 },
    ];
    const handleCheckout = async (packageId) => {
        if (!user) {
            toast.error('You must be logged in to purchase credits');
            return;
        }
        try {
            setIsProcessing(true);
            setSelectedPackage(packageId);
            const pkg = creditPackages.find(p => p.id === packageId);
            if (!pkg)
                return;
            const session = await createCreditPurchaseCheckout({
                userId: user.id,
                credits: pkg.credits,
                priceUsd: pkg.price
            });
            // Redirect to Stripe checkout
            window.location.href = session.url;
        }
        catch (error) {
            console.error('Error creating checkout session:', error);
            toast.error('Failed to initiate checkout. Please try again.');
        }
        finally {
            setIsProcessing(false);
        }
    };
    return (<div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Purchase Credits</h1>
        <p className="text-muted-foreground">Add more credits to unlock additional AI-powered features.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {creditPackages.map((pkg) => (<Card key={pkg.id} className={`relative overflow-hidden ${pkg.popular ? 'border-primary shadow-md' : ''}`}>
            {pkg.popular && (<div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium">
                POPULAR
              </div>)}
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{pkg.credits} Credits</CardTitle>
              <CardDescription>${pkg.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {pkg.credits} AI interactions
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Advanced AI features
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  No monthly commitment
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={pkg.popular ? "default" : "outline"} onClick={() => handleCheckout(pkg.id)} disabled={isProcessing && selectedPackage === pkg.id}>
                {isProcessing && selectedPackage === pkg.id ? (<span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>) : ('Purchase')}
              </Button>
            </CardFooter>
          </Card>))}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Need a custom plan? <a href="/contact" className="text-primary hover:underline">Contact us</a> for enterprise solutions.</p>
      </div>
    </div>);
}
