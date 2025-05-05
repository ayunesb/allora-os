import { createStripeCustomerUtil } from './utils/stripeUtils';

export const createCustomerRecord = async () => {
  const customerId = 'someCustomerId'; // Initialize customerId with a valid value
  const customerData = {}; // Define customerData with appropriate properties
  const response = await createStripeCustomerUtil({ customerId, ...customerData });
  if (!response.success) throw new Error(response.message);
  return response.customerId;
};