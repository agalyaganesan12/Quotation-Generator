/**
 * Invoice form page component
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { InvoiceMetadataForm } from '../components/form';
import { InvoicePDFPreview } from '../components/preview';
import { Button, Input, Select, TextArea, FileUpload } from '../components/common';
import { storageService, type StoredQuotation, type StoredInvoice } from '../services/storageService';
import { generateInvoiceNumber, formatDateForInput, formatCurrency } from '../utils/formatters';
import { calculateAllTotals, calculateLineTotal } from '../utils/calculations';
import { DEFAULT_TERMS, DEFAULT_PAYMENT_TERMS, TAX_RATES } from '../constants/currencies';
import type { InvoiceFormData } from '../types/invoice.types';
import type { Currency, DiscountType } from '../types/quote.types';

// Invoice validation schema
const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  date: z.string().min(1, 'Date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['draft', 'sent', 'paid', 'overdue']),
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP']),
  company: z.object({
    name: z.string().min(1, 'Company name is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email'),
    gstNumber: z.string().optional(),
    logo: z.string().optional(),
  }),
  client: z.object({
    name: z.string().min(1, 'Client name is required'),
    company: z.string().optional(),
    address: z.string().min(1, 'Address is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phone: z.string().optional(),
  }),
  items: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'Item name is required'),
    description: z.string().optional(),
    quantity: z.number().min(1),
    unitPrice: z.number().min(0),
    lineTotal: z.number(),
  })).min(1, 'At least one item is required'),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().min(0),
  taxPercent: z.number().min(0).max(100),
  terms: z.string().optional(),
  paymentTerms: z.string().optional(),
  signature: z.object({
    type: z.enum(['typed', 'image']),
    value: z.string(),
  }).optional(),
  sourceQuoteId: z.string().optional(),
});

type FormData = z.infer<typeof invoiceFormSchema>;

const getDefaultValues = (fromQuotation?: StoredQuotation): FormData => {
  const savedCompany = storageService.getCompany<FormData['company']>();
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);

  if (fromQuotation) {
    return {
      invoiceNumber: generateInvoiceNumber(),
      date: formatDateForInput(today),
      dueDate: formatDateForInput(dueDate),
      status: 'draft',
      currency: fromQuotation.currency,
      company: fromQuotation.company,
      client: fromQuotation.client,
      items: fromQuotation.items,
      discountType: fromQuotation.discountType,
      discountValue: fromQuotation.discountValue,
      taxPercent: fromQuotation.taxPercent,
      terms: fromQuotation.terms || DEFAULT_TERMS,
      paymentTerms: fromQuotation.paymentTerms || DEFAULT_PAYMENT_TERMS,
      signature: fromQuotation.signature,
      sourceQuoteId: fromQuotation.id,
    };
  }

  return {
    invoiceNumber: generateInvoiceNumber(),
    date: formatDateForInput(today),
    dueDate: formatDateForInput(dueDate),
    status: 'draft',
    currency: 'INR' as Currency,
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
    discountType: 'percentage' as DiscountType,
    discountValue: 0,
    taxPercent: 18,
    terms: DEFAULT_TERMS,
    paymentTerms: DEFAULT_PAYMENT_TERMS,
  };
};

export function InvoiceForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromQuotation = location.state?.fromQuotation as StoredQuotation | undefined;

  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<InvoiceFormData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: getDefaultValues(fromQuotation),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const watchedData = watch();
  const currency = watch('currency');
  const logo = watch('company.logo');
  const items = watch('items');
  const discountType = watch('discountType');
  const discountValue = watch('discountValue');
  const taxPercent = watch('taxPercent');

  const totals = calculateAllTotals(items, discountType, discountValue, taxPercent);

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

  const handleFieldChange = (index: number) => {
    const item = items[index];
    if (item) {
      const lineTotal = calculateLineTotal(item.quantity, item.unitPrice);
      setValue(`items.${index}.lineTotal`, lineTotal);
    }
  };

  const onSaveAndPreview = handleSubmit((data) => {
    const invoice: StoredInvoice = {
      ...data,
      id: uuidv4(),
      grandTotal: totals.grandTotal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storageService.saveInvoice(invoice);

    if (data.sourceQuoteId) {
      storageService.markQuotationConverted(data.sourceQuoteId);
    }

    setFormData(data as InvoiceFormData);
    setShowPreview(true);
  });

  const onPreview = handleSubmit((data) => {
    setFormData(data as InvoiceFormData);
    setShowPreview(true);
  });

  const onReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      reset(getDefaultValues());
    }
  };

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
    <div className="max-w-5xl mx-auto">
      {fromQuotation && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <p className="text-purple-800">
            <span className="font-medium">Converting from Quotation:</span> {fromQuotation.quoteNumber}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {fromQuotation ? 'Convert to Invoice' : 'Create Invoice'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details below to generate an invoice</p>
          </div>
        </div>

        <form onSubmit={onSaveAndPreview} className="space-y-6">
          {/* Company & Client Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              <div className="space-y-4">
                <FileUpload
                  label="Company Logo"
                  preview={logo}
                  onUpload={handleLogoUpload}
                  onRemove={handleLogoRemove}
                  accept="image/*"
                  maxSizeMB={1}
                />
                <Input
                  label="Company Name"
                  {...register('company.name')}
                  error={errors.company?.name?.message}
                  required
                />
                <TextArea
                  label="Address"
                  {...register('company.address')}
                  error={errors.company?.address?.message}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    {...register('company.phone')}
                    error={errors.company?.phone?.message}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register('company.email')}
                    error={errors.company?.email?.message}
                    required
                  />
                </div>
                <Input
                  label="GST Number"
                  {...register('company.gstNumber')}
                  error={errors.company?.gstNumber?.message}
                  helperText="Optional"
                />
              </div>
            </div>

            {/* Client Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Details</h3>
              <div className="space-y-4">
                <Input
                  label="Client Name"
                  {...register('client.name')}
                  error={errors.client?.name?.message}
                  required
                />
                <Input
                  label="Company"
                  {...register('client.company')}
                  error={errors.client?.company?.message}
                />
                <TextArea
                  label="Address"
                  {...register('client.address')}
                  error={errors.client?.address?.message}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    {...register('client.email')}
                    error={errors.client?.email?.message}
                  />
                  <Input
                    label="Phone"
                    {...register('client.phone')}
                    error={errors.client?.phone?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Metadata */}
          <InvoiceMetadataForm register={register} errors={errors} />

          {/* Items Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
              <Button type="button" variant="secondary" size="sm" onClick={addItem}>
                + Add Item
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm">
                    <th className="px-3 py-2 w-8">#</th>
                    <th className="px-3 py-2">Item Name</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2 w-24">Qty</th>
                    <th className="px-3 py-2 w-32">Unit Price</th>
                    <th className="px-3 py-2 w-32 text-right">Total</th>
                    <th className="px-3 py-2 w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id} className="border-b">
                      <td className="px-3 py-2 text-gray-500">{index + 1}</td>
                      <td className="px-3 py-2">
                        <Input
                          {...register(`items.${index}.name`)}
                          placeholder="Item name"
                          className="text-sm"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          {...register(`items.${index}.description`)}
                          placeholder="Description"
                          className="text-sm"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="number"
                          {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                          onChange={() => handleFieldChange(index)}
                          min={1}
                          className="text-sm"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="number"
                          {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                          onChange={() => handleFieldChange(index)}
                          min={0}
                          step="0.01"
                          className="text-sm"
                        />
                      </td>
                      <td className="px-3 py-2 text-right font-medium">
                        {formatCurrency(items[index]?.lineTotal || 0, currency)}
                      </td>
                      <td className="px-3 py-2">
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            ✕
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Select
                    label="Discount Type"
                    options={[
                      { value: 'percentage', label: 'Percentage (%)' },
                      { value: 'fixed', label: 'Fixed Amount' },
                    ]}
                    {...register('discountType')}
                  />
                  <Input
                    label="Discount Value"
                    type="number"
                    {...register('discountValue', { valueAsNumber: true })}
                    min={0}
                    step="0.01"
                  />
                </div>
                <Select
                  label="Tax Rate"
                  options={TAX_RATES.map((r) => ({ value: r.value, label: r.label }))}
                  {...register('taxPercent', { valueAsNumber: true })}
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(totals.subtotal, currency)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(totals.discountAmount, currency)}</span>
                  </div>
                )}
                {totals.taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({taxPercent}%)</span>
                    <span>+{formatCurrency(totals.taxAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-lg font-semibold">Grand Total</span>
                  <span className="text-lg font-bold text-[#8b4513]">
                    {formatCurrency(totals.grandTotal, currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Notes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea
                label="Terms & Conditions"
                {...register('terms')}
                rows={4}
              />
              <TextArea
                label="Payment Terms"
                {...register('paymentTerms')}
                rows={4}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="ghost" onClick={() => navigate('/invoices')}>
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
        <InvoicePDFPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          data={formData}
        />
      )}
    </div>
  );
}
