
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PolicyDocuments() {
  return (
    <ul className="space-y-4">
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Privacy Policy</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/privacy">View</a>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Terms of Service</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/legal">View</a>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Data Processing Agreement</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">View</Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Breach Notification Policy</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">View</Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
    </ul>
  );
}
