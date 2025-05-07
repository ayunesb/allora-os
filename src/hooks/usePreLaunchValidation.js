var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
const INITIAL_STATE = {
    ready: false,
    issues: [],
    passedChecks: [],
};
export const usePreLaunchValidation = () => {
    const [validationResult, setValidationResult] = useState(INITIAL_STATE);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState(null);
    const runValidation = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsValidating(true);
        setError(null);
        try {
            // Simulate validation process
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            const issues = [];
            const passedChecks = [];
            // Example validation checks
            // In a real app, these would be actual checks against your system
            // Add passed checks
            passedChecks.push({
                type: "database",
                message: "Database connection successful",
                valid: true,
            });
            // Example of an issue
            issues.push({
                type: "webhook",
                message: "Zapier webhook not configured",
                valid: false,
                severity: "warning",
            });
            setValidationResult({
                ready: issues.length === 0,
                issues,
                passedChecks,
            });
        }
        catch (error) {
            console.error("Validation failed:", error);
            setError((error === null || error === void 0 ? void 0 : error.message) || "Validation failed");
        }
        finally {
            setIsValidating(false);
        }
    });
    // Initial validation
    useEffect(() => {
        runValidation();
    }, []);
    return {
        isValidating,
        validationResult,
        error,
        runValidation,
    };
};
