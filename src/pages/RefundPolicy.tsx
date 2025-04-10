
import { Navigate } from 'react-router-dom';

export default function RefundPolicy() {
  // Redirect to the refund policy page
  return <Navigate to="/legal/refund-policy" replace />;
}
