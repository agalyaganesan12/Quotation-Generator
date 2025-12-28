import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input, TextArea, FileUpload } from '../common';
import type { QuoteFormData } from '../../types/quote.types';

interface CompanyDetailsFormProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
  logo?: string;
  onLogoUpload: (base64: string) => void;
  onLogoRemove: () => void;
}

export function CompanyDetailsForm({
  register,
  errors,
  logo,
  onLogoUpload,
  onLogoRemove,
}: CompanyDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Company Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FileUpload
            label="Company Logo"
            accept="image/png, image/jpeg"
            maxSizeMB={2}
            preview={logo}
            onUpload={onLogoUpload}
            onRemove={onLogoRemove}
          />
        </div>

        <Input
          label="Company Name"
          placeholder="Your Company Name"
          required
          {...register('company.name')}
          error={errors.company?.name?.message}
        />

        <Input
          label="GST Number"
          placeholder="22AAAAA0000A1Z5"
          {...register('company.gstNumber')}
          error={errors.company?.gstNumber?.message}
          helperText="15-digit GST number (optional)"
        />

        <div className="md:col-span-2">
          <TextArea
            label="Address"
            placeholder="Company full address"
            required
            rows={2}
            {...register('company.address')}
            error={errors.company?.address?.message}
          />
        </div>

        <Input
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          required
          {...register('company.phone')}
          error={errors.company?.phone?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="company@example.com"
          required
          {...register('company.email')}
          error={errors.company?.email?.message}
        />
      </div>
    </div>
  );
}
