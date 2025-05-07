var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export function useWebhooks() {
    const [filter, setFilter] = useState(undefined);
    const queryClient = useQueryClient();
    // Fetch webhooks
    const { data: webhooks, isLoading, error, } = useQuery({
        queryKey: ["webhooks"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            let query = supabase.from("webhooks").select("*");
            if (filter === null || filter === void 0 ? void 0 : filter.type) {
                query = query.eq("type", filter.type);
            }
            if (filter === null || filter === void 0 ? void 0 : filter.url) {
                query = query.ilike("url", `%${filter.url}%`);
            }
            if ((filter === null || filter === void 0 ? void 0 : filter.active) !== undefined) {
                query = query.eq("active", filter.active);
            }
            const { data, error } = yield query;
            if (error)
                throw error;
            return data;
        }),
    });
    // Clear filter and refetch
    const clearFilterAndRefetch = useCallback(() => {
        setFilter(undefined);
        queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    }, [queryClient]);
    // Track event
    const trackEvent = useCallback((eventType) => {
        queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    }, [queryClient]);
    // Create webhook
    const createWebhookMutation = useMutation({
        mutationFn: (webhook) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("webhooks")
                .insert([webhook])
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            toast.success("Webhook created successfully");
            queryClient.invalidateQueries({ queryKey: ["webhooks"] });
        },
        onError: (err) => {
            toast.error(`Failed to create webhook: ${err.message}`);
        },
    });
    const createWebhook = (data) => __awaiter(this, void 0, void 0, function* () {
        return createWebhookMutation.mutateAsync(data);
    });
    // Update webhook
    const updateWebhookMutation = useMutation({
        mutationFn: (webhook) => __awaiter(this, void 0, void 0, function* () {
            const { id } = webhook, updates = __rest(webhook, ["id"]);
            const { data, error } = yield supabase
                .from("webhooks")
                .update(updates)
                .eq("id", id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            toast.success("Webhook updated successfully");
            queryClient.invalidateQueries({ queryKey: ["webhooks"] });
        },
        onError: (err) => {
            toast.error(`Failed to update webhook: ${err.message}`);
        },
    });
    const updateWebhook = (webhook) => __awaiter(this, void 0, void 0, function* () {
        return updateWebhookMutation.mutateAsync(webhook);
    });
    // Delete webhook
    const deleteWebhookMutation = useMutation({
        mutationFn: (id) => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("webhooks")
                .delete()
                .eq("id", id)
                .select()
                .single();
            if (error)
                throw error;
            return data;
        }),
        onSuccess: () => {
            toast.success("Webhook deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["webhooks"] });
        },
        onError: (err) => {
            toast.error(`Failed to delete webhook: ${err.message}`);
        },
    });
    const deleteWebhook = (id) => __awaiter(this, void 0, void 0, function* () {
        return deleteWebhookMutation.mutateAsync(id);
    });
    return {
        webhooks,
        isLoading,
        error,
        filter,
        setFilter,
        clearFilterAndRefetch,
        trackEvent,
        createWebhook,
        updateWebhook,
        deleteWebhook,
        isCreating: createWebhookMutation.isPending,
        isUpdating: updateWebhookMutation.isPending,
        isDeleting: deleteWebhookMutation.isPending,
    };
}
