/**
 * Invoice metadata form component
 */

import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input, Select } from '../common';
import { CURRENCIES } from '../../constants/currencies';
import type { InvoiceFormData } from '../../types/invoice.types';

interface InvoiceMetadataFormProps {
  register: UseFormRegister<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
}

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
];

export function InvoiceMetadataForm({ register, errors }: InvoiceMetadataFormProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          label="Invoice Number"
          {...register('invoiceNumber')}
          error={errors.invoiceNumber?.message}
          required
        />
        <Input
          label="Invoice Date"
          type="date"
          {...register('date')}
          error={errors.date?.message}
          required
        />
        <Input
          label="Due Date"
          type="date"
          {...register('dueDate')}
          error={errors.dueDate?.message}
          required
        />
        <Select
          label="Status"
          options={statusOptions}
          {...register('status')}
          error={errors.status?.message}
        />
        <Select
          label="Currency"
          options={CURRENCIES.map((c) => ({ value: c.value, label: c.label }))}
          {...register('currency')}
          error={errors.currency?.message}
        />
      </div>
    </div>
  );
}
