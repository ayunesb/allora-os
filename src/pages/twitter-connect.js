var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import axios from "axios";
const TwitterConnect = () => {
    const [session, loading] = useSession();
    const router = useRouter();
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (session) {
            axios.get("/api/user").then((response) => {
                setUser(response.data);
            });
        }
    }, [session]);
    const handleConnect = () => __awaiter(void 0, void 0, void 0, function* () {
        const params = { key: "value" }; // Replace with actual expected structure
        const params = {
            tenant_id: user === null || user === void 0 ? void 0 : user.tenant_id,
            twitterToken: "...",
            // etc.
        };
        try {
            const response = yield axios.post("/api/twitter/connect", params);
            if (response.status === 200) {
                router.push("/dashboard");
            }
        }
        catch (error) {
            console.error("Error connecting to Twitter:", error);
        }
    });
    if (loading)
        return _jsx("p", { children: "Loading..." });
    return (_jsxs("div", { children: [_jsx("h1", { children: "Connect to Twitter" }), session ? (_jsx("button", { onClick: handleConnect, children: "Connect" })) : (_jsx("p", { children: "Please sign in to connect to Twitter." }))] }));
};
export default TwitterConnect;
