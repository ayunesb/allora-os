
import React, { Suspense, useCallback, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import QuickAccess from "@/components/dashboard/QuickAccess";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import CeoMessage from "@/components/dashboard/CeoMessage";
import { DashboardLoadingState } from "@/components/dashboard/LoadingState";
import { ErrorRecoveryWrapper } from "@/components/dashboard/ErrorRecoveryWrapper";
import { toast } from "sonner";
import { useDashboardData } from "@/hooks/useDashboardData";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Toaster } from "sonner";
import { ExecutiveInteraction } from "@/components/dashboard/ExecutiveInteraction";
import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";
import { useProductionData } from "@/hooks/useProductionData";
import { ProductionDataAlert } from "@/components/dashboard/ProductionDataAlert";
import { useAuth } from "@/context/AuthContext";
import { useCompanyId } from "@/hooks/useCompanyId";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Dashboard() {
  const [isManuallyRefreshing, setIsManuallyRefreshing] = useState(false);
  const { screenReaderFriendly } = useAccessibility();
  const [showProductionAlert, setShowProductionAlert] = useState(true);
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();
  const companyId = useCompanyId();
  
  // Use the custom hook for dashboard data with improved error handling
  const { 
    isLoading, 
    pendingApprovals, 
    aiRecommendations, 
    riskAppetite,
    handleApproveRecommendation,
    refreshData
  } = useDashboardData();

  // Use the production data validation hook
  const {
    isValidating,
    validationResults,
    isProductionReady,
    validateProductionData
  } = useProductionData();

  // Check if we have a valid company ID
  useEffect(() => {
    if (!authLoading && user && !companyId) {
      toast.error("Your company information appears to be incomplete", {
        description: "Please complete onboarding to access the dashboard",
        duration: 5000,
      });
      navigate("/onboarding");
    }
  }, [authLoading, user, companyId, navigate]);

  // Refresh production validation when dashboard data is refreshed
  useEffect(() => {
    // Check if we're in production mode based on URL or environment
    const isProduction = 
      window.location.hostname === 'all-or-a.online' || 
      process.env.NODE_ENV === 'production';
    
    // Only show the production alert in production mode
    setShowProductionAlert(isProduction);
    
    // Validate data on initial load
    if (companyId && !isValidating && !validationResults) {
      validateProductionData();
    }
  }, [validateProductionData, isValidating, validationResults, companyId]);

  // Handle manual refresh with feedback
  const handleManualRefresh = useCallback(async () => {
    setIsManuallyRefreshing(true);
    try {
      // Refresh dashboard data
      await refreshData();
      
      // Run production data validation again
      if (showProductionAlert) {
        await validateProductionData();
      }
      
      toast.success("Dashboard refreshed successfully");
    } catch (error) {
      console.error("Error refreshing dashboard:", error);
      toast.error("Could not refresh dashboard data", {
        description: "Please check your network connection and try again"
      });
    } finally {
      setIsManuallyRefreshing(false);
    }
  }, [refreshData, validateProductionData, showProductionAlert]);
  
  // Handle recommendation approval with enhanced feedback
  const handleRecommendationApproval = async (index: number) => {
    try {
      toast.info("Processing approval...");
      // Use proper type safety when accessing recommendations
      if (aiRecommendations && aiRecommendations[index]) {
        await handleApproveRecommendation(aiRecommendations[index].id, aiRecommendations[index].type);
        toast.success("Recommendation approved successfully", {
          description: "The approved recommendation will be implemented shortly"
        });
      } else {
        throw new Error("Recommendation not found");
      }
    } catch (error) {
      console.error("Error approving recommendation:", error);
      toast.error("Failed to approve recommendation", {
        description: "Please try again or contact support if the problem persists"
      });
    }
  };

  // Show complete loading state when auth is still loading
  if (authLoading || (user && !companyId)) {
    return <DashboardLoadingState aria-label="Loading dashboard data" />;
  }

  // Handle case where user is not authenticated or doesn't have a company
  if (!user) {
    return (
      <Card className="mx-auto max-w-md mt-12">
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>
            Please log in to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/login")} className="w-full">
            Log In
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Handle the case where the user needs to complete onboarding
  if (!companyId) {
    return (
      <Card className="mx-auto max-w-md mt-12">
        <CardHeader>
          <CardTitle>Complete Onboarding</CardTitle>
          <CardDescription>
            Please set up your company to access the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/onboarding")} className="w-full">
            Complete Onboarding
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <DashboardLoadingState aria-label="Loading dashboard data" />;
  }

  // Get the number of pending approvals, handling case where it's an array
  const pendingApprovalsCount = 
    typeof pendingApprovals === 'number' 
      ? pendingApprovals 
      : (Array.isArray(pendingApprovals) ? pendingApprovals.length : 0);

  return (
    <>
      <Toaster position="top-right" closeButton richColors />
      
      <div 
        className="container mx-auto px-4 py-6 space-y-6"
        role={screenReaderFriendly ? "main" : undefined}
        aria-label={screenReaderFriendly ? "Dashboard" : undefined}
      >
        {/* Production Data Validation Alert */}
        <ProductionDataAlert 
          isValidating={isValidating}
          validationResults={validationResults}
          onRevalidate={validateProductionData}
          isVisible={showProductionAlert}
        />
        
        <DashboardHeader pendingApprovals={pendingApprovalsCount} />
        
        {/* Refresh button for manual data refresh */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh}
            disabled={isManuallyRefreshing}
            className="text-xs flex items-center gap-1"
            aria-label="Refresh dashboard data"
          >
            <RefreshCw className={`h-3 w-3 ${isManuallyRefreshing ? 'animate-spin' : ''}`} 
              aria-hidden="true"
            />
            {isManuallyRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
        
        {/* Executive Interaction Section */}
        <ErrorRecoveryWrapper
          errorTitle="Executive Interaction Error"
          errorMessage="We couldn't load the executive interaction component. Please try again."
        >
          <ExecutiveInteraction riskAppetite={riskAppetite || "medium"} />
        </ErrorRecoveryWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="md:col-span-2 space-y-6"
            role={screenReaderFriendly ? "region" : undefined}
            aria-label={screenReaderFriendly ? "Main dashboard content" : undefined}
          >
            {/* Wrap each component in an ErrorRecoveryWrapper for better error handling */}
            <ErrorRecoveryWrapper 
              errorTitle="CEO Message Error" 
              errorMessage="We couldn't load the CEO message. Please try again."
            >
              <CeoMessage riskAppetite={riskAppetite || "medium"} />
            </ErrorRecoveryWrapper>
            
            <ErrorRecoveryWrapper 
              errorTitle="Analytics Error" 
              errorMessage="We couldn't load the analytics data. Please try again."
            >
              <DashboardAnalytics />
            </ErrorRecoveryWrapper>
            
            <ErrorRecoveryWrapper 
              errorTitle="AI Recommendations Error" 
              errorMessage="We couldn't load AI recommendations. Please try again."
            >
              <AiRecommendations 
                recommendations={aiRecommendations || []} 
                onApprove={handleRecommendationApproval}
              />
            </ErrorRecoveryWrapper>
          </div>
          <div
            role={screenReaderFriendly ? "complementary" : undefined}
            aria-label={screenReaderFriendly ? "Quick access tools" : undefined}
          >
            <ErrorRecoveryWrapper 
              errorTitle="Quick Access Error" 
              errorMessage="Quick access links couldn't be loaded. Please try again."
            >
              <QuickAccess />
            </ErrorRecoveryWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
