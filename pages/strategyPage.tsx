import { useState } from 'react';
import StrategyForm from '@/components/strategies/StrategyForm';

const IndexPage = () => {
  const [strategies, setStrategies] = useState([]);

  const handleAddStrategy = (newStrategy) => {
    setStrategies([...strategies, newStrategy]);
  };

  return (
    <div>
      <h1>Strategies</h1>
      <StrategyForm onAddStrategy={handleAddStrategy} />
      <ul>
        {strategies.map((strategy, index) => (
          <li key={index}>{strategy.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;