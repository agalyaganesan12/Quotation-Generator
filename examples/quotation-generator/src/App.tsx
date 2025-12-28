import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import {
  CompanyDetailsForm,
  ClientDetailsForm,
  QuoteMetadataForm,
  ItemsTable,
  SummarySection,
  TermsAndNotes,
  SignatureSection,
} from './components/form';
import { PDFPreview } from './components/preview';
import { Button } from './components/common';
import { quoteFormSchema } from './services/validationService';
import { storageService } from './services/storageService';
import { generateQuoteNumber, formatDateForInput } from './utils/formatters';
import { DEFAULT_TERMS, DEFAULT_PAYMENT_TERMS } from './constants/currencies';
import type { QuoteFormData, Currency } from './types/quote.types';

const getDefaultValues = (): QuoteFormData => {
  const savedCompany = storageService.getCompany<QuoteFormData['company']>();
  const today = new Date();
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);

  return {
    company: savedCompany || {
      name: '',
      address: '',
      phone: '',
      email: '',
      gstNumber: '',
      logo: '',
    },
    client: {
      name: '',
      company: '',
      address: '',
      email: '',
      phone: '',
    },
    quoteNumber: generateQuoteNumber(),
    date: formatDateForInput(today),
    validUntil: formatDateForInput(validUntil),
    currency: 'INR' as Currency,
    items: [
      {
        id: uuidv4(),
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        lineTotal: 0,
      },
    ],
    discountType: 'percentage',
    discountValue: 0,
    taxPercent: 18,
    terms: DEFAULT_TERMS,
    paymentTerms: DEFAULT_PAYMENT_TERMS,
  };
};

function App() {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  });

  const watchedData = watch();
  const currency = watch('currency');
  const logo = watch('company.logo');

  useEffect(() => {
    const company = watchedData.company;
    if (company.name) {
      storageService.setCompany(company);
    }
  }, [watchedData.company]);

  const handleLogoUpload = (base64: string) => {
    setValue('company.logo', base64);
  };

  const handleLogoRemove = () => {
    setValue('company.logo', '');
  };

  const onPreview = handleSubmit((data) => {
    setFormData(data);
    setShowPreview(true);
  });

  const onReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      reset(getDefaultValues());
    }
  };

  const onNewQuote = () => {
    const savedCompany = storageService.getCompany<QuoteFormData['company']>();
    reset({
      ...getDefaultValues(),
      company: savedCompany || getDefaultValues().company,
      quoteNumber: generateQuoteNumber(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quotation Generator
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Create professional quotations and download as PDF
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onNewQuote}>
                New Quote
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={onPreview} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CompanyDetailsForm
              register={register}
              errors={errors}
              logo={logo}
              onLogoUpload={handleLogoUpload}
              onLogoRemove={handleLogoRemove}
            />
            <ClientDetailsForm register={register} errors={errors} />
          </div>

          <QuoteMetadataForm register={register} errors={errors} />

          <ItemsTable
            control={control}
            register={register}
            setValue={setValue}
            currency={currency}
          />

          <SummarySection
            register={register}
            watch={watch}
            currency={currency}
          />

          <TermsAndNotes register={register} />

          <SignatureSection watch={watch} setValue={setValue} />

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="ghost" onClick={onReset}>
              Reset Form
            </Button>
            <Button type="submit" variant="primary" size="lg">
              Preview & Download PDF
            </Button>
          </div>
        </form>
      </main>

      {formData && (
        <PDFPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          data={formData}
        />
      )}

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Quotation Generator - Create professional quotations easily
        </div>
      </footer>
    </div>
  );
}

export default App;
