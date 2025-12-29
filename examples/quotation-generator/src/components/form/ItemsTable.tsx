import { useFieldArray, useWatch } from 'react-hook-form';
import type { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '../common';
import { calculateLineTotal } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import type { QuoteFormData, Currency } from '../../types/quote.types';

interface ItemsTableProps {
  control: Control<QuoteFormData>;
  register: UseFormRegister<QuoteFormData>;
  setValue: UseFormSetValue<QuoteFormData>;
  currency: Currency;
  errors?: Record<string, { message?: string }>;
}

export function ItemsTable({
  control,
  register,
  setValue,
  currency,
  errors,
}: ItemsTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Use useWatch for reactive updates when individual fields change
  const items = useWatch({
    control,
    name: 'items',
  });

  // Calculate line totals when quantity or price changes
  useEffect(() => {
    items?.forEach((item, index) => {
      const lineTotal = calculateLineTotal(item.quantity || 0, item.unitPrice || 0);
      if (item.lineTotal !== lineTotal) {
        setValue(`items.${index}.lineTotal`, lineTotal, { shouldDirty: true });
      }
    });
  }, [items, setValue]);

  // Handler to recalculate on input change
  const handleFieldChange = useCallback((index: number) => {
    const item = items?.[index];
    if (item) {
      const lineTotal = calculateLineTotal(item.quantity || 0, item.unitPrice || 0);
      setValue(`items.${index}.lineTotal`, lineTotal, { shouldDirty: true });
    }
  }, [items, setValue]);

  const addItem = () => {
    append({
      id: uuidv4(),
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      lineTotal: 0,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Items</h2>
        <Button type="button" variant="secondary" size="sm" onClick={addItem}>
          + Add Item
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No items added yet.</p>
          <Button type="button" variant="primary" size="sm" onClick={addItem} className="mt-2">
            Add First Item
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 w-8">#</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Item Name</th>
                <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 hidden md:table-cell">Description</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-700 w-24">Qty</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-700 w-32">Unit Price</th>
                <th className="text-right py-3 px-2 text-sm font-medium text-gray-700 w-32">Total</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-500">{index + 1}</td>
                  <td className="py-2 px-2">
                    <Input
                      placeholder="Item name"
                      {...register(`items.${index}.name` as const)}
                      className="min-w-32"
                    />
                  </td>
                  <td className="py-2 px-2 hidden md:table-cell">
                    <textarea
                      placeholder="Description (optional)"
                      {...register(`items.${index}.description` as const)}
                      rows={1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a0522d] focus:border-[#8b4513] resize-none"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      {...register(`items.${index}.quantity` as const, {
                        valueAsNumber: true,
                        onChange: () => handleFieldChange(index),
                      })}
                      className="text-right"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      {...register(`items.${index}.unitPrice` as const, {
                        valueAsNumber: true,
                        onChange: () => handleFieldChange(index),
                      })}
                      className="text-right"
                    />
                  </td>
                  <td className="py-3 px-2 text-right font-medium">
                    {formatCurrency(items?.[index]?.lineTotal || 0, currency)}
                  </td>
                  <td className="py-2 px-2">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile description - shown below each item on mobile */}
          <div className="md:hidden mt-4 space-y-4">
            {fields.map((field, index) => (
              <div key={`desc-${field.id}`} className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item {index + 1} Description
                </label>
                <textarea
                  placeholder="Description (optional)"
                  {...register(`items.${index}.description` as const)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a0522d] focus:border-[#8b4513] resize-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {errors && Object.keys(errors).length > 0 && (
        <p className="mt-2 text-sm text-red-600">Please fill in all required item fields</p>
      )}
    </div>
  );
}
