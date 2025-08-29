import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Componentes de layout
import MainLayout from './components/layout/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Páginas
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import SalesList from './pages/sales/SalesList';
import SalesForm from './pages/sales/SalesForm';
import AccountsList from './pages/accounts/AccountsList';
import AccountsForm from './pages/accounts/AccountsForm';
import ProductsList from './pages/products/ProductsList';
import ProductsForm from './pages/products/ProductsForm';
import AppointmentsList from './pages/appointments/AppointmentsList';
import AppointmentsForm from './pages/appointments/AppointmentsForm';
import TravelsList from './pages/travels/TravelsList';
import TravelsForm from './pages/travels/TravelsForm';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';

import './App.css';

// Componente para proteger rotas
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Componente para redirecionar usuários autenticados
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// Componente principal das rotas
function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />

      {/* Rotas protegidas */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Vendas */}
        <Route path="sales" element={<SalesList />} />
        <Route path="sales/new" element={<SalesForm />} />
        <Route path="sales/:id/edit" element={<SalesForm />} />

        {/* Contas */}
        <Route path="accounts" element={<AccountsList />} />
        <Route path="accounts/new" element={<AccountsForm />} />
        <Route path="accounts/:id/edit" element={<AccountsForm />} />

        {/* Produtos */}
        <Route path="products" element={<ProductsList />} />
        <Route path="products/new" element={<ProductsForm />} />
        <Route path="products/:id/edit" element={<ProductsForm />} />

        {/* Agendamentos */}
        <Route path="appointments" element={<AppointmentsList />} />
        <Route path="appointments/new" element={<AppointmentsForm />} />
        <Route path="appointments/:id/edit" element={<AppointmentsForm />} />

        {/* Viagens */}
        <Route path="travels" element={<TravelsList />} />
        <Route path="travels/new" element={<TravelsForm />} />
        <Route path="travels/:id/edit" element={<TravelsForm />} />

        {/* Relatórios */}
        <Route path="reports" element={<Reports />} />

        {/* Configurações */}
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Rota 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

// Componente principal da aplicação
function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <AppRoutes />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

