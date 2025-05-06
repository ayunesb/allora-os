import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StrategyImplementationTools from "@/components/strategy-implementation/StrategyImplementationTools";
export default function StrategyImplementationPage() {
  const { strategyId } = useParams();
  const [strategyTitle, setStrategyTitle] = useState("Current Strategy");
  useEffect(() => {
    // Fetch strategy details and update the title
    if (strategyId) {
      // Replace this with your actual API call to fetch strategy details
      // Example:
      // fetchStrategyDetails(strategyId)
      //   .then(data => setStrategyTitle(data.title))
      //   .catch(error => console.error("Error fetching strategy details:", error));
    }
  }, [strategyId]);
  // In the return statement, update the StrategyImplementationTools props
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Strategy Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Manage the implementation of your growth strategy. Track tasks,
            milestones, and metrics to ensure successful execution.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          {/* Implementation Tools - fix the props here */}
          <StrategyImplementationTools strategyId={strategyId} />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Support Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
