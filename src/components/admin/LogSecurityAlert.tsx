import React from 'react';

interface LogSecurityAlertProps {
	alertMessage: string;
	timestamp: string;
}

const LogSecurityAlert: React.FC<LogSecurityAlertProps> = ({ alertMessage, timestamp }) => {
	return (
		<div className="security-alert">
			<p><strong>Alert:</strong> {alertMessage}</p>
			<p><small>{new Date(timestamp).toLocaleString()}</small></p>
		</div>
	);
};

// Auto-registration block (example)
export const registerLogSecurityAlert = () => {
	// Logic to register this component in admin/system views
	console.log('LogSecurityAlert component registered.');
};

export default LogSecurityAlert;
