import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function createCheckoutSession(priceId: string) {
  try {
    const { data, error } = await supabase.functions.invoke("stripe", {
      body: { action: "create-checkout-session", priceId },
    });

    if (error) throw error;

    if (data.url) {
      window.location.href = data.url;
      return true;
    } else {
      throw new Error("No checkout URL returned");
    }
  } catch (error: any) {
    toast.error(`Failed to create checkout session: ${error.message}`);
    return false;
  }
}

export async function createCustomerPortal() {
  try {
    const { data, error } = await supabase.functions.invoke("stripe", {
      body: { action: "create-customer-portal" },
    });

    if (error) throw error;

    if (data.url) {
      window.location.href = data.url;
      return true;
    } else {
      throw new Error("No portal URL returned");
    }
  } catch (error: any) {
    toast.error(`Failed to access billing portal: ${error.message}`);
    return false;
  }
}

export async function getProducts() {
  try {
    const { data, error } = await supabase.functions.invoke("stripe", {
      body: { action: "get-products" },
    });

    if (error) throw error;

    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch products: ${error.message}`);
    return [];
  }
}
