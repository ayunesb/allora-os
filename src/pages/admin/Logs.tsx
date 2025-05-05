import React from 'react';
import { LogSecurityAlert } from '@/components/admin/LogSecurityAlert';

const LogsPage = ({ logs }: { logs: { id: string; level: string; message: string }[] }) => {
	return (
		<div>
			{logs.map((log) => (
				<LogSecurityAlert key={log.id} level={log.level} message={log.message} />
			))}
		</div>
	);
};

export default LogsPage;