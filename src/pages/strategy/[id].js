import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/utils/supabaseClient';
export default function StrategyDetails() {
    const { id: strategyId } = useParams();
    const [versions, setVersions] = useState([]);
    useEffect(() => {
        async function fetchVersions() {
            const { data, error } = await supabase
                .from('strategy_versions')
                .select('*')
                .eq('strategy_id', strategyId)
                .order('version', { ascending: true });
            if (!error) {
                setVersions(data || []);
            }
        }
        fetchVersions();
    }, [strategyId]);
    return (<div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Strategy Versions</h1>
      <div>
        {versions.map((version, index) => (<div key={version.id} className="mb-4 p-4 border rounded">
            <h2 className="text-lg font-semibold">Version {version.version}</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(version.changes, null, 2)}
            </pre>
          </div>))}
      </div>
    </div>);
}
