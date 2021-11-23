import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { CartProvider } from './cart';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <ToastProvider>{children}</ToastProvider>
    </CartProvider>
  </AuthProvider>
);

export default AppProvider;
