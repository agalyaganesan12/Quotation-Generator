import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input, Select } from '../common';
import { CURRENCIES } from '../../constants/currencies';
import type { QuoteFormData } from '../../types/quote.types';

interface QuoteMetadataFormProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export function QuoteMetadataForm({ register, errors }: QuoteMetadataFormProps) {
  const currencyOptions = CURRENCIES.map((c) => ({
    value: c.value,
    label: c.label,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quote Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="Quote Number"
          placeholder="QT-202512-0001"
          required
          {...register('quoteNumber')}
          error={errors.quoteNumber?.message}
        />

        <Input
          label="Date"
          type="date"
          required
          {...register('date')}
          error={errors.date?.message}
        />

        <Input
          label="Valid Until"
          type="date"
          required
          {...register('validUntil')}
          error={errors.validUntil?.message}
        />

        <Select
          label="Currency"
          options={currencyOptions}
          required
          {...register('currency')}
          error={errors.currency?.message}
        />
      </div>
    </div>
  );
}
