const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

(async () => {
  const response = await createStripeCustomerUtil({ email: 'example@example.com', name: 'Example Name' });

  if (!response?.success) {
    throw new Error(response?.message ?? 'Unknown error');
  }

  console.log({
    customerId: response.customerId,
  });
})();

async function createStripeCustomerUtil({ email, name }: { email: string; name: string }) {
    try {

        const customer = await stripe.customers.create({
            email,
            name,
        });

        return {
            success: true,
            customerId: customer.id,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to create Stripe customer',
        };
    }
}

