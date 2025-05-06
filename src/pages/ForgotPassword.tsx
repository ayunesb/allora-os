import { Navigate } from "react-router-dom";
export default function ForgotPassword() {
  // Redirect to the reset password page
  return <Navigate to="/reset-password" replace />;
}
