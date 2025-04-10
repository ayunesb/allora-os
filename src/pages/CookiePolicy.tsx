
import { Navigate } from 'react-router-dom';

export default function CookiePolicy() {
  // Redirect to the document page using the document ID
  return <Navigate to="/legal/cookies" replace />;
}
