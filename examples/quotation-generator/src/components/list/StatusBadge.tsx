/**
 * Status badge component for documents
 */

type Status = 'draft' | 'sent' | 'paid' | 'overdue' | 'pending' | 'converted';

interface StatusBadgeProps {
  status: Status;
}

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
  draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' },
  sent: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sent' },
  paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Paid' },
  overdue: { bg: 'bg-red-100', text: 'text-red-700', label: 'Overdue' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
  converted: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Converted' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.draft;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
