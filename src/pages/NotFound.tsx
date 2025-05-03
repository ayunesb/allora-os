import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";

export default function NotFound() {
  return (
    <div className="text-center text-2xl text-red-500 mt-20">
      404 — Page not found.
    </div>
  );
}
