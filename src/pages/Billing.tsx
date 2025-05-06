import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import SubscriptionManagement from "@/components/subscription/SubscriptionManagement";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Receipt, ChevronRight } from "lucide-react";
import PricingTier from "@/components/pricing/PricingTier";
import { getProducts } from "@/utils/stripeHelpers";
import { toast } from "sonner";
export default function Billing() {
  const [activeTab, setActiveTab] = useState("subscription");
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { subscription } = useSubscription();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load pricing plans");
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);
  const handleUpgradePlan = () => {
    setActiveTab("plans");
  };
  return (
    <>
      <Helmet>
        <title>Billing & Subscription - Allora AI</title>
      </Helmet>
      <PageErrorBoundary pageName="Billing & Subscription">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Billing & Subscription
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your subscription plan and billing information
              </p>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-2 sm:mt-0 gap-1"
              onClick={() =>
                window.open("mailto:support@allora-ai.com", "_blank")
              }
            >
              Need help? Contact Support
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Tabs
            defaultValue="subscription"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="subscription">
                Current Subscription
              </TabsTrigger>
              <TabsTrigger value="plans">Available Plans</TabsTrigger>
              <TabsTrigger value="history">Billing History</TabsTrigger>
            </TabsList>

            <TabsContent value="subscription" className="space-y-4">
              <SubscriptionManagement onUpgradePlan={handleUpgradePlan} />

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Payment methods can be managed through the Stripe Customer
                    Portal.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      subscription?.isActive && handleUpgradePlan()
                    }
                  >
                    View Payment Methods
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="plans" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Available Plans</h2>
                <p className="text-muted-foreground mb-4">
                  Choose the plan that best fits your business needs
                </p>

                {isLoadingProducts ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader>
                          <div className="h-7 bg-muted rounded-md w-1/2 mb-2"></div>
                          <div className="h-4 bg-muted rounded-md w-3/4"></div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[1, 2, 3, 4].map((j) => (
                              <div
                                key={j}
                                className="h-4 bg-muted rounded-md w-full"
                              ></div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.length > 0 ? (
                      products
                        .filter((product) => product.active)
                        .map((product) => {
                          const price =
                            typeof product.default_price === "object"
                              ? product.default_price
                              : null;
                          const priceAmount = price?.unit_amount
                            ? `$${(price.unit_amount / 100).toFixed(2)}`
                            : "Custom";
                          const features = product.metadata?.features
                            ? JSON.parse(product.metadata.features)
                            : product.description?.split(", ") || [];
                          const isCurrentPlan =
                            subscription?.planId === product.id;
                          return (
                            <PricingTier
                              key={product.id}
                              title={product.name}
                              price={priceAmount}
                              description={product.description || ""}
                              features={features}
                              buttonText={
                                isCurrentPlan ? "Current Plan" : "Subscribe"
                              }
                              priceId={
                                typeof price === "object"
                                  ? price?.id
                                  : product.default_price
                              }
                              buttonVariant={
                                isCurrentPlan ? "outline" : "default"
                              }
                              currentPlan={isCurrentPlan}
                              isRecommended={
                                product.metadata?.recommended === "true"
                              }
                              popular={product.metadata?.popular === "true"}
                              isEnterprise={
                                product.metadata?.enterprise === "true"
                              }
                            />
                          );
                        })
                    ) : (
                      <div className="col-span-3 text-center py-8">
                        <p className="text-muted-foreground">
                          No pricing plans available
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Billing History
                  </CardTitle>
                  <CardDescription>
                    View your previous invoices and payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access to your complete billing history is available through
                    the Stripe Customer Portal.
                  </p>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      const { openCustomerPortal } = useSubscription();
                      await openCustomerPortal();
                    }}
                  >
                    View Billing History
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageErrorBoundary>
    </>
  );
}
