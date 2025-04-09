
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function PolicyDocuments() {
  return (
    <ul className="space-y-4">
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Privacy Policy</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/privacy">View</Link>
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
            <Link to="/legal">View</Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Data Processing Agreement</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/legal/data-processing">View</Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <li className="flex justify-between items-center p-3 border rounded-md">
        <span>Breach Notification Policy</span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/legal/breach-notification">View</Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </li>
    </ul>
  );
}
