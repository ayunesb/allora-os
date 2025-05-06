const response = await createStripeCustomerUtil({
  customerId,
  ...customerData,
});

if (!response.success) {
  throw new Error(response.message ?? "Unknown error");
}
