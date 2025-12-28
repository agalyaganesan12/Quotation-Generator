import type { UseFormRegister } from 'react-hook-form';
import { TextArea } from '../common';
import type { QuoteFormData } from '../../types/quote.types';

interface TermsAndNotesProps {
  register: UseFormRegister<QuoteFormData>;
}

export function TermsAndNotes({ register }: TermsAndNotesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Terms & Conditions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextArea
          label="Terms & Conditions"
          placeholder="Enter terms and conditions..."
          rows={4}
          {...register('terms')}
        />

        <TextArea
          label="Payment Terms"
          placeholder="Enter payment terms and bank details..."
          rows={4}
          {...register('paymentTerms')}
        />
      </div>
    </div>
  );
}
