import { useState, useEffect } from 'react';
import { analyzeShopifyStore, implementOptimization } from '@/utils/shopifyOptimization';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, RefreshCw, Check, AlertTriangle, Zap } from 'lucide-react';
export default function ShopifyOptimizationDashboard({ storeId }) {
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [implementing, setImplementing] = useState(null);
    useEffect(() => {
        loadReport();
    }, [storeId]);
    const loadReport = async () => {
        setIsLoading(true);
        const reportData = await analyzeShopifyStore(storeId);
        if (reportData) {
            setReport(reportData);
        }
        setIsLoading(false);
    };
    const handleImplement = async (recommendationId) => {
        setImplementing(recommendationId);
        const success = await implementOptimization(storeId, recommendationId);
        if (success && report) {
            // Update the local state
            const updatedRecommendations = report.recommendations.map(rec => {
                if (rec.id === recommendationId) {
                    return { ...rec, implemented: true };
                }
                return rec;
            });
            setReport({
                ...report,
                recommendations: updatedRecommendations
            });
        }
        setImplementing(null);
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-amber-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };
    const getEffortColor = (effort) => {
        switch (effort) {
            case 'high': return 'text-red-500';
            case 'medium': return 'text-amber-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };
    const getCategoryBadge = (category) => {
        switch (category) {
            case 'seo':
                return <Badge variant="outline" className="bg-blue-50">SEO</Badge>;
            case 'product':
                return <Badge variant="outline" className="bg-green-50">Product</Badge>;
            case 'checkout':
                return <Badge variant="outline" className="bg-purple-50">Checkout</Badge>;
            case 'design':
                return <Badge variant="outline" className="bg-indigo-50">Design</Badge>;
            case 'performance':
                return <Badge variant="outline" className="bg-amber-50">Performance</Badge>;
            case 'marketing':
                return <Badge variant="outline" className="bg-pink-50">Marketing</Badge>;
            default:
                return <Badge variant="outline">{category}</Badge>;
        }
    };
    if (isLoading) {
        return (<div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shopify Store Optimization</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
          <Card className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>);
    }
    if (!report) {
        return (<div className="p-6">
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4"/>
          <h3 className="text-xl font-semibold mb-2">Store Analysis Failed</h3>
          <p className="text-gray-500 mb-6">We couldn't analyze your Shopify store. Please check your connection.</p>
          <Button onClick={loadReport}>
            <RefreshCw className="h-4 w-4 mr-2"/>
            Try Again
          </Button>
        </div>
      </div>);
    }
    const implementedCount = report.recommendations.filter(rec => rec.implemented).length;
    const totalCount = report.recommendations.length;
    const percentageComplete = totalCount > 0 ? (implementedCount / totalCount) * 100 : 0;
    // Group recommendations by category
    const categorizedRecommendations = {};
    report.recommendations.forEach(rec => {
        if (!categorizedRecommendations[rec.category]) {
            categorizedRecommendations[rec.category] = [];
        }
        categorizedRecommendations[rec.category].push(rec);
    });
    return (<div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Shopify Store Optimization</h2>
          <p className="text-gray-500">
            Last analyzed: {new Date(report.lastUpdated).toLocaleString()}
          </p>
        </div>
        <Button onClick={loadReport} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2"/>
          Refresh Analysis
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Store Health Score</CardDescription>
            <CardTitle className="text-3xl">{report.score}/100</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={report.score} className="h-2 mt-2"/>
            <p className="text-sm mt-2">
              {report.score >= 80 ? 'Excellent' : report.score >= 60 ? 'Good' : report.score >= 40 ? 'Needs Improvement' : 'Critical Issues'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Optimizations Implemented</CardDescription>
            <CardTitle className="text-3xl">{implementedCount}/{totalCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={percentageComplete} className="h-2 mt-2"/>
            <p className="text-sm mt-2">
              {percentageComplete}% of recommendations completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>High Impact Issues</CardDescription>
            <CardTitle className="text-3xl">
              {report.recommendations.filter(rec => rec.impact === 'high' && !rec.implemented).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2"/>
              <p className="text-sm">
                {report.recommendations.filter(rec => rec.impact === 'high' && !rec.implemented).length > 0
            ? 'Critical issues need attention'
            : 'No critical issues found'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Recommendations</TabsTrigger>
          {Object.keys(categorizedRecommendations).map(category => (<TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4">
            {report.recommendations.map(recommendation => (<Card key={recommendation.id} className={recommendation.implemented ? 'border-green-200 bg-green-50' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        {getCategoryBadge(recommendation.category)}
                        <span className={`ml-2 text-xs font-medium ${getImpactColor(recommendation.impact)}`}>
                          {recommendation.impact.toUpperCase()} IMPACT
                        </span>
                        <span className={`ml-2 text-xs font-medium ${getEffortColor(recommendation.effort)}`}>
                          {recommendation.effort.toUpperCase()} EFFORT
                        </span>
                      </div>
                      <CardTitle className="text-lg flex items-center">
                        {recommendation.implemented && <Check className="h-5 w-5 text-green-500 mr-2"/>}
                        {recommendation.title}
                      </CardTitle>
                    </div>
                    {recommendation.automated && (<Badge variant="outline" className="bg-blue-50">
                        <Zap className="h-3 w-3 mr-1"/>
                        Automated
                      </Badge>)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{recommendation.description}</p>
                </CardContent>
                <CardFooter>
                  {recommendation.implemented ? (<Button variant="ghost" className="text-green-600" disabled>
                      <Check className="h-4 w-4 mr-2"/>
                      Implemented
                    </Button>) : (<Button onClick={() => handleImplement(recommendation.id)} disabled={implementing === recommendation.id}>
                      {implementing === recommendation.id ? (<>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                          Implementing...
                        </>) : (<>
                          <ArrowUpRight className="h-4 w-4 mr-2"/>
                          Implement {recommendation.automated ? 'Automatically' : 'Now'}
                        </>)}
                    </Button>)}
                </CardFooter>
              </Card>))}
          </div>
        </TabsContent>

        {Object.entries(categorizedRecommendations).map(([category, recommendations]) => (<TabsContent key={category} value={category} className="mt-0">
            <div className="grid gap-4">
              {recommendations.map(recommendation => (<Card key={recommendation.id} className={recommendation.implemented ? 'border-green-200 bg-green-50' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          {getCategoryBadge(recommendation.category)}
                          <span className={`ml-2 text-xs font-medium ${getImpactColor(recommendation.impact)}`}>
                            {recommendation.impact.toUpperCase()} IMPACT
                          </span>
                          <span className={`ml-2 text-xs font-medium ${getEffortColor(recommendation.effort)}`}>
                            {recommendation.effort.toUpperCase()} EFFORT
                          </span>
                        </div>
                        <CardTitle className="text-lg flex items-center">
                          {recommendation.implemented && <Check className="h-5 w-5 text-green-500 mr-2"/>}
                          {recommendation.title}
                        </CardTitle>
                      </div>
                      {recommendation.automated && (<Badge variant="outline" className="bg-blue-50">
                          <Zap className="h-3 w-3 mr-1"/>
                          Automated
                        </Badge>)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{recommendation.description}</p>
                  </CardContent>
                  <CardFooter>
                    {recommendation.implemented ? (<Button variant="ghost" className="text-green-600" disabled>
                        <Check className="h-4 w-4 mr-2"/>
                        Implemented
                      </Button>) : (<Button onClick={() => handleImplement(recommendation.id)} disabled={implementing === recommendation.id}>
                        {implementing === recommendation.id ? (<>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
                            Implementing...
                          </>) : (<>
                            <ArrowUpRight className="h-4 w-4 mr-2"/>
                            Implement {recommendation.automated ? 'Automatically' : 'Now'}
                          </>)}
                      </Button>)}
                  </CardFooter>
                </Card>))}
            </div>
          </TabsContent>))}
      </Tabs>
    </div>);
}
