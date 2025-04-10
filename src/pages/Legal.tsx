
import { Navigate } from 'react-router-dom';

export default function Legal() {
  // Redirect to the new document page using the document ID
  return <Navigate to="/legal/terms-of-service" replace />;
}
