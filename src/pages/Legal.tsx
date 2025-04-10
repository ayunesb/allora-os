
import { Navigate } from 'react-router-dom';

export default function Legal() {
  // Redirect to the terms of service page
  return <Navigate to="/legal/terms-of-service" replace />;
}
