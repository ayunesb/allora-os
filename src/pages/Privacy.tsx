
import { Navigate } from 'react-router-dom';

export default function Privacy() {
  // Redirect to the new document page using the document ID
  return <Navigate to="/legal/privacy-policy" replace />;
}
