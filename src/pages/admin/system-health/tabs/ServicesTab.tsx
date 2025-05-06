import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusIcon, getStatusColorClass } from "../utils/statusUtils";
export default function ServicesTab({ services }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Service Status</CardTitle>
        <CardDescription>
          Detailed status of all system services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="mb-4 overflow-hidden">
              <div
                className={`w-full h-1 ${
                  service.status === "healthy"
                    ? "bg-green-500"
                    : service.status === "degraded"
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColorClass(service.status)}
                  >
                    <div className="flex items-center gap-1">
                      <div className="flex-shrink-0">
                        {getStatusIcon(service.status)}
                      </div>
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Response Time
                    </div>
                    <div className="font-medium">{service.responseTime} ms</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Last Checked
                    </div>
                    <div className="font-medium">
                      {new Date(service.lastChecked).toLocaleString()}
                    </div>
                  </div>
                </div>

                {service.details && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-muted-foreground">Details</div>
                    <div className="font-medium">{service.details}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {services.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No services to display</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
