import { Navigate } from 'react-router-dom';
export default function Privacy() {
    // Redirect to the privacy policy page
    return <Navigate to="/legal/privacy-policy" replace/>;
}
