var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function enhancedApiClient(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, options = {}) {
        try {
            const res = yield fetch(url, {
                method: options.method || "GET",
                headers: Object.assign({ "Content-Type": "application/json" }, (options.headers || {})),
                body: options.body ? JSON.stringify(options.body) : undefined,
            });
            const data = yield res.json();
            if (!res.ok) {
                return {
                    success: false,
                    error: (data === null || data === void 0 ? void 0 : data.error) || res.statusText,
                    status: res.status,
                };
            }
            return {
                success: true,
                data,
                status: res.status,
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.message || "Unknown error",
                status: 500,
            };
        }
    });
}
