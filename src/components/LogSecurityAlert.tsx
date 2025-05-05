import React from 'react';

interface LogSecurityAlertProps {
	message: string;
	severity: 'low' | 'medium' | 'high';
}

export const LogSecurityAlert: React.FC<LogSecurityAlertProps> = ({ message, severity }) => {
	const getAlertColor = () => {
		switch (severity) {
			case 'low':
				return 'green';
			case 'medium':
				return 'orange';
			case 'high':
				return 'red';
			default:
				return 'gray';
		}
	};

	return (
		<div style={{ border: `1px solid ${getAlertColor()}`, padding: '10px', borderRadius: '5px' }}>
			<strong>Security Alert:</strong> {message}
		</div>
	);
};
