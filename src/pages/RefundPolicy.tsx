
import { Navigate } from 'react-router-dom';

export default function RefundPolicy() {
  // Redirect to the document page using the document ID
  return <Navigate to="/legal/refund-policy" replace />;
}
