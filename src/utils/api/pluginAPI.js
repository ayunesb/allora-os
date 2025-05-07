var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchApi } from "./apiClient";
/**
 * Fetches plugin usage logs for admin review
 */
export const fetchPluginLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetchApi("/api/admin/plugin-logs");
    return response;
});
/**
 * Records a new plugin usage event with an associated value
 */
export const recordPluginEvent = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = JSON.stringify(params);
    return yield fetchApi("/api/plugin-event", JSON.stringify({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
    }));
});
/**
 * Fetches aggregated plugin impact data showing ROI per tenant
 */
export const fetchPluginImpact = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetchApi("/api/plugin/impact");
    return response;
});
