/**
 * Quotation list page component
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common';
import { DocumentCard } from '../components/list';
import { storageService, type StoredQuotation } from '../services/storageService';
import { formatCurrency } from '../utils/formatters';

export function QuotationList() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState<StoredQuotation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = () => {
    const data = storageService.getQuotations();
    // Sort by date, most recent first
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setQuotations(data);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      storageService.deleteQuotation(id);
      loadQuotations();
    }
  };

  const handleConvertToInvoice = (quotation: StoredQuotation) => {
    // Navigate to invoice form with quotation data
    navigate('/invoices/new', { state: { fromQuotation: quotation } });
  };

  const filteredQuotations = quotations.filter(
    (q) =>
      q.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quotations</h2>
          <p className="text-sm text-gray-500 mt-1">
            {quotations.length} quotation{quotations.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button onClick={() => navigate('/quotations/new')}>
          + New Quotation
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <input
          type="text"
          placeholder="Search quotations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0522d] focus:border-[#8b4513]"
        />
      </div>

      {/* List */}
      {filteredQuotations.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quotations found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try a different search term' : 'Create your first quotation to get started'}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate('/quotations/new')}>
              Create Quotation
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuotations.map((quotation) => (
            <DocumentCard
              key={quotation.id}
              type="quotation"
              documentNumber={quotation.quoteNumber}
              clientName={quotation.client.name || quotation.client.company || 'Unknown'}
              amount={formatCurrency(quotation.grandTotal || 0, quotation.currency)}
              date={quotation.createdAt}
              status={quotation.convertedToInvoice ? 'converted' : 'pending'}
              onDelete={() => handleDelete(quotation.id)}
              onConvert={!quotation.convertedToInvoice ? () => handleConvertToInvoice(quotation) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
