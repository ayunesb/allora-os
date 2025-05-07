var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(() => __awaiter(this, void 0, void 0, function* () {
    var _a;
    const response = yield createStripeCustomerUtil({
        email: "example@example.com",
        name: "Example Name",
    });
    if (!(response === null || response === void 0 ? void 0 : response.success)) {
        throw new Error((_a = response === null || response === void 0 ? void 0 : response.message) !== null && _a !== void 0 ? _a : "Unknown error");
    }
    console.log({
        customerId: response.customerId,
    });
}))();
function createStripeCustomerUtil(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, name, }) {
        try {
            const customer = yield stripe.customers.create({
                email,
                name,
            });
            return {
                success: true,
                customerId: customer.id,
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message || "Failed to create Stripe customer",
            };
        }
    });
}
