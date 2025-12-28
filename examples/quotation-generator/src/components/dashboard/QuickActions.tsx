/**
 * Quick action buttons for dashboard
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '../common';

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => navigate('/quotations/new')}
          className="flex items-center justify-center gap-2"
        >
          <span>📋</span>
          <span>New Quotation</span>
        </Button>
        <Button
          onClick={() => navigate('/invoices/new')}
          className="flex items-center justify-center gap-2"
        >
          <span>📄</span>
          <span>New Invoice</span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/quotations')}
          className="flex items-center justify-center gap-2"
        >
          <span>📁</span>
          <span>View Quotations</span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/invoices')}
          className="flex items-center justify-center gap-2"
        >
          <span>📂</span>
          <span>View Invoices</span>
        </Button>
      </div>
    </div>
  );
}
