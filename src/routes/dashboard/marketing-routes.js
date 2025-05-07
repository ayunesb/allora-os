var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const marketingRoutes = [
    {
        path: "campaigns",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Campaigns } = yield import("@/pages/dashboard/Campaigns");
                return { Component: Campaigns };
            });
        },
    },
    {
        path: "campaigns/new",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: CampaignCreate } = yield import("@/pages/dashboard/CampaignCreate");
                return { Component: CampaignCreate };
            });
        },
    },
    {
        path: "campaigns/:campaignId",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: CampaignDetail } = yield import("@/pages/dashboard/CampaignDetail");
                return { Component: CampaignDetail };
            });
        },
    },
    {
        path: "campaigns/payment-success",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: CampaignPaymentSuccess } = yield import("@/pages/dashboard/CampaignPaymentSuccess");
                return { Component: CampaignPaymentSuccess };
            });
        },
    },
    {
        path: "leads",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Leads } = yield import("@/pages/dashboard/Leads");
                return { Component: Leads };
            });
        },
    },
    {
        path: "leads/:leadId",
        lazy() {
            return __awaiter(this, void 0, void 0, function* () {
                const { default: Leads } = yield import("@/pages/dashboard/Leads");
                return { Component: Leads };
            });
        },
    },
];
