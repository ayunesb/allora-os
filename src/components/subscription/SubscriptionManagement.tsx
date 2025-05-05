import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, CreditCard, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '@/components/ui/alert-dialog';
export default function SubscriptionManagement({ onUpgradePlan }) {
    const { subscription, isLoading, isUpdating, openCustomerPortal, cancelCurrentSubscription, reactivateCurrentSubscription, refresh } = useSubscription();
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const formatDate = (dateString) => {
        if (!dateString)
            return 'N/A';
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const handleCancelSubscription = async () => {
        const success = await cancelCurrentSubscription();
        if (success) {
            setShowCancelDialog(false);
        }
    };
    const handleReactivateSubscription = async () => {
        await reactivateCurrentSubscription();
    };
    const handleManageBilling = async () => {
        await openCustomerPortal();
    };
    if (isLoading) {
        return (<Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin"/>
            Loading Subscription Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 bg-muted rounded-md animate-pulse w-3/4"></div>
            <div className="h-6 bg-muted rounded-md animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>);
    }
    if (!subscription?.isActive) {
        return (<Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500"/>
            No Active Subscription
          </CardTitle>
          <CardDescription>
            You currently don't have an active subscription plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to a paid plan to access premium features including:
          </p>
          <ul className="text-sm space-y-1 list-disc pl-4 mb-4">
            <li>Advanced AI strategy recommendations</li>
            <li>Campaign automation and management</li>
            <li>Lead scoring and nurturing</li>
            <li>Integration with marketing platforms</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={onUpgradePlan} className="w-full">
            View Pricing Plans
          </Button>
        </CardFooter>
      </Card>);
    }
    return (<>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {subscription.cancelAtPeriodEnd ? (<AlertTriangle className="h-5 w-5 text-amber-500"/>) : (<CheckCircle className="h-5 w-5 text-green-500"/>)}
            {subscription.cancelAtPeriodEnd
            ? 'Subscription Ending'
            : 'Active Subscription'}
          </CardTitle>
          <CardDescription>
            {subscription.planName || 'Premium Plan'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium">
                {subscription.status === 'active' ? (<span className="text-green-600 dark:text-green-400">Active</span>) : subscription.status === 'canceled' ? (<span className="text-red-600 dark:text-red-400">Canceled</span>) : subscription.status === 'trialing' ? (<span className="text-blue-600 dark:text-blue-400">Trial</span>) : (subscription.status)}
              </span>
              
              <span className="text-muted-foreground">
                {subscription.cancelAtPeriodEnd ? 'Ends on:' : 'Renews on:'}
              </span>
              <span className="font-medium">
                {formatDate(subscription.currentPeriodEnd)}
              </span>
              
              {subscription.cancelAtPeriodEnd && (<>
                  <span className="text-muted-foreground">Status after end date:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">Canceled</span>
                </>)}
              
              <span className="text-muted-foreground">Subscription started:</span>
              <span className="font-medium">{formatDate(subscription.createdAt)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleManageBilling} disabled={isUpdating}>
            <CreditCard className="mr-2 h-4 w-4"/>
            {isUpdating ? 'Processing...' : 'Manage Billing'}
          </Button>
          
          {subscription.cancelAtPeriodEnd ? (<Button className="w-full sm:w-auto" onClick={handleReactivateSubscription} disabled={isUpdating}>
              <Calendar className="mr-2 h-4 w-4"/>
              {isUpdating ? 'Processing...' : 'Reactivate Subscription'}
            </Button>) : (<Button variant="destructive" className="w-full sm:w-auto" onClick={() => setShowCancelDialog(true)} disabled={isUpdating}>
              {isUpdating ? 'Processing...' : 'Cancel Subscription'}
            </Button>)}
        </CardFooter>
      </Card>
      
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
            <AlertDialogDescription>
              Your subscription will remain active until the end of your current billing period on {formatDate(subscription?.currentPeriodEnd)}.
              After this date, you'll lose access to premium features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelSubscription} className="bg-destructive text-destructive-foreground">
              Cancel Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>);
}
