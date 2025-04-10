
import { Navigate } from 'react-router-dom';

export default function MessagingConsent() {
  // Redirect to the messaging consent page
  return <Navigate to="/legal/messaging-consent" replace />;
}
