/**
 * Supabase API wrapper
 * Provides helper functions to adapt Supabase queries to work with our apiClient
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Wraps a Supabase query function to make it compatible with apiRequest
 * @param queryFunction The Supabase query function to wrap
 * @returns A function that returns a Promise with a Response-like structure
 */
export const wrapSupabaseQuery = (queryFunction) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield queryFunction();
            // Ensure there's always an error property, even if it's null
            const responseData = {
                data: result.data,
                error: result.error || null,
            };
            // Convert Supabase response to something Response-like
            return {
                ok: !result.error,
                status: result.error ? 400 : 200,
                statusText: result.error ? result.error.message : "OK",
                json: () => __awaiter(void 0, void 0, void 0, function* () { return responseData; }),
                headers: new Headers(),
                redirected: false,
                type: "basic",
                url: "",
                clone: function () {
                    return this;
                },
                body: null,
                bodyUsed: false,
                arrayBuffer: () => __awaiter(void 0, void 0, void 0, function* () { return new ArrayBuffer(0); }),
                blob: () => __awaiter(void 0, void 0, void 0, function* () { return new Blob(); }),
                formData: () => __awaiter(void 0, void 0, void 0, function* () { return new FormData(); }),
                text: () => __awaiter(void 0, void 0, void 0, function* () { return JSON.stringify(responseData); }),
            };
        }
        catch (error) {
            // Handle any exceptions thrown during the query execution
            const errorMessage = error instanceof Error
                ? error.message
                : "Unknown error executing query";
            return {
                ok: false,
                status: 500,
                statusText: errorMessage,
                json: () => __awaiter(void 0, void 0, void 0, function* () { return ({ data: null, error: { message: errorMessage } }); }),
                headers: new Headers(),
                redirected: false,
                type: "basic",
                url: "",
                clone: function () {
                    return this;
                },
                body: null,
                bodyUsed: false,
                arrayBuffer: () => __awaiter(void 0, void 0, void 0, function* () { return new ArrayBuffer(0); }),
                blob: () => __awaiter(void 0, void 0, void 0, function* () { return new Blob(); }),
                formData: () => __awaiter(void 0, void 0, void 0, function* () { return new FormData(); }),
                text: () => __awaiter(void 0, void 0, void 0, function* () { return JSON.stringify({ data: null, error: { message: errorMessage } }); }),
            };
        }
    });
};
