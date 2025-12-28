/**
 * Router configuration
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth';
import { DashboardLayout } from '../components/layout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { QuotationList } from '../pages/QuotationList';
import { QuotationForm } from '../pages/QuotationForm';
import { InvoiceList } from '../pages/InvoiceList';
import { InvoiceForm } from '../pages/InvoiceForm';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/quotations',
            element: <QuotationList />,
          },
          {
            path: '/quotations/new',
            element: <QuotationForm />,
          },
          {
            path: '/invoices',
            element: <InvoiceList />,
          },
          {
            path: '/invoices/new',
            element: <InvoiceForm />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
