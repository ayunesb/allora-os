
import { Navigate } from 'react-router-dom';

export default function Compliance() {
  // Redirect to the compliance page
  return <Navigate to="/legal/compliance" replace />;
}
