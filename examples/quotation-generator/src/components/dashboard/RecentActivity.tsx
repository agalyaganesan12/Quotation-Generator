/**
 * Recent activity component for dashboard
 */

import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'quotation' | 'invoice';
  title: string;
  clientName: string;
  amount: string;
  date: string;
  status?: string;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

const typeIcons = {
  quotation: '📋',
  invoice: '📄',
};

const typeLabels = {
  quotation: 'Quotation',
  invoice: 'Invoice',
};

export function RecentActivity({ items }: RecentActivityProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">No recent activity</p>
          <p className="text-sm text-gray-400 mt-1">Create your first quotation or invoice to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[#fdf8f6] flex items-center justify-center text-lg">
              {typeIcons[item.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-500">
                {typeLabels[item.type]} • {item.clientName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{item.amount}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
