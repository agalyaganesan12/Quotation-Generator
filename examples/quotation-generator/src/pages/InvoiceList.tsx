/**
 * Invoice list page component
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';
import { DocumentCard } from '../components/list';
import { storageService, type StoredInvoice } from '../services/storageService';
import { formatCurrency } from '../utils/formatters';
import type { Currency } from '../types/quote.types';

export function InvoiceList() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<StoredInvoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const data = storageService.getInvoices();
    // Sort by date, most recent first
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setInvoices(data);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      storageService.deleteInvoice(id);
      loadInvoices();
    }
  };


  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Invoices</h2>
          <p className="text-sm text-gray-500 mt-1">
            {invoices.length} invoice{invoices.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button onClick={() => navigate('/invoices/new')}>
          + New Invoice
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0522d] focus:border-[#8b4513]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0522d] focus:border-[#8b4513] bg-white"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* List */}
      {filteredInvoices.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Try different filters'
              : 'Create your first invoice to get started'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => navigate('/invoices/new')}>
              Create Invoice
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInvoices.map((invoice) => (
            <DocumentCard
              key={invoice.id}
              type="invoice"
              documentNumber={invoice.invoiceNumber}
              clientName={invoice.client.name || 'Unknown'}
              amount={formatCurrency(invoice.grandTotal || 0, invoice.currency as Currency)}
              date={invoice.createdAt}
              status={invoice.status}
              onDelete={() => handleDelete(invoice.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
