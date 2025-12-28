/**
 * Quotation form page component
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '../components/form';
import { PDFPreview } from '../components/preview';
import { Button } from '../components/common';
import { quoteFormSchema } from '../services/validationService';
import { storageService, type StoredQuotation } from '../services/storageService';
import { generateQuoteNumber, formatDateForInput } from '../utils/formatters';
import { calculateAllTotals } from '../utils/calculations';
import { DEFAULT_TERMS, DEFAULT_PAYMENT_TERMS } from '../constants/currencies';
import type { QuoteFormData, Currency } from '../types/quote.types';

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

export function QuotationForm() {
  const navigate = useNavigate();
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

  const onSaveAndPreview = handleSubmit((data) => {
    // Calculate totals
    const totals = calculateAllTotals(
      data.items,
      data.discountType,
      data.discountValue,
      data.taxPercent
    );

    // Save to storage
    const quotation: StoredQuotation = {
      ...data,
      id: uuidv4(),
      grandTotal: totals.grandTotal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storageService.saveQuotation(quotation);

    // Show preview
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
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create Quotation</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details below to generate a quotation</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onNewQuote}>
            New Quote
          </Button>
        </div>

        <form onSubmit={onSaveAndPreview} className="space-y-6">
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
            <Button type="button" variant="ghost" onClick={() => navigate('/quotations')}>
              Cancel
            </Button>
            <Button type="button" variant="secondary" onClick={onReset}>
              Reset Form
            </Button>
            <Button type="button" variant="secondary" onClick={onPreview}>
              Preview Only
            </Button>
            <Button type="submit" variant="primary" size="lg">
              Save & Preview PDF
            </Button>
          </div>
        </form>
      </div>

      {formData && (
        <PDFPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          data={formData}
        />
      )}
    </div>
  );
}
