import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { store } from './app/store';
import { router } from './router';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { QueryProvider } from './app/providers/QueryProvider';
import { SocketProvider } from './app/providers/SocketProvider';

export const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <QueryProvider>
        <ThemeProvider>
          <SocketProvider>
            <RouterProvider router={router} />
          </SocketProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxStoreProvider>
  );
};

export default App;