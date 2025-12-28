import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useMemo } from 'react';
import { Input, Select } from '../common';
import { calculateAllTotals } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { TAX_RATES } from '../../constants/currencies';
import type { QuoteFormData, Currency } from '../../types/quote.types';

interface SummarySectionProps {
  register: UseFormRegister<QuoteFormData>;
  watch: UseFormWatch<QuoteFormData>;
  currency: Currency;
}

export function SummarySection({ register, watch, currency }: SummarySectionProps) {
  const items = watch('items');
  const discountType = watch('discountType');
  const discountValue = watch('discountValue') || 0;
  const taxPercent = watch('taxPercent') || 0;

  const totals = useMemo(() => {
    return calculateAllTotals(items || [], discountType, discountValue, taxPercent);
  }, [items, discountType, discountValue, taxPercent]);

  const discountOptions = [
    { value: 'percentage', label: 'Percentage (%)' },
    { value: 'fixed', label: `Fixed Amount (${currency})` },
  ];

  const taxOptions = TAX_RATES.map((rate) => ({
    value: rate.value,
    label: rate.label,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(totals.subtotal, currency)}</span>
        </div>

        {/* Discount */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 border-b">
          <div className="flex items-center">
            <span className="text-gray-600">Discount</span>
          </div>
          <div className="flex gap-2">
            <Select
              options={discountOptions}
              {...register('discountType')}
              className="flex-1"
            />
            <Input
              type="number"
              min="0"
              step={discountType === 'percentage' ? '1' : '0.01'}
              max={discountType === 'percentage' ? '100' : undefined}
              placeholder="0"
              {...register('discountValue', { valueAsNumber: true })}
              className="w-24 text-right"
            />
          </div>
          <div className="flex items-center justify-end text-red-600">
            {totals.discountAmount > 0 && (
              <>- {formatCurrency(totals.discountAmount, currency)}</>
            )}
          </div>
        </div>

        {/* Tax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 border-b">
          <div className="flex items-center">
            <span className="text-gray-600">Tax (GST)</span>
          </div>
          <div>
            <Select
              options={taxOptions}
              {...register('taxPercent', { valueAsNumber: true })}
            />
          </div>
          <div className="flex items-center justify-end">
            {totals.taxAmount > 0 && (
              <>+ {formatCurrency(totals.taxAmount, currency)}</>
            )}
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4 -mx-4">
          <span className="text-lg font-semibold text-gray-900">Grand Total</span>
          <span className="text-xl font-bold text-blue-600">
            {formatCurrency(totals.grandTotal, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
