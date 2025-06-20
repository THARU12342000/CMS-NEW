import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './components/Auth/AuthContext';

// Auth components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Product components
import ProductList from './components/Products/ProductList';
import AddProduct from './components/Products/AddProduct';

// Order components
import OrderList from './components/Orders/OrderList';
import PlaceOrder from './components/Orders/PlaceOrder';

// Agreement components
import ConsentForm from './components/Agreements/ConsentForm';
import AgreementList from './components/Agreements/AgreementList';

// Privacy components
import PrivacySettings from './components/Privacy/PrivacySettings';
import PrivacyList from './components/Privacy/PrivacyList';

// Admin components
import Dashboard from './components/Admin/Dashboard';
import ManageUsers from './components/Admin/ManageUsers';
import ManageProducts from './components/Admin/ManageProducts';
import ManageOrders from './components/Admin/ManageOrders';
import ViewAgreements from './components/Admin/ViewAgreements';
import ViewPrivacy from './components/Admin/ViewPrivacy';
import ViewAuditLogs from './components/Admin/ViewAuditLogs';

const App = () => {
  const { user } = useContext(AuthContext);

  const RequireAuth = ({ children, adminOnly = false }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (adminOnly && !user.isAdmin) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User routes */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <ProductList />
          </RequireAuth>
        }
      />
      <Route
        path="/place-order"
        element={
          <RequireAuth>
            <PlaceOrder />
          </RequireAuth>
        }
      />
      <Route
        path="/orders"
        element={
          <RequireAuth>
            <OrderList />
          </RequireAuth>
        }
      />
      <Route
        path="/consent"
        element={
          <RequireAuth>
            <ConsentForm />
          </RequireAuth>
        }
      />
      <Route
        path="/agreements"
        element={
          <RequireAuth>
            <AgreementList />
          </RequireAuth>
        }
      />
      <Route
        path="/privacy-settings"
        element={
          <RequireAuth>
            <PrivacySettings />
          </RequireAuth>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <RequireAuth adminOnly={true}>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth adminOnly={true}>
            <ManageUsers />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/products"
        element={
          <RequireAuth adminOnly={true}>
            <ManageProducts />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireAuth adminOnly={true}>
            <ManageOrders />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/agreements"
        element={
          <RequireAuth adminOnly={true}>
            <ViewAgreements />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/privacy"
        element={
          <RequireAuth adminOnly={true}>
            <ViewPrivacy />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/audit-logs"
        element={
          <RequireAuth adminOnly={true}>
            <ViewAuditLogs />
          </RequireAuth>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
