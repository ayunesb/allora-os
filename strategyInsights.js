var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class StrategyInsights {
    constructor(strategy) {
        this.strategy = strategy;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const riskLevel = (_d = (_b = (_a = this.strategy) === null || _a === void 0 ? void 0 : _a.riskLevel) !== null && _b !== void 0 ? _b : (_c = this.strategy) === null || _c === void 0 ? void 0 : _c.risk_level) !== null && _d !== void 0 ? _d : "Medium";
                const result = yield this.strategy.run();
                return { success: true, data: result, riskLevel };
            }
            catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : "Unknown error",
                };
            }
        });
    }
}
