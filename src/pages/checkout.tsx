
import { useState } from 'react';
import { createCreditPurchaseCheckout } from '@/utils/stripePayments';
import { useUser } from '@/hooks/useUser';
import { CreditsCheckout } from '@/components/payments/CreditsCheckout';
import { PageErrorBoundary } from '@/components/errorHandling/PageErrorBoundary';
import { Helmet } from 'react-helmet-async';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  return (
    <>
      <Helmet>
        <title>Purchase Credits - Allora AI</title>
      </Helmet>
      <PageErrorBoundary pageName="Purchase Credits">
        <CreditsCheckout />
      </PageErrorBoundary>
    </>
  );
}
