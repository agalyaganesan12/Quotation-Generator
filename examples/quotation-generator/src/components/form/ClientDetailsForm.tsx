import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input, TextArea } from '../common';
import type { QuoteFormData } from '../../types/quote.types';

interface ClientDetailsFormProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

export function ClientDetailsForm({ register, errors }: ClientDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Client Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Client Name"
          placeholder="Client's full name"
          required
          {...register('client.name')}
          error={errors.client?.name?.message}
        />

        <Input
          label="Company Name"
          placeholder="Client's company (optional)"
          {...register('client.company')}
          error={errors.client?.company?.message}
        />

        <div className="md:col-span-2">
          <TextArea
            label="Address"
            placeholder="Client's full address"
            required
            rows={2}
            {...register('client.address')}
            error={errors.client?.address?.message}
          />
        </div>

        <Input
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          {...register('client.phone')}
          error={errors.client?.phone?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="client@example.com"
          {...register('client.email')}
          error={errors.client?.email?.message}
        />
      </div>
    </div>
  );
}
