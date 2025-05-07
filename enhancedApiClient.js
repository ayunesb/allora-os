var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
class EnhancedApiClient {
    constructor(baseURL) {
        this.client = axios.create({ baseURL });
        // Add request interceptor
        this.client.interceptors.request.use((config) => {
            var _a;
            // Add custom headers or logging here
            console.log(`Request: ${(_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${config.url}`);
            return config;
        }, (error) => {
            // Handle request errors
            console.error('Request error:', error);
            return Promise.reject(error);
        });
        // Add response interceptor
        this.client.interceptors.response.use((response) => {
            // Log or transform response here
            console.log('Response:', response.status, response.data);
            return response;
        }, (error) => {
            var _a;
            // Handle response errors
            console.error('Response error:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.status, error.message);
            return Promise.reject(error);
        });
    }
    get(url, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.get(url, config);
            return response.data;
        });
    }
    post(url, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.post(url, data, config);
            return response.data;
        });
    }
}
export default EnhancedApiClient;
export { EnhancedApiClient };
