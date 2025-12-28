/**
 * Invoice type definitions
 */

import type { Currency, CompanyDetails, ClientDetails, QuoteItem, DiscountType, Signature } from './quote.types';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface InvoiceFormData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: Currency;
  company: CompanyDetails;
  client: ClientDetails;
  items: QuoteItem[];
  discountType: DiscountType;
  discountValue: number;
  taxPercent: number;
  terms?: string;
  paymentTerms?: string;
  signature?: Signature;
  sourceQuoteId?: string;
}

export interface Invoice extends InvoiceFormData {
  id: string;
  grandTotal: number;
  createdAt: string;
  updatedAt: string;
}
