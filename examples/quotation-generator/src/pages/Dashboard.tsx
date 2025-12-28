/**
 * Dashboard page component
 */

import { useEffect, useState } from 'react';
import { StatCard, QuickActions, RecentActivity } from '../components/dashboard';
import { storageService } from '../services/storageService';
import { formatCurrency } from '../utils/formatters';
import type { Currency } from '../types/quote.types';

interface DashboardStats {
  totalQuotations: number;
  totalInvoices: number;
  pendingQuotations: number;
  totalRevenue: number;
}

interface ActivityItem {
  id: string;
  type: 'quotation' | 'invoice';
  title: string;
  clientName: string;
  amount: string;
  date: string;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalQuotations: 0,
    totalInvoices: 0,
    pendingQuotations: 0,
    totalRevenue: 0,
  });
  const [recentItems, setRecentItems] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Load stats from storage
    const quotations = storageService.getQuotations();
    const invoices = storageService.getInvoices();

    const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);

    setStats({
      totalQuotations: quotations.length,
      totalInvoices: invoices.length,
      pendingQuotations: quotations.filter((q) => !q.convertedToInvoice).length,
      totalRevenue,
    });

    // Combine and sort recent items
    const allItems: ActivityItem[] = [
      ...quotations.map((q) => ({
        id: q.id,
        type: 'quotation' as const,
        title: q.quoteNumber || 'Quotation',
        clientName: q.client?.name || 'Unknown',
        amount: formatCurrency(q.grandTotal || 0, (q.currency || 'INR') as Currency),
        date: q.createdAt || new Date().toISOString(),
      })),
      ...invoices.map((inv) => ({
        id: inv.id,
        type: 'invoice' as const,
        title: inv.invoiceNumber || 'Invoice',
        clientName: inv.client?.name || 'Unknown',
        amount: formatCurrency(inv.grandTotal || 0, (inv.currency || 'INR') as Currency),
        date: inv.createdAt || new Date().toISOString(),
      })),
    ];

    // Sort by date, most recent first
    allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Take only the 5 most recent
    setRecentItems(allItems.slice(0, 5));
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Quotations"
          value={stats.totalQuotations}
          icon="📋"
          color="primary"
        />
        <StatCard
          title="Total Invoices"
          value={stats.totalInvoices}
          icon="📄"
          color="success"
        />
        <StatCard
          title="Pending Quotations"
          value={stats.pendingQuotations}
          icon="⏳"
          color="warning"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue, 'INR')}
          icon="💰"
          color="info"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity items={recentItems} />
      </div>
    </div>
  );
}
