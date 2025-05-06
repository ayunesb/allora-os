var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createStripeCustomerUtil } from "./utils/stripeUtils";
export const createCustomerRecord = () => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = "someCustomerId"; // Initialize customerId with a valid value
    const customerData = {}; // Define customerData with appropriate properties
    const response = yield createStripeCustomerUtil(Object.assign({ customerId }, customerData));
    if (!response.success)
        throw new Error(response.message);
    return response.customerId;
});
