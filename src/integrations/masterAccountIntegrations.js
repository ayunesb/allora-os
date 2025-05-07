var _a;
const response = await createStripeCustomerUtil(Object.assign({ customerId }, customerData));
if (!response.success) {
    throw new Error((_a = response.message) !== null && _a !== void 0 ? _a : "Unknown error");
}
