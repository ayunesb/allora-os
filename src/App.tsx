import React from 'react';
import { AppRoutes } from './routes';
import { HelpProvider } from './context/HelpContext';
import { HelpModal } from './components/help/HelpModal';

function App() {
  return (
    <HelpProvider>
      <AppRoutes />
      <HelpModal />
    </HelpProvider>
  );
}

export default App;
