import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100),
  address: z.string().min(1, 'Address is required').max(500),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address'),
  gstNumber: z.string()
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      'Invalid GST number format (e.g., 22AAAAA0000A1Z5)'
    )
    .optional()
    .or(z.literal('')),
  logo: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string().min(1, 'Client name is required').max(100),
  company: z.string().max(100).optional().or(z.literal('')),
  address: z.string().min(1, 'Address is required').max(500),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string()
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

export const itemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Item name is required').max(200),
  description: z.string().max(500).optional().or(z.literal('')),
  quantity: z.number().positive('Quantity must be positive'),
  unitPrice: z.number().nonnegative('Price cannot be negative'),
  lineTotal: z.number(),
});

export const quoteMetadataSchema = z.object({
  quoteNumber: z.string().min(1, 'Quote number is required'),
  date: z.string().min(1, 'Date is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP']),
});

export const signatureSchema = z.object({
  type: z.enum(['typed', 'image']),
  value: z.string().min(1, 'Signature is required'),
}).optional();

export const quoteFormSchema = z.object({
  company: companySchema,
  client: clientSchema,
  quoteNumber: z.string().min(1, 'Quote number is required'),
  date: z.string().min(1, 'Date is required'),
  validUntil: z.string().min(1, 'Valid until date is required'),
  currency: z.enum(['INR', 'USD', 'EUR', 'GBP']),
  items: z.array(itemSchema).min(1, 'At least one item is required'),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().nonnegative('Discount cannot be negative'),
  taxPercent: z.number().nonnegative('Tax cannot be negative').max(100, 'Tax cannot exceed 100%'),
  terms: z.string().optional(),
  paymentTerms: z.string().optional(),
  signature: signatureSchema,
});

export type CompanyFormData = z.infer<typeof companySchema>;
export type ClientFormData = z.infer<typeof clientSchema>;
export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
