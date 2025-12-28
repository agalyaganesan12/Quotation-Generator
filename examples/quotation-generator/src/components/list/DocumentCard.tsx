/**
 * Document card component for list views
 */

import { formatDistanceToNow } from 'date-fns';
import { Button } from '../common';
import { StatusBadge } from './StatusBadge';

interface DocumentCardProps {
  type: 'quotation' | 'invoice';
  documentNumber: string;
  clientName: string;
  amount: string;
  date: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'pending' | 'converted';
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onConvert?: () => void;
}

export function DocumentCard({
  type,
  documentNumber,
  clientName,
  amount,
  date,
  status,
  onView,
  onEdit,
  onDelete,
  onConvert,
}: DocumentCardProps) {
  const icon = type === 'quotation' ? '📋' : '📄';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#fdf8f6] flex items-center justify-center text-lg">
            {icon}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{documentNumber}</p>
            <p className="text-sm text-gray-500">{clientName}</p>
          </div>
        </div>
        {status && <StatusBadge status={status} />}
      </div>

      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-gray-500">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
        <span className="font-semibold text-gray-900">{amount}</span>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100">
        {onView && (
          <Button variant="ghost" size="sm" onClick={onView} className="flex-1">
            View
          </Button>
        )}
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit} className="flex-1">
            Edit
          </Button>
        )}
        {onConvert && type === 'quotation' && (
          <Button variant="secondary" size="sm" onClick={onConvert} className="flex-1">
            To Invoice
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" size="sm" onClick={onDelete}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
