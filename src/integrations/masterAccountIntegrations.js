var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var _a;
var response = await createStripeCustomerUtil(
  __assign({ customerId: customerId }, customerData),
);
if (!response.success) {
  throw new Error(
    (_a = response.message) !== null && _a !== void 0 ? _a : "Unknown error",
  );
}
