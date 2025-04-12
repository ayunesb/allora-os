
// Main styles entry point - imports all style modules

// Import base styles first
import './base.css';

// Import component and utility styles
import './components.css';
import './utilities.css';
import './animations.css';

// Import responsive styles - now modularized
import './responsive.css';

// Import accessibility styles
import './accessibility.css';

// Import app-specific styles
import './app.css';

// Export nothing - this file is just for importing styles
export {};
