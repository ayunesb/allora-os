import { Navigate } from "react-router-dom";
export default function CookiePolicy() {
  // Redirect to the cookies page
  return <Navigate to="/legal/cookies" replace />;
}
