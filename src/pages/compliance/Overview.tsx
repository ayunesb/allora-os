
import React from 'react';
import ComplianceUpdateNotification from '@/components/compliance/ComplianceUpdateNotification';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Clock, FileWarning } from 'lucide-react';

export default function Overview() {
  return (
    <div className="space-y-6">
      <ComplianceUpdateNotification className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Compliance Status
            </CardTitle>
            <CardDescription>Current regulatory compliance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GDPR</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3" /> Compliant
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CCPA</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3" /> Compliant
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">HIPAA</span>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center">
                  <Clock className="mr-1 h-3 w-3" /> Partial
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">PCI DSS</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                  <CheckCircle className="mr-1 h-3 w-3" /> Compliant
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileWarning className="mr-2 h-5 w-5 text-primary" />
              Required Actions
            </CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm">
                <p className="font-medium mb-1">Update Privacy Policy</p>
                <p className="text-muted-foreground">Due in 14 days</p>
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">Review Data Retention Settings</p>
                <p className="text-muted-foreground">Due in 30 days</p>
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">Quarterly Compliance Audit</p>
                <p className="text-muted-foreground">Due in 45 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Compliance Calendar</CardTitle>
          <CardDescription>Upcoming compliance deadlines and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 pb-4 border-b">
              <div className="bg-primary/10 text-primary font-medium p-2 rounded-md text-center min-w-16">
                <div className="text-xs">APR</div>
                <div className="text-xl">24</div>
              </div>
              <div>
                <h4 className="font-medium">GDPR Training Session</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Annual required training for all employees handling customer data.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 pb-4 border-b">
              <div className="bg-primary/10 text-primary font-medium p-2 rounded-md text-center min-w-16">
                <div className="text-xs">MAY</div>
                <div className="text-xl">15</div>
              </div>
              <div>
                <h4 className="font-medium">Privacy Policy Update Deadline</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Required update to comply with new regulations.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 text-primary font-medium p-2 rounded-md text-center min-w-16">
                <div className="text-xs">JUN</div>
                <div className="text-xl">30</div>
              </div>
              <div>
                <h4 className="font-medium">Quarterly Compliance Review</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  End of quarter review of all compliance measures.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
