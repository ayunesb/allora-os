import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' });

export async function createStripeCustomerUtil(params: {
  email: string;
  industry: string;
  source: string;
  customerId: string;
}) {
  return await stripe.customers.create({
    email: params.email,
    metadata: {
      industry: params.industry,
      source: params.source,
      customerId: params.customerId,
    },
  });
}