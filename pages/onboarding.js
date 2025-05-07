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
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import OnboardingLayout from "@/components/layouts/OnboardingLayout";
import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export default function Onboarding() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            yield trpc.auth.register.mutateAsync(data);
            toast({
                title: "Success",
                description: "You have successfully registered!",
            });
            router.push("/dashboard");
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message,
            });
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsx(OnboardingLayout, { children: _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), children: [_jsx(FormField, { name: "email", control: form.control, children: _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", placeholder: "Email" }) }), _jsx(FormMessage, {})] }) }), _jsx(FormField, { name: "password", control: form.control, children: _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", placeholder: "Password" }) }), _jsx(FormMessage, {})] }) }), _jsx(Button, { type: "submit", isLoading: isLoading, children: "Register" })] }) })) }));
}
